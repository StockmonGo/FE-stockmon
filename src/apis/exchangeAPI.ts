import { IExchangeRequest } from "@/types/exchanges";
import { BaseApi, handleApiError } from "./baseAPI";
import { SuccessResponse } from "@/types/SuccessResponse";

const EXCHANGE_BASE_URL = "/api/core/stockmons/exchange";
export default class exchangeAPI extends BaseApi {
  // 교환 요청 목록 조회 API
  async getExchangeRequests(): Promise<IExchangeRequest[]> {
    try {
      const response = await this.fetcher.get(EXCHANGE_BASE_URL + "/request");
      return response.data.data.stockmons;
    } catch (error) {
      handleApiError(error);
    }
  }

  // 교환 요청
  async requestExchange(
    receiverId: number,
    travelerStockmonId: number
  ): Promise<SuccessResponse<null>> {
    try {
      const response = await this.fetcher.post(EXCHANGE_BASE_URL + "/request", {
        receiverId,
        travelerStockmonId,
      });
      return new SuccessResponse(response.status, "요청 성공", null);
    } catch (error) {
      handleApiError(error);
    }
  }

  // 교환 요청 수락
  async acceptExchange(
    noticeId: number,
    travelerStockmonId: number
  ): Promise<SuccessResponse<null>> {
    try {
      const response = await this.fetcher.post(EXCHANGE_BASE_URL + "/accept", {
        noticeId,
        travelerStockmonId,
      });
      return new SuccessResponse(response.status, "수락 성공", null);
    } catch (error) {
      handleApiError(error);
    }
  }

  // 교환 요청 거절
  async rejectExchange(noticeId: number): Promise<SuccessResponse<null>> {
    try {
      const response = await this.fetcher.post(EXCHANGE_BASE_URL + "/reject", {
        noticeId,
      });
      return new SuccessResponse(response.status, "거절 성공", null);
    } catch (error) {
      handleApiError(error);
    }
  }
}
