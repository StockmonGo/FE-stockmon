"use client";
import React, { useEffect, useState } from "react";
import "animate.css";

type Props = {
  stockCode: string;
  stockmonId: number;
  stockmonName: string;
  description: string;
};

export default function NewStockmon(data: Props) {
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
    <article className="w-full p-5 font-ptb text-lg bg-border-custom-dotted bg-stock-blue-200">
      <figure className="relative aspect-square flex flex-col justify-center gap- p-5 bg-[url('/images/bgStamp.svg')] bg-no-repeat bg-cover">
        <p className="absolute text-stock-dark-300 top-4 left-4">
          No.{data.stockCode}
        </p>
        <img
          className={`animate__animated animate__zoomIn w-40 aspect-square mx-auto ${
            animate ? "gelatine" : ""
          }`}
          src={`${process.env.NEXT_PUBLIC_S3_URL}/${data.stockmonId}.png`}
          alt={data.stockmonName}
          onClick={handleImgClick}
        />
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
