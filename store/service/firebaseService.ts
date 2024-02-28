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
} from "firebase/database";
import { setUserSession } from "@/utilities/commonUtils";

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
            if (isNewRoom || !await firebaseActions.getHost(roomId)) {
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

  setUserPoints: ({ userName, points, roomId }: User, userId: string) => {
    const database = getDatabase(firebaseApp);

    const userRef = ref(database, `rooms/${roomId}/users/${userId}`);
    set(userRef, {
      userName: userName,
      points: points,
    });
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
    }

    userIds.forEach(async (userId) => {
      const userRef = ref(database, `/rooms/${roomId}/users/${userId}`);
      try {
        await update(userRef, {
          points: "",
        });
      } catch (error) {
        console.error(`Failed to clear votes for user ${userId}:`, error);
      }
    });
  },
};
