"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import mapAPI from "@/apis/mapAPI";
type Props = {
  usingStockball: number;
};

export default function PeachCount({ usingStockball }: Props) {
  const [stockballs, setStockballs] = useState(0);
  const service = new mapAPI();
  useEffect(() => {
    service
      .getStockBallNum()
      .then((res) => {
        if (res) {
          setStockballs(res.stockballs);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="fixed flex items-end min-w-28 justify-end right-[20px] top-6">
      <Image
        alt="peach"
        src="/images/peach.svg"
        width={44}
        height={44}
        className="absolute right-[60px]"
      />
      <div className="bg-white rounded-lg px-2 py-1 h-fit mb-[2px]">
        <p className="font-ptr text-stock-dark-800 leading-5">
          {stockballs - usingStockball} / 50
        </p>
      </div>
    </div>
  );
}
