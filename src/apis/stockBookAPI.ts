import { IStockmonsRes } from "@/types/stockmons";
import { BaseApi } from "./baseAPI";
import axios, { HttpStatusCode } from "axios";

export default class stockBookAPI extends BaseApi {
  async getStockmons(): Promise<IStockmonsRes | null> {
    try {
      const response = await this.fetcher.get("/api/core/stockmons");
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.status === HttpStatusCode.BadRequest) {
          throw Error("로그인이 만료되었습니다.");
        }

        console.error(
          "Axios 에러:",
          error.response?.data.message || error.message
        );
        throw Error("Axios 에러가 발생하였습니다.");
      } else {
        console.error("알 수 없는 에러:", error);
        throw Error("알 수 없는 에러가 발생하였습니다.");
      }
    }
  }
}
