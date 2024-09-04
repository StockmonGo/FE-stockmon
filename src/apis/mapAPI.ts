import axios from "axios";
import { BaseApi } from "./baseAPI";
import { ILocation, IStockTowerBallRes, IStockTowerInfoRes, IWorldRes } from "@/types/location";

export default class mapAPI extends BaseApi {
  async getMapInfo(location: ILocation): Promise<IWorldRes | null> {
    try {
      const resp = await this.fetcher.post("/api/core/maps/stockmons", {
        ...location,
      });
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

  async getStockTowerInfo(towerId: number): Promise<IStockTowerInfoRes | null> {
    try {
      const resp = await this.fetcher.get(`/api/core/stocktowers/${towerId}`);
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

  async spinStockTower(towerId: number): Promise<IStockTowerBallRes | null> {
    try {
      const resp = await this.fetcher.post("/api/core/stocktowers", {
        towerId,
      });
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
