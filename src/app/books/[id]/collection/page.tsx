"use client";
import { useParams } from "next/navigation";
import React from "react";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import useSWR from "swr";
import { COLLECTION_MAX } from "@/types/stockmons";
import Button from "@/components/ui/Button";
import data from "@/../dummy/books/bookDetail.json";

const fetcher = (url: string) => {
  //TODO: 스톡몬 개별 페이지 조회 api 연결
  return data;
};

export default function Collection() {
  const params = useParams();
  const { data, error } = useSWR(`/api/stockmons/${params.id}`, fetcher);

  if (error) return <Error />;
  if (!data) {
    return <Loading />;
  }

  const handleExchange = () => {
    console.log("주식 받기");
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <header className="flex flex-col gap-2 justify-center items-center">
        <div className="py-2 px-3 text-2xl font-bold text-stock-dark-500 border-2 border-white rounded-lg bg-somsatang-gradient">
          {data.catchCount} / {COLLECTION_MAX}
        </div>
        <p className="font-ptr text-stock-dark-400">
          스톡몬을 모아 주식으로 받을 수 있어요.
        </p>
      </header>
      <main className="p-3 bg-border-custom-dotted bg-stock-blue-200 rounded-lg">
        <div
          className="w-full grid grid-cols-4 p-3 gap-2 overflow-auto bg-stock-lemon-50 rounded-lg"
          style={{ minHeight: "calc(100vh / 2)" }}
        >
          {Array.from({ length: COLLECTION_MAX }).map((_, index) =>
            index < data.catchCount ? (
              <img
                key={index}
                src={data.imageUrl}
                alt={data.stockmonName}
                className="aspect-square object-cover bg-white rounded-lg"
              />
            ) : (
              <div
                key={index}
                className="aspect-square bg-stock-lemon-100 rounded-lg"
              ></div>
            )
          )}
        </div>
      </main>
      <footer className="w-32 justify-self-center mt-4">
        <Button
          onClick={handleExchange}
          text="주식 받기"
          disabled={data.catchCount < COLLECTION_MAX}
        />
      </footer>
    </div>
  );
}
