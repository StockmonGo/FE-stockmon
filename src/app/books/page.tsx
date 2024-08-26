"use client";
import CountHeader from "@/components/ui/books/CountHeader";
import StockmonList from "@/components/ui/books/StockmonList";
import CommonLayout from "@/components/ui/CommonLayout";
import SearchBar from "@/components/ui/SearchBar";
import React from "react";
import useSWR from "swr";
import data from "@/../dummy/books/books.json";

const fetcher = (url: string) => {
  // TODO: api 요청
  return data;
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
