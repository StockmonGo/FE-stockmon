"use client";
import CommonLayout from "@/components/ui/CommonLayout";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import useSWR from "swr";
import data from "@/../dummy/books/bookDetail.json";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import StockmonCard from "@/components/ui/books/StockmonCard";
import StockmonStock from "@/components/ui/books/StockmonStock";
import StockmonChart from "@/components/ui/books/StockmonChart";

const fetcher = (url: string) => {
  //TODO: 스톡몬 개별 페이지 조회 api 연결
  return data;
};

export default function Detail() {
  const { data, error } = useSWR("/api/user", fetcher);
  const router = useParams();

  if (error) return <Error />;
  if (!data) {
    return <Loading />;
  }

  return (
    <CommonLayout>
      <div className="flex flex-col justify-center items-center">
        <StockmonCard />
        <StockmonStock />
        <StockmonChart />
      </div>
    </CommonLayout>
  );
}
