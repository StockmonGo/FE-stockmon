import axios from "axios";
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
