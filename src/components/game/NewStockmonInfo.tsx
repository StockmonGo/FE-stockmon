"use client";
import React from "react";
import StockTag from "../ui/books/StockTag";
import "@/app/books/books.css";
import { STOCK_ICONS } from "@/types/stocks";
import Row from "../ui/books/Row";
import { formatNumber } from "@/utils/nums";

type Props = {
  stockTypeName: string;
  stockName: string;
  stockMarket: string;
  stockTotalPrice: number;
  stockType: number;
  stockPrice: number;
};

export default function NewStockmonInfo(data: Props) {
  const type = "summary";
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
        <Row>
          <p>현재 주가</p>
          <div className="flex flex-col gpa-1 items-end">
            <div className="flex gap-1">
              <p className="text-red-600">{formatNumber(data.stockPrice)}</p>
              <p className="">원</p>
            </div>
          </div>
        </Row>
        <Row>
          <p>종족치</p>
          <p>{formatNumber(data.stockTotalPrice / 10000)} 만원</p>
        </Row>
      </section>
    </article>
  );
}
