import { StockmonType } from "@/types/stockmons";
import { useRouter } from "next/navigation";
import React from "react";
import { Skeleton } from "../Skeleton";

type Props = {
  stockmon: StockmonType;
};

export default function StockmonItem({ stockmon }: Props) {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/books/${stockmon.id}`);
  };

  return (
    <li className="w-full bg-stock-purple" onClick={handleOnClick}>
      {stockmon ? (
        <>
          <img className="w-full bg-white" src="/images/octopus.png" />
          <p className="p-2 text-center text-white font-ptr">{stockmon.name}</p>
        </>
      ) : (
        <Skeleton className="w-full h-44" />
      )}
    </li>
  );
}
