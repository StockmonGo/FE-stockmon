"use client";
import { COLLECTION_MAX, IStockmonDetailRes } from "@/types/stockmons";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/app/animations.css";
import "animate.css";
import NewPoint from "../NewPoint";
import Button from "../Button";

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
    <article className="animated flipInY w-full p-5 font-ptb text-lg bg-border-custom-dotted bg-stock-blue-200">
      <figure className="w-full aspect-square flex flex-col justify-between p-5 bg-[url('/images/bgStamp.svg')] bg-no-repeat bg-cover">
        <p className="text-stock-dark-300">No.{data.stockCode}</p>
        <img
          className={`w-40 aspect-square mx-auto ${animate ? "gelatine" : ""}`}
          src={`${process.env.NEXT_PUBLIC_S3_URL}/${data.stockmonId}.png`}
          alt={data.stockmonName}
          onClick={handleImgClick}
        />
        <div className="relative w-fit self-end">
          <i>{/* 흰 슬라이드 애니메이션 */}</i>
          {data.catchCount >= COLLECTION_MAX && <NewPoint />}
          <Button
            className="mb-0"
            style={{
              paddingTop: "0.3rem",
              paddingBottom: "0.3rem",
              paddingLeft: "0.6rem",
              paddingRight: "0.6rem",
            }}
            onClick={() => {
              router.push(`/books/${params?.id}/collection`);
            }}
            text={`x${data.catchCount}`}
          />
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
