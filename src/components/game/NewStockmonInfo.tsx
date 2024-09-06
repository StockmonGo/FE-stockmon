"use client";
import React, { useEffect } from "react";
import StockTag from "../ui/books/StockTag";
import "@/app/books/books.css";

import { STOCK_ICONS } from "@/types/stocks";
import { IStockmonDetailRes } from "@/types/stockmons";
import Row from "../ui/books/Row";

type InfoType = "detail" | "summary";

export default function NewStockmonInfo() {
  const data = {
    stockTypeName: "11",
    stockName: "fs",
    stockMarket: "dd",
    stockmonAveragePrice: 11111,
    stockTotalPrice: 1135,
    stockType: 1,
  };
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
        {type !== "summary" && (
          <Row>
            <p>포획 평균가</p>
            <p>{data.stockmonAveragePrice} \</p>
          </Row>
        )}
        <Row>
          {/*TODO: 소켓 연결하기*/}
          <p>현재 주가</p>
          <div className="flex flex-col gpa-1 items-end">
            <div className="flex gap-1">
              <p className="text-red-600">{3400}</p>
              <p className="">\</p>
            </div>
            <div className="flex gap-1 text-sm opacity-60">
              <p>(어제보다 </p>
              <p className="text-red-600">+{1200}</p>
              <p>\)</p>
            </div>
          </div>
        </Row>
        <Row>
          <p>종족치</p>
          <p>{data.stockTotalPrice} \</p>
        </Row>
      </section>
    </article>
  );
}
