"use client";
import BtnClose from "@/components/ui/BtnClose";
import "@/app/world/world.css";
import StockmonFeel from "@/components/ui/yard/StockmonFeel";
import useSWR from "swr";
import { IYardStockmonRes } from "@/types/stockmons";
import Loading from "@/components/ui/Loading";
import yardAPI from "@/apis/yardAPI";

export default function Yard() {
  const service = new yardAPI();
  const { data, error } = useSWR<IYardStockmonRes | null>("memberProfile", () => service.getYardStockmon());
  const getRandomPosition = (max: number) => Math.floor(Math.random() * (max - 50)) + 50 + "px";

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen-small flex justify-center">
      <div className="w-screen max-w-xl h-full bg-[url('/images/yardBg.png')] bg-cover bg-no-repeat relative flex justify-center">
        {data.stockmons &&
          data.stockmons.length > 0 &&
          data.stockmons.map((item) => {
            const top = getRandomPosition(500);
            const left = getRandomPosition(300);

            return (
              <div key={item.id} style={{ top, left }} className="bounce w-fit absolute grid justify-items-center">
                <StockmonFeel stockmon={item} />
              </div>
            );
          })}
        <div className="fixed bottom-6">
          <BtnClose />
        </div>
      </div>
    </div>
  );
}
