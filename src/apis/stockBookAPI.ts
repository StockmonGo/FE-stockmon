import {
  IChartRes,
  IStockmonDetailRes,
  IStockmonsRes,
} from "@/types/stockmons";
import { BaseApi, handleApiError } from "./baseAPI";

export default class stockBookAPI extends BaseApi {
  // 스톡몬 목록 조회 API
  async getStockmons(): Promise<IStockmonsRes | null> {
    try {
      const response = await this.fetcher.get("/api/core/stockmons");
      return response.data.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  // 스톡몬 상세 조회 API
  async getStockmonDetail(id: string): Promise<IStockmonDetailRes | null> {
    try {
      const response = await this.fetcher.get(`/api/core/stockmons/${id}`);

      if (response.data.result === "fail") {
        return null;
      }

      return response.data.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  // 각 스톡몬 차트 조회 API
  async getStockmonChart(id: string): Promise<IChartRes | null> {
    try {
      const response = await this.fetcher.get(`/api/core/stockmons/${id}`);

      return response.data.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}
