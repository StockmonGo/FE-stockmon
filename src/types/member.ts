export interface ITravelerRes {
  traveler: ITraveler;
}
export interface ITraveler {
  nickname: string;
  travelerId: number;
}
export interface IAccountInfoRes {
  hasAccount: boolean;
}

export interface IMemberRes extends IAccountInfoRes {
  nickname: string;
  accountNumber: string | null;
  tutorialWatched: boolean;
}
