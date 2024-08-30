import { StockmonDetailType } from "@/types/stockmons";
import React from "react";
import "@/app/books/books.css";
import StockTag from "./StockTag";
import { AiFillBank } from "react-icons/ai";
import { STOCK_ICONS } from "@/types/stocks";

type InfoType = "detail" | "summary";

type Props = {
  data: StockmonDetailType;
  type?: InfoType;
};

export default function StockmonStock({ data, type }: Props) {
  const Icon = STOCK_ICONS[data.stockType];

  return (
    <article className="w-full p-4 flex flex-col gap-3 purple-bubble">
      <section className="flex flex-wrap justify-end gap-1">
        <StockTag
          content={Icon && <Icon size={20} />}
          category={data.stockTypeName}
        />
        <StockTag content={data.stockName} category="종족" />
        <StockTag content={data.stockMarket} category="소속" />
      </section>
      <section className="flex flex-col gap-3 px-7 py-5 bg-white bg-opacity-50 font-ptb text-[#715EB7] text-lg">
        {type !== "summary" && (
          <div className="flex justify-between">
            <p>포획 평균가</p>
            <p>{data.stockmonAveragePrice} \</p>
          </div>
        )}
        <div className="flex justify-between">
          <p>현재 주가</p>
          <p>{data.currentStockPrice} \</p>
        </div>
        <div className="flex justify-between">
          <p>종족치</p>
          <p>{data.stockTotalPrice} \</p>
        </div>
      </section>
    </article>
  );
}
