"use client";
import CountHeader from "@/components/ui/books/CountHeader";
import StockmonList from "@/components/ui/books/StockmonList";
import CommonLayout from "@/components/ui/CommonLayout";
import SearchBar from "@/components/ui/SearchBar";
import React, { useState } from "react";
import useSWR from "swr";
import Error from "@/components/ui/Error";
import { IStockmonsRes } from "@/types/stockmons";
import { useStockBook } from "@/hooks/useStockBook";

export default function Books() {
  const { getStockmons } = useStockBook();
  const { data, error } = useSWR<IStockmonsRes | null>(
    "stockmons",
    getStockmons
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  let countHeader: React.ReactNode = <CountHeader isLoading />;
  let stockmonList: React.ReactNode = <StockmonList isLoading />;

  if (error) {
    return (
      <div className="w-full h-full overflow-x-hidden overflow-y-scroll">
        <div className="fixed w-full h-full overflow-hidden z-0">
          <div
            className="bg-cover bg-center w-full h-full fixed z-[-1]"
            style={{ backgroundImage: "url('/images/bg.jpg')" }}
          ></div>
          <Error message={error.message} />
        </div>
      </div>
    );
  }
  if (data && data.stockmons) {
    countHeader = <CountHeader count={data.stockmons.length} />;
    stockmonList = (
      <StockmonList stockmons={data.stockmons} keyword={searchKeyword} />
    );
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <CommonLayout
      routeUrl="/world"
      title={"도감"}
      header={
        <div className="flex flex-col gap-2">
          {countHeader}
          <SearchBar
            placeholder="어떤 스톡몬을 찾으시나요?"
            onChange={handleSearchChange}
          />
        </div>
      }
    >
      {stockmonList}
    </CommonLayout>
  );
}
