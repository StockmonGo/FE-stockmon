"use client";
import { useParams } from "next/navigation";
import React, { useState, useMemo } from "react";
import useSWR from "swr";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import StockmonCard from "@/components/ui/books/StockmonCard";
import StockmonStock from "@/components/ui/books/StockmonStock";
import StockmonChart from "@/components/ui/books/StockmonChart";
import StockmonExchangeModal from "@/components/ui/books/StockmonExchangeModal";
import exchangeAPI from "@/apis/exchangeAPI";
import Modal from "@/components/ui/Modal";
import { GiCardExchange } from "react-icons/gi";
import { useStockBook } from "@/hooks/useStockBook";
import useExchange from "@/hooks/useExchange";
import useToast from "@/hooks/useToast";
import SimpleLoading from "@/components/ui/SimpleLoading";
import BtnClose from "@/components/ui/BtnClose";

export default function Detail() {
  const params = useParams();
  const { getStockmonDetail, getStockmonChart } = useStockBook();
  const { requestExchange } = useExchange();
  const { data, error } = useSWR(params?.id, getStockmonDetail);
  const { data: chartData, error: chartError } = useSWR(
    data?.stockCode || "",
    getStockmonChart
  );
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [selectedAlliance, setSelectedAlliance] = useState(0);
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const { ErrorToast } = useToast();

  if (error) return <Error message={error.message} />;
  if (data === null) {
    return (
      <div
        className={`w-full h-full flex justify-center items-center text-stock-dark-400 text-lg`}
      >
        존재하지 않는 스톡몬입니다.
      </div>
    );
  }

  if (!data) {
    return <SimpleLoading />;
  }

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
  const onConfirm = async () => {
    setExchangeModalOpen(false);
    setSelectedAlliance(0);
    try {
      await requestExchange(selectedAlliance, data.stockmonId);
      setCheckModalOpen(true);
    } catch (err) {
      ErrorToast("교환 요청을 실패하였습니다.");
    }
  };

  return (
    <div
      className="p-6 pb-24 overflow-scroll bg-cover bg-center w-full h-full fixed z-[-1]"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="max-w-xl w-xl h-screen mx-auto">
        <div className="flex flex-col gap-5 pb-20 items-center">
          <StockmonCard data={data} />
          <StockmonStock data={data} />
          <StockmonChart data={chartData} error={chartError} />
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
      </div>
      <footer className="fixed left-0 right-0 bottom-6 w-full flex justify-center z-10">
        <BtnClose routeUrl="/books" />
      </footer>
    </div>
  );
}
