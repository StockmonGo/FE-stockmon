import { StockmonType } from "@/types/books/StockmonType";
import React from "react";

type Props = {
  stockmon: StockmonType;
};

export default function StockmonItem({ stockmon }: Props) {
  return (
    <li className="p-6 py-10 bg-stock-green">
      <a href={`/books/${stockmon.id}`}>{stockmon.name}</a>
    </li>
  );
}
