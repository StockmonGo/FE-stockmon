import exchangeAPI from "@/apis/exchangeAPI";
import React, { useCallback, useMemo } from "react";

export default function useExchange() {
  const service = useMemo(() => new exchangeAPI(), []);

  const requestExchange = useCallback(
    async (travelerId: number, travelerStockmonId: number) => {
      const res = await service.requestExchange(travelerId, travelerStockmonId);
      return res;
    },
    [service]
  );
  const acceptExchange = useCallback(
    async (noticeId: number, travelerStockmonId: number) => {
      const res = await service.acceptExchange(noticeId, travelerStockmonId);
      return res;
    },
    [service]
  );
  const rejectExchange = useCallback(
    async (noticeId: number) => {
      const res = await service.rejectExchange(noticeId);
      return res;
    },
    [service]
  );
  return { requestExchange,acceptExchange,rejectExchange};
}
