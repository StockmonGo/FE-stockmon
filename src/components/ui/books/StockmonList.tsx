import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { StockmonType } from "@/types/books/StockmonType";
import StockmonItem from "./StockmonItem";

type Props =
  | { isLoading: true; stockmons?: never }
  | { isLoading?: false; stockmons: StockmonType[] };

const CENTER_LAYOUT = "w-full h-full flex justify-center items-center";

export default function StockmonList({ isLoading, stockmons }: Props) {
  if (isLoading) {
    return (
      <div className={CENTER_LAYOUT}>
        <AiOutlineLoading className="animate-spin m-auto" color={"gray"} />
      </div>
    );
  }

  if (stockmons.length == 0) {
    return (
      <div className={`${CENTER_LAYOUT}  text-stock-dark-400 text-lg`}>
        스톡몬을 잡고 도감을 채워보세요!
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-2">
      {stockmons.map((stockmon) => (
        <StockmonItem key={stockmon.id} stockmon={stockmon} />
      ))}
    </ul>
  );
}
