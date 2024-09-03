import { StockmonType } from "@/types/stockmons";
import { BaseApi } from "./baseAPI";

export default class stockBookAPI extends BaseApi {
  async getStockmons(): Promise<{
    status: number;
    message: string;
    data: { stockmons: StockmonType[] } | null;
  }> {
    try {
      const response = await this.fetcher.get("/api/core/stockmons");

      if (response.status >= 400) {
        throw Error;
      }
      if (response.status === 200) {
        // 스톡몬 목록 가져오기 성공
        return {
          status: 200,
          message: "스톡몬 목록 가져오기 성공",
          data: response.data.data,
        };
      } else {
        // 스톡몬 목록 가져오기 실패 시의 처리
        return {
          status: response.data.status,
          message: response.data.data.message,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: "스톡몬 목록 가져오기 처리 중 오류 발생",
        data: null,
      };
    }
  }
}
