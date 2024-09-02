import React from "react";
import { StockmonType } from "@/types/stockmons";
import StockmonItem from "./StockmonItem";
import { Skeleton } from "../Skeleton";

type Props =
  | { isLoading: true; stockmons?: never }
  | { isLoading?: false; stockmons: StockmonType[] };

const centerStyle = "w-full h-full flex justify-center items-center";

export default function StockmonList({ isLoading, stockmons }: Props) {
  if (isLoading) {
    return (
      <ul className="w-full h-full grid grid-cols-3 grid-auto-rows gap-2">
        {Array.from({ length: 12 }, (_, i) => (
          <li key={i + 1} className="flex flex-col">
            <Skeleton className="w-full" style={{ aspectRatio: "1 / 1.2" }} />
          </li>
        ))}
      </ul>
    );
  }

  if (stockmons.length == 0) {
    return (
      <div className={`${centerStyle}  text-stock-dark-400 text-lg`}>
        스톡몬을 잡고 도감을 채워보세요!
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-2 py-2">
      {stockmons.map((stockmon) => (
        <StockmonItem key={stockmon.id} stockmon={stockmon} />
      ))}
    </ul>
  );
}
