"use client";
import { COLLECTION_MAX, IStockmonDetailRes } from "@/types/stockmons";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/app/animations.css";
import "animate.css";
import NewPoint from "../NewPoint";

type Props = {
  data: IStockmonDetailRes;
};

export default function StockmonCard({ data }: Props) {
  const params = useParams();
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  const handleImgClick = () => {
    setAnimate(true);
  };

  // 이미지 클릭시 뽀잉하는 애니메이션
  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => {
        setAnimate(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [animate]);

  return (
    <article className="animate__animated animate__flipInY w-full p-5 font-ptb text-lg bg-border-custom-dotted bg-stock-blue-200">
      <figure className="w-full aspect-square flex flex-col justify-between gap- p-5 bg-[url('/images/bgStamp.svg')] bg-no-repeat bg-cover">
        <p className="text-stock-dark-300">No.{data.stockCode}</p>
        <img
          className={`w-40 aspect-square mx-auto ${animate ? "gelatine" : ""}`}
          src={`${process.env.NEXT_PUBLIC_S3_URL}/${data.stockmonId}.png`}
          alt={data.stockmonName}
          onClick={handleImgClick}
        />
        <div className="relative text-right">
          <button
            className="relative p-2 px-3 rounded-lg text-stock-dark-500 bg-somsatang-gradient shadow-lg shadow-purple-200"
            onClick={() => {
              router.push(`/books/${params?.id}/collection`);
            }}
          >
            {data.catchCount >= COLLECTION_MAX && <NewPoint />}
            <i>{/* 흰 슬라이드 애니메이션 */}</i>x{data.catchCount}
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
          {data.stockmonName}
        </p>
        <div className="pt-2 font-ptr text-base text-stock-dark-400">
          {data.description}
        </div>
      </figcaption>
    </article>
  );
}
