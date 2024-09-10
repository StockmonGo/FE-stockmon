import { IAccountInfoRes, IMemberRes, IStock } from "@/types/member";
import { BaseApi } from "./baseAPI";
import axios from "axios";
import { SuccessResponse } from "@/types/SuccessResponse";

export default class memberAPI extends BaseApi {
  async getMemberProfile(): Promise<IMemberRes | null> {
    try {
      const resp = await this.fetcher.get("/api/core/users/profile");
      return resp.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        throw Error(error.message);
      } else {
        throw Error("알 수 없는 에러 발생");
      }
    }
  }

  async getAccountStatus(): Promise<IAccountInfoRes | null> {
    try {
      const resp = await this.fetcher.get("/api/core/users/account");
      return resp.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        throw Error(error.response?.data.message);
      } else {
        throw Error("알 수 없는 에러 발생");
      }
    }
  }

  async createAccount() {
    try {
      const resp = await this.fetcher.post("/api/core/users/account");
      return resp.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        throw Error(error.response?.data.message);
      } else {
        throw Error("알 수 없는 에러 발생");
      }
    }
  }
  async getStocks(): Promise<{ stocks: IStock[] }> {
    try {
      const resp = await this.fetcher.get("/api/core/users/stock");
      return resp.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        throw Error(error.response?.data.message);
      } else {
        throw Error("알 수 없는 에러 발생");
      }
    }
  }
  async didTutorial(): Promise<SuccessResponse<null>> {
    try {
      const resp = await this.fetcher.post("/api/core/users/tutorial");
      return new SuccessResponse(resp.status, "튜토리얼 완료", null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        throw Error(error.response?.data.message);
      } else {
        throw Error("알 수 없는 에러 발생");
      }
    }
  }
}
