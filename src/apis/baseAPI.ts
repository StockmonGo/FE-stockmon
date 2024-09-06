import axios, { HttpStatusCode } from "axios";

//우리 서버랑 통신할 Api 세팅
export class BaseApi {
  fetcher;
  constructor() {
    // axios.defaults.withCredentials = true;
    this.fetcher = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        "Content-type": "application/json",
      },
    });

    // 요청 인터셉터
    this.fetcher.interceptors.request.use(
      (config) => {
        // 헤더에 엑세스 토큰 담기
        const accessToken: string | null = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

// 공통 에러 처리
export function handleApiError(error: any): never {
  if (axios.isAxiosError(error)) {
    if (error.response?.data.status === HttpStatusCode.BadRequest) {
      throw new Error("로그인이 만료되었습니다.");
    }

    console.error("Axios 에러:", error.response?.data.message || error.message);
    throw new Error("서버 오류가 발생하였습니다.");
  } else {
    console.error("알 수 없는 에러:", error);
    throw new Error("알 수 없는 에러가 발생하였습니다.");
  }
}
