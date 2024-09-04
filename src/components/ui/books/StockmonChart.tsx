import { IChartRes } from "@/types/stockmons";
import React, { useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";

type Props = {
  data: IChartRes;
};

export default function StockmonChart({ data }: Props) {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <article className="relative w-full p-4 bg-white border-4 border-dashed border-[#98DFAF]">
      <img
        className="absolute fade-out-right -left-12 -top-3 scale-[2.5] opacity-80"
        src="/images/chartWave.svg"
        alt="물결 이미지"
      />
      <div className="absolute py-2 px-8 -top-2 -right-2 rotate-3 font-ptb text-lg text-stock-dark-400 border-2 border-[#98DFAF] bg-[#ECFFEE]">
        월별 차트
      </div>
      <div className="w-full h-60 mt-8 text-center bg-stock-dark-200">
        {!data && `차트가 없어요`}
        <TradingViewWidget />
      </div>
    </article>
  );
}
