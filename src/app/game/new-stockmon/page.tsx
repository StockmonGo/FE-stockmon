"use client";
import mapAPI from "@/apis/mapAPI";
import NewStockmon from "@/components/game/NewStockmon";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NewStockmonInfo from "@/components/game/NewStockmonInfo";
import { ICatchedStockmonRes } from "@/types/stockmons";

export default function Game() {
  const searchParams = useSearchParams();
  const world = searchParams.get("world") as string;
  const id = searchParams.get("id") as string;
  const sb = searchParams.get("sb") as string;
  const service = new mapAPI();
  const [stockmonData, setStockmonData] = useState<ICatchedStockmonRes>();
  const catchStockmon = async () => {
    const res = await service.catchStockmon({
      worldId: +world,
      stockmonId: +id,
      usedStockballs: +sb,
    });
    res && setStockmonData(res);
  };

  useEffect(() => {
    catchStockmon();
  }, []);

  return (
    <div className="h-full">
      <div className="max-w-xl w-xl h-screen mx-auto">
        <div className="flex flex-col gap-5 pb-20 items-center">
          {stockmonData && (
            <>
              <img src="/icons/status-new.png" alt="새로 추가" />
              <NewStockmon
                stockCode={stockmonData.stockCode}
                stockmonId={stockmonData.stockmonId}
                stockmonName={stockmonData.stockmonName}
                description={stockmonData.description}
              />
              <NewStockmonInfo
                stockTypeName={stockmonData.stockTypeName}
                stockName={stockmonData.stockmonName}
                stockMarket={stockmonData.stockMarket}
                stockTotalPrice={stockmonData.stockTotalPrice}
                stockType={stockmonData.stockType}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
