"use client";
import React from "react";
import { Skeleton } from "../Skeleton";
import { STOCKMON_MAX } from "@/types/stockmons";

type Props =
  | { isLoading: true; count?: never }
  | { isLoading?: false; count: number };

export default function CountHeader({ isLoading, count }: Props) {
  return (
    <div className="w-full h-full p-3 flex justify-center items-center ">
      {isLoading ? (
        <Skeleton className="w-1/4 h-8 rounded-lg" />
      ) : (
        <p className=" font-bold text-2xl text-stock-dark-600">
          {count}/{STOCKMON_MAX}
        </p>
      )}
    </div>
  );
}
