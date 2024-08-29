"use client";
import { StockmonDetailType } from "@/types/stockmons";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/app/animations.css";

type Props = {
  data: StockmonDetailType;
};

export default function StockmonCard({ data }: Props) {
  const params = useParams();
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true); // 애니메이션을 시작
  };

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => {
        setAnimate(false); // 일정 시간 후 애니메이션 제거
      }, 500); // 애니메이션의 지속 시간에 맞게 조정

      return () => clearTimeout(timeout); // 클린업
    }
  }, [animate]);
  return (
    <article className="w-full p-5 font-ptb text-lg bg-border-custom-dotted bg-stock-blue-200">
      <figure className="aspect-square flex flex-col justify-between gap- p-5 bg-[url('/images/bgStamp.svg')] bg-no-repeat bg-cover">
        <p className="text-stock-dark-300">No.{data.stockCode}</p>
        <img
          className={`w-2/3 mx-auto ${animate ? "gelatine" : ""}`}
          src={data.imageUrl}
          alt={data.stockmonName}
          onClick={handleClick}
        />
        <div className="text-right">
          <button
            className="p-2 px-3 rounded-lg text-stock-dark-500 bg-somsatang-gradient"
            onClick={() => {
              router.push(`/books/${params.id}/collection`);
            }}
          >
            x{data.catchCount}
          </button>
        </div>
      </figure>
      <figcaption className="relative mt-10 p-4 rounded-lg bg-yellow-50">
        <img
          className="absolute w-full max-h-10 inset-0 scale-[1.2] -top-7 z-1"
          src="/images/ribbon.png"
          alt="ribbon"
        />
        <p className="absolute w-full flex justify-center left-0 -top-6 z-1 text-lg text-white">
          {data.stockName}
        </p>
        <div className="pt-2 font-ptr text-base text-stock-dark-400">
          {data.description}
        </div>
      </figcaption>
    </article>
  );
}
