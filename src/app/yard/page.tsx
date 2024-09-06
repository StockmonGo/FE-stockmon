"use client";
import BtnClose from "@/components/ui/BtnClose";
import { randomInt } from "crypto";
import "@/app/world/world.css";
import StockmonFeel from "@/components/ui/yard/StockmonFeel";
import { useStockBook } from "@/hooks/useStockBook";
import useSWR from "swr";
import { IStockmonsRes } from "@/types/stockmons";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";

export default function Yard() {
  const { getStockmons } = useStockBook();
  const { data, error } = useSWR<IStockmonsRes | null>("stockmons", getStockmons);
  if (error) {
    return <Error message={error.message} />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="w-screen max-w-lg h-screen bg-[url('/images/yardBg.png')] bg-cover bg-no-repeat relative">
      {data.stockmons.map((item) => {
        const top = randomInt(500) + "px";
        const left = randomInt(300) + "px";

        return (
          <div key={item.id} style={{ top, left }} className="bounce w-fit h-fit absolute grid justify-items-center">
            <StockmonFeel stockmon={item} />
          </div>
        );
      })}
      <div className="fixed bottom-6 w-full flex justify-center">
        <BtnClose />
      </div>
    </div>
  );
}
