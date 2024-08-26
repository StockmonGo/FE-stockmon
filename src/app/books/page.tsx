"use client";
import CountHeader from "@/components/ui/books/CountHeader";
import CommonLayout from "@/components/ui/CommonLayout";
import { Skeleton } from "@/components/ui/Skeleton";
import React, { useState } from "react";
import useSWR from "swr";

type StockmonItem = {
  id: number;
  name: string;
  imgUrl: string;
  count: number;
  stockCode: number;
  stockAveragePrice: number;
};

const dummy: { stockmons: StockmonItem[] } = {
  stockmons: [
    {
      id: 1,
      name: "신한지주몬",
      imgUrl: "http~",
      count: 10,
      stockCode: 124125,
      stockAveragePrice: 145400,
    },
    {
      id: 2,
      name: "하나금융지주몬",
      imgUrl: "http~",
      count: 12,
      stockCode: 141125,
      stockAveragePrice: 235400,
    },
  ],
};

const fetcher = (url: string) => {
  // TODO: api 요청
  return dummy;
};

export default function Books() {
  const { data, error } = useSWR("/api/user", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <CommonLayout title={"도감"} header={<CountHeader isLoading />}>
        <div></div>
      </CommonLayout>
    );
  return (
    <CommonLayout
      title={"도감"}
      header={
        /* TODO: api 연결 */
        <CountHeader count={data.stockmons.length} />
      }
    >
      <ul>
        {data.stockmons.map((stockmon) => (
          <li key={stockmon.id}>
            <a href={`/books/${stockmon.id}`}>{stockmon.name}</a>
          </li>
        ))}
      </ul>
    </CommonLayout>
  );
}
