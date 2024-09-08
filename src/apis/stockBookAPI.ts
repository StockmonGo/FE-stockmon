import {
  IChartItemRes,
  IStockmonDetailRes,
  IStockmonsRes,
} from "@/types/stockmons";
import { BaseApi, handleApiError } from "./baseAPI";
import { SuccessResponse } from "@/types/SuccessResponse";

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
  async getStockmonChart(id: string): Promise<IChartItemRes[] | null> {
    try {
      const response = await this.fetcher.get(`/api/stock/chart/${id}`);

      return response.data.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  // 스톡몬 실제 주신 받기 API
  async postStockExchange(stockCode: string): Promise<SuccessResponse<null>> {
    try {
      const response = await this.fetcher.post(`/api/core/stocks/exchange`, {
        stockCode: stockCode,
      });
      return new SuccessResponse(response.status, "주식 받기 성공", null);
    } catch (error) {
      handleApiError(error);
    }
  }
}
