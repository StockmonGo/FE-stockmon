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
}
