"use client";
import mapAPI from "@/apis/mapAPI";
import NewStockmon from "@/components/game/NewStockmon";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NewStockmonInfo from "@/components/game/NewStockmonInfo";
import { ICatchedStockmonRes } from "@/types/stockmons";
import Loading from "@/components/ui/Loading";
import { useStockBook } from "@/hooks/useStockBook";
import Error from "@/components/ui/Error";
import useSWR from "swr";
import Button from "@/components/ui/Button";

export default function Game() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const stockPrice = searchParams.get("pr") as string;
  const [stockmonData, setStockmonData] = useState<ICatchedStockmonRes>();
  const { getStockmonDetail } = useStockBook();
  const { data, error } = useSWR(id, getStockmonDetail);
  const router = useRouter();

  if (error) return <Error message={error.message} />;
  if (data === null) {
    return (
      <div
        className={`w-full h-full flex justify-center items-center text-stock-dark-400 text-lg`}
      >
        존재하지 않는 스톡몬입니다.
      </div>
    );
  }

  if (!data) {
    return <Loading />;
  }
  return (
    <div className="h-full">
      <div className="max-w-xl w-xl h-screen mx-auto">
        <div className="flex flex-col gap-5 pb-20 items-center">
          {data && (
            <>
              <img src="/icons/status-new.png" alt="새로 추가" />
              <NewStockmon
                stockCode={data.stockCode}
                stockmonId={data.stockmonId}
                stockmonName={data.stockmonName}
                description={data.description}
              />
              <NewStockmonInfo
                stockTypeName={data.stockTypeName}
                stockName={data.stockmonName}
                stockMarket={data.stockMarket}
                stockTotalPrice={data.stockTotalPrice}
                stockType={data.stockType}
                stockPrice={+stockPrice}
              />
              <Button
                onClick={() => {
                  router.push("/books");
                }}
                text={"도감으로 보러가기"}
              ></Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
