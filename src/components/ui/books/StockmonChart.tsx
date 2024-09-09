import { IChartItemRes } from "@/types/stockmons";
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { Skeleton } from "../Skeleton";
import { useAtomValue } from "jotai";
import { realTimeStockPriceAtom } from "@/store/store";

type Props = {
  data: IChartItemRes[] | null | undefined;
  error: any;
};

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export default function StockmonChart({ data, error }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const realTimeStockPrice = useAtomValue(realTimeStockPriceAtom);
  const today = getTodayDate();

  useEffect(() => {
    if (data && chartContainerRef.current) {
      const found = data.find((item) => item.time === today);
      if (found && realTimeStockPrice) {
        found.value = realTimeStockPrice;
      }

      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          textColor: "#5D5D5D",
          fontSize: 14,
        },
        grid: {
          // 차트 내부 색
          vertLines: { color: "#D1D1D1" },
          horzLines: { color: "#D1D1D1" },
        },
        handleScroll: {
          vertTouchDrag: false,
          horzTouchDrag: true, // 수평 스크롤은 가능
        },
      });

      const lineSeries = chart.addLineSeries({
        color: "#82CB9A", // 라인색
      });
      lineSeries.setData(data);

      // 가로축
      chart.timeScale().fitContent();
      chart.timeScale().applyOptions({
        borderColor: "#888888",
      });

      // 세로축
      const myPriceFormatter = Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        minimumFractionDigits: 0,
      }).format;

      chart.applyOptions({
        localization: {
          priceFormatter: myPriceFormatter,
        },
        autoSize: false,
      });

      // 차트 리사이징 처리
      const handleResize = () => {
        chart.resize(
          chartContainerRef.current?.clientWidth || 0,
          chartContainerRef.current?.clientHeight || 0
        );
        chart.applyOptions({
          timeScale: {
            barSpacing: chartContainerRef.current?.clientWidth
              ? chartContainerRef.current?.clientWidth / 5
              : 10,
          },
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    }
  }, [data, realTimeStockPrice]);

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
      <div className="w-full h-60 mt-8 text-center">
        {(!data || error) && <Skeleton className="w-full h-full rounded-lg" />}
        <div ref={chartContainerRef} className="w-full h-full"></div>
      </div>
    </article>
  );
}
