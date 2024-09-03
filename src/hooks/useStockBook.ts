import stockBookAPI from "@/apis/stockBookAPI";
import { useEffect } from "react";

export function useStockBook() {
  //TODO: 상태관리(jotai)로 유저 정보 전역 저장해놓기
  const service = new stockBookAPI();

  // GET stockmons
  async function getStocks() {
    try {
      const res = await service.getStockmons();
      console.log("res", res);
      if (res && res.data) {
        return res.data;
      } else {
        throw Error;
      }
    } catch (err) {
      console.log("Error to getStock", err);
      return false;
    }
  }

  //TODO: 마운트시 토큰 세팅
  useEffect(() => {
    async function init() {}
    init();
  }, []);

  return {
    getStocks,
  };
}
