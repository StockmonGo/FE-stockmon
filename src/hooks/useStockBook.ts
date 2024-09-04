import stockBookAPI from "@/apis/stockBookAPI";
import React, { useCallback, useMemo } from "react";

export function useStockBook() {
  // TODO: 토큰 가져오기
  const service = useMemo(() => new stockBookAPI(), []);

  const getStockmons = useCallback(async () => {
    const res = await service.getStockmons();
    return res;
  }, [service]);

  return {
    getStockmons,
  };
}
