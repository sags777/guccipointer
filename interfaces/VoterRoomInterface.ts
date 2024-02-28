import { User } from "@/interfaces/User";

export interface VoterRoom {
    users: { [key: string]: User };
    votesHidden: boolean;
    host: string;
}