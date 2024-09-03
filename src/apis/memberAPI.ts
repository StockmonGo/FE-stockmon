import { IMemberRes } from "@/types/member";
import { BaseApi } from "./baseAPI";
import axios from "axios";

export default class memberAPI extends BaseApi {
  async getMemberProfile(): Promise<{
    status: number;
    message: string;
    member: IMemberRes | null;
  }> {
    try {
      const resp = await this.fetcher.get("/api/core/users/profile");

      if (resp.status === 200 && resp.data.data) {
        // 정보 조회 성공
        return {
          status: 200,
          message: "회원 정보 불러오기 성공",
          member: resp.data.data,
        };
      }
      throw Error("실패");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        return {
          status: 400,
          message: error.response?.data.message || "알 수 없는 오류 발생",
          member: null,
        };
      } else {
        console.error(error);
        return {
          status: 500,
          message: "서버 오류 발생",
          member: null,
        };
      }
    }
  }

  async getAccountStatus(): Promise<{
    status: number;
    message: string;
    hasAccount: boolean | null;
  }> {
    try {
      const resp = await this.fetcher.get("/api/core/users/account");

      if (resp.status === 200 && resp.data.data) {
        // 계좌 조회 성공
        return {
          status: 200,
          message: "계좌 정보 불러오기 성공",
          hasAccount: resp.data.data.hasAccount,
        };
      }
      throw Error("실패");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        return {
          status: 400,
          message: error.response?.data.message || "알 수 없는 오류 발생",
          hasAccount: null,
        };
      } else {
        console.error(error);
        return {
          status: 500,
          message: "서버 오류 발생",
          hasAccount: null,
        };
      }
    }
  }

  async createAccount(): Promise<{
    status: number;
    message: string;
    data: string | null;
  }> {
    try {
      const resp = await this.fetcher.post("/api/core/users/account");

      if (resp.status === 200 && resp.data.data) {
        // 계좌 생성 성공
        return {
          status: 201,
          message: "계좌 생성 성공",
          data: resp.data.data,
        };
      }
      throw Error("실패");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        return {
          status: 400,
          message: error.response?.data.message || "알 수 없는 오류 발생",
          data: null,
        };
      } else {
        console.error(error);
        return {
          status: 500,
          message: "서버 오류 발생",
          data: null,
        };
      }
    }
  }
}
