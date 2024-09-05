"use client";
import { COLLECTION_MAX, IStockmonDetailRes } from "@/types/stockmons";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/app/animations.css";
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

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => {
        setAnimate(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [animate]);
  return (
    <article className="w-full p-5 font-ptb text-lg bg-border-custom-dotted bg-stock-blue-200">
      <figure className="aspect-square flex flex-col justify-between gap- p-5 bg-[url('/images/bgStamp.svg')] bg-no-repeat bg-cover">
        <p className="text-stock-dark-300">No.{data.stockCode}</p>
        <img
          className={`w-full mx-auto ${animate ? "gelatine" : ""}`}
          src={`${process.env.NEXT_PUBLIC_S3_URL}/${data.stockmonId}.png`}
          alt={data.stockmonName}
          onClick={handleImgClick}
        />
        <div className="relative text-right">
          {data.catchCount >= COLLECTION_MAX && <NewPoint />}
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
          {data.stockmonName}
        </p>
        <div className="pt-2 font-ptr text-base text-stock-dark-400">
          {data.description}
        </div>
      </figcaption>
    </article>
  );
}
