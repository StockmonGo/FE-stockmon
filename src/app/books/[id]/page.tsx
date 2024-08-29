"use client";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import StockmonCard from "@/components/ui/books/StockmonCard";
import StockmonStock from "@/components/ui/books/StockmonStock";
import StockmonChart from "@/components/ui/books/StockmonChart";
import data from "@/../dummy/books/bookDetail.json";

const fetcher = (url: string) => {
  //TODO: 스톡몬 개별 페이지 조회 api 연결
  return data;
};

export default function Detail() {
  const params = useParams();
  const { data, error } = useSWR(`/api/stockmons/${params.id}`, fetcher);

  if (error) return <Error />;
  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <StockmonCard data={data} />
      <StockmonStock />
      <StockmonChart />
    </div>
  );
}
