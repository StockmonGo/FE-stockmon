import { BaseApi, handleApiError } from "./baseAPI";
import { SuccessResponse } from "@/types/SuccessResponse";
import { IAllianceRequest } from "@/types/alliances";
import { ITraveler } from "@/types/member";
const ALLIANCE_BASE_URL = "/api/core/alliances";
export default class allianceAPI extends BaseApi {
  // 동맹 목록 조회 API
  async getAlliances(): Promise<ITraveler[]> {
    try {
      const response = await this.fetcher.get(ALLIANCE_BASE_URL);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  // 동맹 요청 목록 조회 API
  async getAllianceRequests(): Promise<IAllianceRequest[]> {
    try {
      const response = await this.fetcher.get(ALLIANCE_BASE_URL + "/request");
      return response.data.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  // 동맹 요청
  async requestAlliance(travelerId: number): Promise<SuccessResponse<null>> {
    try {
      const response = await this.fetcher.post(ALLIANCE_BASE_URL + "/request", {
        targetTravelerId: travelerId,
      });
      return new SuccessResponse(response.status, "요청 성공", null);
    } catch (error) {
      handleApiError(error);
    }
  }

  // 동맹 요청 수락
  async acceptAlliance(noticeId: number): Promise<SuccessResponse<null>> {
    try {
      const response = await this.fetcher.post(ALLIANCE_BASE_URL + "/accept", {
        noticeId,
      });
      return new SuccessResponse(response.status, "수락 성공", null);
    } catch (error) {
      handleApiError(error);
    }
  }

  // 동맹 요청 거절
  async rejectAlliance(noticeId: number): Promise<SuccessResponse<null>> {
    try {
      const response = await this.fetcher.post(ALLIANCE_BASE_URL + "/reject", {
        noticeId,
      });
      return new SuccessResponse(response.status, "거절 성공", null);
    } catch (error) {
      handleApiError(error);
    }
  }
  async getUser(nickname: string): Promise<ITraveler | null> {
    const response = await this.fetcher.get(`/api/core/users?name=` + nickname);
    return response.data.data;
  }
}
