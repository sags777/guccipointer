import { User } from "./User";

export interface FirebaseActions {
    getHost: (roomId: string) => Promise<string | null>;
    setHost: (host: string, roomId: string) => void;
    setUser: (user: User) => Promise<string>;
    setUserPoints: (user: User, id: string) => void;
    getData: (roomId: string, callback: (data: any) => void) => () => void;
    showVotes: (votesHidden: boolean, roomId: string) => void;
    clearVotes: (userIds: string[], votesHidden: boolean, roomId: string) => void;
}