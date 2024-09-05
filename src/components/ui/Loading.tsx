"use client";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const texts: { [key: number]: string } = {
  0: "스톡몬을 20마리 이상 잡으면 실제 주식으로 받을 수 있습니다.",
  1: "스톡몬마다 자주 출몰하는 지역이 다릅니다.",
  2: "스톡몬은 실제 주가에 따라 기분이 달라집니다.",
};

export default function Loading() {
  const text: string =
    texts[Math.floor(Math.random() * Object.keys(texts).map(Number).length)];
  const imgUrl = `${process.env.NEXT_PUBLIC_S3_URL}/${
    Math.floor(Math.random() * 58) + 1
  }.png`; // 1이상 58이하

  return (
    <div className="fixed left-0 right-0 w-full h-full overflow-hidden z-0">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-3 justify-center items-center">
          {imgUrl && (
            <img className="w-1/2 aspect-square" src={imgUrl} alt="스톡몬" />
          )}
          {<AiOutlineLoading className="animate-spin m-auto" color={"gray"} />}
          <div className="w-4/5 break-all mx-6 text-center text-stock-dark-600 text-lg">
            {text}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
