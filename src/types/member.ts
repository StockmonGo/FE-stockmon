export interface IAccountInfoRes {
  hasAccount: boolean;
}

export interface IMemberRes extends IAccountInfoRes {
  nickname: string;
  accountNumber: string | null;
}
