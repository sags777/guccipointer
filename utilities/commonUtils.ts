import { SessionInfo } from "@/interfaces/SessionInfo";
import { User } from "@/interfaces/User";

export function checkPointerSessionTokenExists() {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("pointerSession");
    return token !== null;
  }
  return false;
}

export const getSessionInfo = () => {
  if (typeof window !== "undefined") {
    const userSession = sessionStorage.getItem("pointerSession");
    if (userSession) {
      try {
        const token: SessionInfo = JSON.parse(userSession);
        return token;
      } catch (error) {
        console.error("Failed to parse user data from session storage", error);
      }
    }
  }
  return undefined;
};

export const setUserSession = (user: SessionInfo): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("pointerSession", JSON.stringify(user));
  }
};

export const calculateAveragePoints = (votersData: User[]) => {
  const totalPoints = votersData.reduce((acc, user) => acc + (user.points ? parseFloat(user.points) : 0), 0);
  return votersData.length > 0 ? (totalPoints / votersData.length).toFixed(2) : '0';
};

export const findMostCommonPoint = (votersData: User[]) => {
  const pointsFrequency = votersData.reduce((acc, user) => {
    if (user.points) {
      acc[user.points] = (acc[user.points] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  return Object.keys(pointsFrequency).reduce((a, b) => pointsFrequency[a] > pointsFrequency[b] ? a : b, '');
};

export const checkForConsensus = (users: User[]): boolean => {
  if (users.length <= 1) return true;
  const referencePoints = users[0].points;
  return users.every(user => user.points === referencePoints);
};

export const createResultData = (data: User[]) => {
  const votesMap = new Map<string, { votes: number; voters: string[] }>();

  data.forEach((user) => {
    if (user.points) {
      if (!votesMap.has(user.points)) {
        votesMap.set(user.points, { votes: 0, voters: [] });
      }
      const currentEntry = votesMap.get(user.points);
      if (currentEntry) {
        currentEntry.votes += 1;
        currentEntry.voters.push(user.userName);
      }
    }
  });

  const votesData = Array.from(votesMap.entries()).map(([point, { votes, voters }]) => ({
    point,
    votes,
    voters,
  }));

  return votesData;
};