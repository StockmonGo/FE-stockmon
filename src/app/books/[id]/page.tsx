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
import Modal from "@/components/ui/Modal";
import { GiCardExchange } from "react-icons/gi";

const fetcher = (url: string) => {
  //TODO: 스톡몬 개별 페이지 조회 api 연결
  return data;
};

export default function Detail() {
  const params = useParams();
  const { data, error } = useSWR(`/api/stockmons/${params.id}`, fetcher);
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [selectedAlliance, setSelectedAlliance] = useState(0);
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const onClickExchange = () => {
    setExchangeModalOpen(true);
  };
  const onClickAliance = (travelerId: number) => {
    setSelectedAlliance(travelerId);
  };
  const onClose = () => {
    setExchangeModalOpen(false);
    setSelectedAlliance(0);
  };
  const onConfirm = () => {
    setExchangeModalOpen(false);
    setSelectedAlliance(0);
    setCheckModalOpen(true);
    alert("누구한테 교환 요청을 하는가 " + selectedAlliance);
  };

  if (error) return <Error />;
  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <StockmonCard data={data} />
      <StockmonStock data={data} />
      <StockmonChart />
      <StockmonExchangeModal
        onClose={onClose}
        onConfirm={onConfirm}
        open={exchangeModalOpen}
        onClickAliance={onClickAliance}
        selectedAlliance={selectedAlliance}
      />
      <div
        className="w-10 h-10 rounded-full bg-white border-blue-400 border-2 fixed bottom-6 right-7 z-50 grid justify-items-center content-center"
        onClick={onClickExchange}
      >
        <GiCardExchange size={28} color="#56A4FF" />
      </div>
      <Modal
        title="교환 요청이 완료되었습니다"
        describe="상대방이 교환할 스톡몬을 선택하면 교환이 이루어집니다."
        open={checkModalOpen}
        onClose={() => setCheckModalOpen(false)}
      />
    </div>
  );
}
