import axios from "axios";
import { BaseApi } from "./baseAPI";
import { IYardStockmonRes } from "@/types/stockmons";

export default class yardAPI extends BaseApi {
  async getYardStockmon(): Promise<IYardStockmonRes | null> {
    try {
      const resp = await this.fetcher.get("/api/core/stockmons/yard");
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
}
