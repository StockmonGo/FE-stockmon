"use client";
import React from "react";
import { Skeleton } from "../Skeleton";

type Props =
  | { isLoading: true; count?: never }
  | { isLoading?: false; count: number };

export default function CountHeader({ isLoading, count }: Props) {
  const STOCKMON_MAX = 200;

  return (
    <div className="w-full h-full flex justify-center items-center font-ptb text-2xl">
      {isLoading ? (
        <Skeleton className="w-1/2 h-[30px]" />
      ) : (
        <>
          {count}/{STOCKMON_MAX}
        </>
      )}
    </div>
  );
}
