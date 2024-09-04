import { IChartRes } from "@/types/stockmons";
import React, { useEffect, useRef } from "react";
import { BarPrice, createChart } from "lightweight-charts";

type Props = {
  data: IChartRes;
};

const chartData = [
  { time: "2023-01-01", value: 2300 },
  { time: "2023-02-01", value: 2200 },
  { time: "2023-03-01", value: 2350 },
  { time: "2023-06-01", value: 2450 },
  { time: "2023-07-01", value: 2120 },
  { time: "2023-08-01", value: 2680 },
];

export default function StockmonChart({ data }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartContainerRef.current) {
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
      });

      const lineSeries = chart.addLineSeries({
        color: "#82CB9A", // 라인색
      });
      lineSeries.setData(chartData);

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
      });

      // 차트 리사이징 처리
      const handleResize = () => {
        chart.resize(
          chartContainerRef.current?.clientWidth || 0,
          chartContainerRef.current?.clientHeight || 0
        );
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    }
  }, []);

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
        <div ref={chartContainerRef} className="w-full h-full"></div>
      </div>
    </article>
  );
}
