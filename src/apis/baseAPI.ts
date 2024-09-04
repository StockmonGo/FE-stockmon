import axios, { HttpStatusCode } from "axios";
const { NEXT_PUBLIC_BASE_URL } = process.env;
console.log("url:", process.env.NEXT_PUBLIC_BASE_URL);
//우리 서버랑 통신할 Api 세팅
export class BaseApi {
  fetcher;
  constructor(token?: string) {
    // axios.defaults.withCredentials = true;
    this.fetcher = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${token ? token : ""}`,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    });
  }
}

// 공통 에러 처리
export function handleApiError(error: any): never {
  if (axios.isAxiosError(error)) {
    if (error.response?.data.status === HttpStatusCode.BadRequest) {
      throw new Error("로그인이 만료되었습니다.");
    }

    console.error("Axios 에러:", error.response?.data.message || error.message);
    throw new Error("Axios 에러가 발생하였습니다.");
  } else {
    console.error("알 수 없는 에러:", error);
    throw new Error("알 수 없는 에러가 발생하였습니다.");
  }
}
