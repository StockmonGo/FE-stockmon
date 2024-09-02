import React, { useState } from "react";
import BtnClose from "../BtnClose";
import { GiTwoCoins } from "react-icons/gi";
import Button from "../Button";
type Props = {
  open: boolean;
  onClose: () => void;
  image: string;
  stockmonName: string;
};

export default function RealStockExchangeModal({
  open,
  image,
  onClose,
  stockmonName,
}: Props) {
  return (
    open && (
      <div className="fixed inset-0 bg-stock-dark-950 bg-opacity-20 flex justify-center items-center z-50 px-6">
        <div className="w-full h-full pb-24 flex flex-col justify-end items-center">
          <figure>
            <img
              className="w-60 aspect-square object-cover animate-bounce"
              src={image}
              alt="스톡몬 이미지"
            />
          </figure>
          <figcaption className="flex flex-col gap-3 items-center p-4 bg-white rounded-lg">
            <p className="font-ptb text-lg text-stock-blue-900">
              대 {stockmonName}
            </p>
            <p className=" text-center break-keep text-stock-blue-950">
              "그동안 우리 아이들을 잘 돌봐주셔서 감사합니다. 이 은혜는 돈으로
              갚겠습니다."
            </p>
          </figcaption>
        </div>
        <footer className="fixed mx-auto bottom-6 w-fit flex justify-center items-center">
          <button
            onClick={onClose}
            className=" flex justify-center items-center bg-stock-blue-950 p-2 w-20 rounded-full"
          >
            <i></i>
            <GiTwoCoins size={28} color="FFEA00" />
            <div className="circle"></div>
          </button>
        </footer>
      </div>
    )
  );
}
