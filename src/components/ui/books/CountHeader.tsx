"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../Skeleton";

type Props = {
  count: number;
};

export default function CountHeader({ count }: Props) {
  const STOCKMON_MAX = 200;
  const [stockmonCount] = useState<number>(count);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (stockmonCount) {
      setIsLoading(false);
    }
  }, [stockmonCount]);

  return (
    <div className="w-full h-full flex justify-center items-center font-ptb text-2xl">
      {isLoading && <Skeleton className="w-1/2 h-[30px]" />}
      {!isLoading && `${stockmonCount}/${STOCKMON_MAX}`}
    </div>
  );
}
