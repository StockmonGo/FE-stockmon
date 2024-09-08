import { ITraveler } from "@/types/member";
import { BaseApi } from "./baseAPI";

export interface IAuth {
  nickname: string;
  password: string;
  inviterNickname?: string;
}

export default class authAPI extends BaseApi {
  async signUp(auth: IAuth) {
    const response = await this.fetcher.post("/api/core/users/join", {
      ...auth,
    });
    return response.data;
  }

  async signIn(auth: { nickname: string; password: string }) {
    const response = await this.fetcher.post("/api/core/users/signin", {
      ...auth,
    });
    return response.data;
  }

  async withdraw() {
    const response = await this.fetcher.delete("/api/core/users/withdraw");
    return response.data;
  }

  async getUser(nickname: string): Promise<ITraveler | null> {
    const response = await this.fetcher.get(`/api/core/users?name=` + nickname);
    return response.data.traveler;
  }
}
