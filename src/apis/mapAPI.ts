import { BaseApi } from "./baseAPI";
import { StockmonLocation, StockTowerLocation } from "@/types/location";

type ILocation = {
  latitude: number;
  longitude: number;
};

export default class mapAPI extends BaseApi {
  async getMapInfo(location: ILocation): Promise<{
    status: number;
    message: string;
    data: { stockmon: Array<StockmonLocation>; stockTowers: Array<StockTowerLocation> } | null;
  }> {
    try {
      const resp = await this.fetcher.post("/api/core/maps/stockmons", {
        ...location,
      });

      if (resp.status === 200 && resp.data.user) {
        // 주변 조회 성공
        return {
          status: 200,
          message: "지도 정보 불러오기 성공",
          data: resp.data,
        };
      }
      throw Error("실패");
    } catch (error) {
      console.error(error);
      return { status: 400, message: "사용자 좌표 오류", data: null };
    }
  }
}
