"use client";
import CountHeader from "@/components/ui/books/CountHeader";
import StockmonList from "@/components/ui/books/StockmonList";
import CommonLayout from "@/components/ui/CommonLayout";
import SearchBar from "@/components/ui/SearchBar";
import React from "react";
import useSWR from "swr";

const dummy = {
  stockmons: [
    {
      id: 1,
      name: "신한지주몬1",
      imgUrl: "http~",
      count: 10,
      stockCode: 124125,
      stockAveragePrice: 145400,
    },
    {
      id: 2,
      name: "하나금융지주몬2",
      imgUrl: "http~",
      count: 12,
      stockCode: 141125,
      stockAveragePrice: 235400,
    },
    {
      id: 3,
      name: "신한지주몬3",
      imgUrl: "http~",
      count: 10,
      stockCode: 124125,
      stockAveragePrice: 145400,
    },
    {
      id: 4,
      name: "하나금융지주몬4",
      imgUrl: "http~",
      count: 12,
      stockCode: 141125,
      stockAveragePrice: 235400,
    },
    {
      id: 5,
      name: "신한지주몬5",
      imgUrl: "http~",
      count: 10,
      stockCode: 124125,
      stockAveragePrice: 145400,
    },
    {
      id: 6,
      name: "하나금융지주몬6",
      imgUrl: "http~",
      count: 12,
      stockCode: 141125,
      stockAveragePrice: 235400,
    },
  ],
};

// const dummy = {
//   stockmons: [],
// };

const fetcher = (url: string) => {
  // TODO: api 요청
  return dummy;
};

export default function Books() {
  const { data, error } = useSWR("/api/user", fetcher);
  let countHeader: React.ReactNode = <CountHeader isLoading />;
  let stockmonList: React.ReactNode = <StockmonList isLoading />;

  if (error) return <div>failed to load</div>;
  if (data && data.stockmons) {
    countHeader = <CountHeader count={data.stockmons.length} />;
    stockmonList = <StockmonList stockmons={data.stockmons} />;
  }
  return (
    <CommonLayout
      title={"도감"}
      header={
        /* TODO: api 연결 */
        <div className="flex flex-col gap-2">
          {countHeader}
          <SearchBar placeholder="어떤 스톡몬을 찾으시나요?" />
        </div>
      }
    >
      {stockmonList}
    </CommonLayout>
  );
}
