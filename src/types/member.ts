export interface IAccountInfo {
  hasAccount: boolean;
}

export type IMember = IAccountInfo & {
  nickname: string;
  accountNumber: string | null;
};
