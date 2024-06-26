import { FirebaseActions } from "@/interfaces/FireBaseActions";
import { User } from "@/interfaces/User";
import { VoterRoom } from "@/interfaces/VoterRoomInterface";
import { getSessionInfo } from "@/utilities/commonUtils";
import { makeAutoObservable } from "mobx";

interface GetMainStore {
  host: string;
  votesHidden: boolean;
  voterData: User[];
  getData: () => void;
  setVote: (points: string) => void;
  showVotes: () => void;
  clearVotes: () => void;
  setHost: (userId: string) => void;
  removeUser: (roomId: string, userId: string) => void;
}

class MainStore {
  private host: string = '';
  private userIds: string[] = [];
  private voterData: User[] = [];
  private service: FirebaseActions;
  private votesHidden: boolean = true;


  constructor(firebaseActions: FirebaseActions) {
    makeAutoObservable(this);
    this.service = firebaseActions;
  }

  private setVoterData(data: User[]) {
    this.voterData = data;
  }

  private setUserIds(data: string[]) {
    this.userIds = data;
  }

  private setVoterRoom(room: VoterRoom) {
    this.votesHidden = room.votesHidden ?? this.votesHidden;
    this.host = room.host ?? this.host;
  }

  private getData = () => {
    const roomId = getSessionInfo()?.roomId;

    if (roomId) {
      this.service.getData(roomId, (room: VoterRoom) => {
        if (roomId) {
          this.setVoterRoom(room);
          let voterArray = [];
          let userIds = [];
  
          for (let userId in room.users) {
            userIds.push(userId);
            const user = room.users[userId];
            voterArray.push({
              userId: userId,
              userName: user.userName,
              points: user.points,
            });
          }
          this.setUserIds(userIds);
          this.setVoterData(voterArray);
        }
      });
    }
  };

  private setVote = (points: string) => {
    const sessionInfo = getSessionInfo();

    if (sessionInfo) {
      const userId = sessionInfo.userId;
      const voteObject: User = {
        userId: userId,
        userName: sessionInfo.userName,
        points: points,
        roomId: sessionInfo.roomId
      }

      if (userId) {
        this.service.setUserPoints(voteObject, userId);
      }
    }
  };

  private showVotes = () => {
    const roomId = getSessionInfo()?.roomId;

    if (roomId) {
      this.service.showVotes(false, roomId)
      this.getData();
    }
  };

  private clearVotes = () => {
    const roomId = getSessionInfo()?.roomId;

    if (roomId) {
      this.service.clearVotes(this.userIds, true, roomId)
      this.getData();
    }
  };

  private setHost = (userId: string) => {
    const roomId = getSessionInfo()?.roomId;

    if (roomId) {
      this.service.setHost(userId, roomId)
    }
  }

  private removeUser = (roomId: string, userId: string) => {
    return this.service.removeUser(roomId, userId)
  }

  public getStore(): GetMainStore {
    return {
      host: this.host,
      votesHidden: this.votesHidden,
      voterData: this.voterData,
      setVote: this.setVote,
      getData: this.getData,
      showVotes: this.showVotes,
      clearVotes: this.clearVotes,
      setHost: this.setHost,
      removeUser: this.removeUser
    };
  }
}

export default MainStore;
