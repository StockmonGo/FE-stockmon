"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import mapAPI from "@/apis/mapAPI";
type Props = {
  stockballCnt: number;
};

export default function PeachCount({ stockballCnt }: Props) {
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
          {stockballCnt} / 50
        </p>
      </div>
    </div>
  );
}
