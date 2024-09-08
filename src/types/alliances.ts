import { ITraveler } from "./member";

export interface IAllianceRequest {
  noticeId: number; // 알람 아이디
  nickName: string; // 나에게 동맹 요청한 유저 닉네임
  createdDate?: string;
}
