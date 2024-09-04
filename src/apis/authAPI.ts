import { BaseApi } from "./baseAPI";

export interface IAuth {
  nickname: string;
  password: string;
  inviterNickname?: string;
}

export default class authAPI extends BaseApi {
  async signUp(auth: IAuth): Promise<{
    status: number;
    message: string;
    user: { nickname: string } | null;
  }> {
    try {
      const resp = await this.fetcher.post("/api/core/users/join", {
        ...auth,
      });

      if (resp.status === 200 && resp.data.user) {
        // 로그인 성공
        return {
          status: 200,
          message: "회원가입 성공",
          user: resp.data,
        };
      }
      throw Error("실패");
    } catch (error) {
      console.error(error);
      return { status: 500, message: "회원가입 실패!!!", user: null };
    }
  }

  async signIn(auth: { nickname: string; password: string }): Promise<{
    status: number;
    message: string;
    user: { user_id: string; username: string } | null;
  }> {
    try {
      const response = await this.fetcher.post("/api/core/users/signin", {
        ...auth,
      });

      if (response.status >= 400) {
        throw Error;
      }
      if (response.status === 200) {
        // 로그인 성공
        return {
          status: 200,
          message: "로그인 성공",
          user: response.data.user,
        };
      } else {
        // 로그인 실패 시의 처리
        return {
          status: response.status,
          message: response.data.message,
          user: null,
        };
      }
    } catch (error) {
      return { status: 500, message: "로그인 처리 중 오류 발생", user: null };
    }
  }

  //post 로그아웃
  async signOut() {
    try {
      const resp = await this.fetcher.post("/api/core/users/signout");
      if (resp.status >= 400) {
        throw Error;
      }
      return resp.data;
    } catch {
      console.log("로그아웃 에러");
    }
  }
}
