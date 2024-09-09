"use client";
import { IStockmonDetailRes } from "@/types/stockmons";
import React, { useEffect, useState } from "react";
import "@/app/books/books.css";
import StockTag from "./StockTag";
import { STOCK_ICONS } from "@/types/stocks";
import Row from "./Row";
import { client } from "@/sockets/baseStomp";
import { formatNumber } from "@/utils/nums";
import { useAtom, useSetAtom } from "jotai";
import { realTimeStockPriceAtom } from "@/store/store";

type InfoType = "detail" | "summary";

type Props = {
  data: IStockmonDetailRes;
  type?: InfoType;
};

export default function StockmonStock({ data, type }: Props) {
  const Icon = STOCK_ICONS[data.stockType];
  const [realTimePrice, setRealTimePrice] = useState<string>("-");
  const [realTimeDiff, setRealTimeDiff] = useState<string>("-");
  const [priceColor, setPriceColor] = useState<string>("");
  const setRealTimeStockPrice = useSetAtom(realTimeStockPriceAtom);

  const connect = () => {
    client.activate();
    client.onConnect = function (frame: any) {
      client.publish({
        destination: `/app/${data.stockCode}`,
        body: "Hello world",
      });
      client.subscribe(`/${data.stockCode}/greetings`, callback);
    };
  };

  const callback = function (message: any) {
    if (message.body) {
      const realPrice = JSON.parse(message.body).content;
      const diff: number = Number(realPrice) - data.stockClosedPrice;
      setRealTimePrice(realPrice);
      setRealTimeStockPrice(Number(realPrice));

      if (diff > 0) {
        setPriceColor("text-red-600");
        setRealTimeDiff("+" + diff.toString());
      } else {
        setPriceColor("text-blue-600");
        setRealTimeDiff(diff.toString());
      }
    } else {
      setRealTimePrice("-");
      setRealTimeDiff("-");
      setPriceColor("text-stock-dark-500");
    }
  };

  const disconnect = () => {
    // client.onDisconnect = function () {
    //   console.log("연결 끊김");
    // };
    client.deactivate();
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

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
            <p>{formatNumber(data.stockmonAveragePrice)} 원</p>
          </Row>
        )}
        <Row>
          {/*TODO: 소켓 연결하기*/}
          <p>현재 주가</p>
          <div className="flex flex-col gpa-1 items-end">
            <div className="flex gap-1">
              <p
                className={
                  realTimePrice === "-" ? "text-stock-dark-500" : priceColor
                }
              >
                {isNaN(Number(realTimePrice))
                  ? realTimePrice
                  : formatNumber(Number(realTimePrice))}
              </p>
              <p className="">원</p>
            </div>
            <div className="flex gap-1 text-sm opacity-60">
              <p>(어제보다 </p>
              <p
                className={
                  realTimePrice === "-" ? "text-stock-dark-500" : priceColor
                }
              >
                {isNaN(Number(realTimeDiff))
                  ? realTimeDiff
                  : formatNumber(Number(realTimeDiff))}
              </p>
              <p>원)</p>
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
