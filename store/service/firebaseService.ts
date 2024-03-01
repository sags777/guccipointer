import firebaseApp from "@/pages/api/auth/firebase/firebaseConfig";
import { FirebaseActions } from "@/interfaces/FireBaseActions";
import { User } from "@/interfaces/User";
import {
  getDatabase,
  ref,
  set,
  off,
  onValue,
  push,
  update,
  get,
  remove,
} from "firebase/database";
import { setUserSession } from "@/utilities/commonUtils";
import { Updates } from "@/interfaces/Updates";

export const firebaseActions: FirebaseActions = {
  setHost: async (userId: string, roomId: string) => {
    const database = getDatabase(firebaseApp);
    const roomRef = ref(database, `rooms/${roomId}`);

    try {
      await update(roomRef, {
        host: userId,
      });
    } catch (error) {
      console.error("Failed to set host:", error);
    }
  },

  getHost: async (roomId: string) => {
    const database = getDatabase(firebaseApp);
    const roomRef = ref(database, `rooms/${roomId}`);

    try {
      const snapshot = await get(roomRef);
      if (snapshot.exists()) {
        const roomData = snapshot.val();
        return roomData.host;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  removeHost: async (roomId: string) => {
    const database = getDatabase(firebaseApp);
    const hostRef = ref(database, `rooms/${roomId}/host`);

    try {
      const snapshot = await get(hostRef);
      if (snapshot.exists()) {
        await remove(hostRef);
      }
    } catch (error) {
      console.log("Could not remove host", error);
    }
  },

  setUser: ({ userName, points = "", roomId }: User) => {
    return new Promise(async (resolve, reject) => {
      const database = getDatabase(firebaseApp);

      let isNewRoom = false;

      if (!roomId) {
        const newRoomRef = push(ref(database, "rooms"));
        if (newRoomRef.key === null) {
          reject(new Error("Failed to create a new room in Firebase."));
          return;
        } else {
          roomId = newRoomRef.key;
          isNewRoom = true;
        }
      }
      const userRef = push(ref(database, `rooms/${roomId}/users`));
      set(userRef, {
        userName: userName,
        points: points,
      })
        .then(async () => {
          if (roomId && userRef.key) {
            if (isNewRoom || !(await firebaseActions.getHost(roomId))) {
              firebaseActions.setHost(userRef.key, roomId);
            }

            if (roomId && userRef.key !== null) {
              const userSession = {
                userName: userName,
                roomId: roomId,
                userId: userRef.key,
              };
              setUserSession(userSession);
            }

            resolve(roomId);
          }
        })
        .catch(reject);
    });
  },

  removeUser: async (roomId: string, userId: string) => {
    try {
      const database = getDatabase(firebaseApp);
      const roomRef = ref(database, `rooms/${roomId}`);
      const usersRef = ref(database, `rooms/${roomId}/users`);
      const usersSnapshot = await get(usersRef);

      if (!usersSnapshot.exists()) {
        return;
      }

      const users = usersSnapshot.val();
      const isLastUser = Object.keys(users).length === 1 && users[userId];
      const currentHostId = await firebaseActions.getHost(roomId);

      const removeUpdates: Updates = {};

      if (currentHostId === userId) {
        removeUpdates["host"] = null;
      }

      if (isLastUser) {
        await remove(roomRef);
      } else {
        removeUpdates[`users/${userId}`] = null;
        await update(roomRef, removeUpdates);
      }
    } catch (error) {
      console.error("Error removing user or room:", error);
      throw error;
    }
  },

  setUserPoints: async ({ userName, points, roomId }: User, userId: string) => {
    try {
      const database = getDatabase(firebaseApp);
      const userRef = ref(database, `rooms/${roomId}/users/${userId}`);
      set(userRef, {
        userName: userName,
        points: points,
      });
    } catch (error) {
      console.error("Error setting user:", error);
      throw error;
    }
  },

  getData: (roomId: string, callback) => {
    const database = getDatabase(firebaseApp);
    const votersPointRef = ref(database, `rooms/${roomId}`);

    const unsubscribe = onValue(
      votersPointRef,
      (snapshot) => {
        const data = snapshot.val();
        callback(data);
      },
      (error) => {
        console.error("Error fetching data:", error);
        throw error;
      }
    );

    return () => off(votersPointRef, "value", unsubscribe);
  },

  showVotes: async (votesHidden: boolean, roomId: string) => {
    const database = getDatabase(firebaseApp);
    const roomRef = ref(database, `rooms/${roomId}`);
    try {
      await update(roomRef, {
        votesHidden: votesHidden,
      });
    } catch (error) {
      console.error("Failed to update showVotes:", error);
      throw error;
    }
  },

  clearVotes: async (
    userIds: string[],
    votesHidden: boolean,
    roomId: string
  ) => {
    const database = getDatabase(firebaseApp);
    const roomRef = ref(database, `rooms/${roomId}`);

    try {
      await update(roomRef, {
        votesHidden: votesHidden,
      });
    } catch (error) {
      console.error("Failed to update room votesHidden status:", error);
      throw error;
    }

    userIds.forEach(async (userId) => {
      const userRef = ref(database, `/rooms/${roomId}/users/${userId}`);
      try {
        await update(userRef, {
          points: "",
        });
      } catch (error) {
        console.error(`Failed to clear votes for user ${userId}:`, error);
        throw error;
      }
    });
  },
};

