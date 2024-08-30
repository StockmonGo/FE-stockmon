"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import StockmonCard from "@/components/ui/books/StockmonCard";
import StockmonStock from "@/components/ui/books/StockmonStock";
import StockmonChart from "@/components/ui/books/StockmonChart";
import data from "@/../dummy/books/bookDetail.json";
import StockmonExchangeModal from "@/components/ui/books/StockmonExchangeModal";

const fetcher = (url: string) => {
  //TODO: 스톡몬 개별 페이지 조회 api 연결
  return data;
};

export default function Detail() {
  const params = useParams();
  const { data, error } = useSWR(`/api/stockmons/${params.id}`, fetcher);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlliance, setSelectedAlliance] = useState(0);
  const onClickAliance = (travelerId: number) => {
    setSelectedAlliance(travelerId);
  };
  const onClose = () => {
    setModalOpen(false);
    setSelectedAlliance(0);
  };
  const onConfirm = () => {
    setModalOpen(false);
    setSelectedAlliance(0);
    alert("누구한테 교환 요청을 하는가 " + selectedAlliance);
  };

  if (error) return <Error />;
  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <button onClick={() => setModalOpen(true)}>모달 열기</button>
      <StockmonExchangeModal
        onClose={onClose}
        onConfirm={onConfirm}
        open={modalOpen}
        onClickAliance={onClickAliance}
        selectedAlliance={selectedAlliance}
      />
      <StockmonCard data={data} />
      <StockmonStock data={data} />
      <StockmonChart />
    </div>
  );
}
