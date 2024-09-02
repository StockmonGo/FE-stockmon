import axios from "axios";
const { NEXT_PUBLIC_BASE_URL } = process.env;
console.log("url:", process.env.NEXT_PUBLIC_BASE_URL);
//우리 서버랑 통신할 Api 세팅
export class BaseApi {
  fetcher;
  constructor(token?: string) {
    // axios.defaults.withCredentials = true;
    this.fetcher = axios.create({
      baseURL: NEXT_PUBLIC_BASE_URL,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
  }
}
