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

const chartData = {
  chart: [
    { time: "2023-01-01", value: 2300 },
    { time: "2023-02-01", value: 2200 },
    { time: "2023-03-01", value: 2350 },
    { time: "2023-06-01", value: 2450 },
    { time: "2023-07-01", value: 2120 },
    { time: "2023-08-01", value: 2680 },
  ],
};

export default function Detail() {
  const params = useParams();
  const { getStockmonDetail, getStockmonChart } = useStockBook();
  const { data, error } = useSWR(params?.id, getStockmonDetail);
  // const { data: chartData, error: chartError } = useSWR(
  //   data?.stockCode || "",
  //   getStockmonChart
  // );
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [selectedAlliance, setSelectedAlliance] = useState(0);
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const service = useMemo(() => new exchangeAPI(), []);
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
    return <Loading />;
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
  const onConfirm = () => {
    setExchangeModalOpen(false);
    setSelectedAlliance(0);
    alert("누구한테 교환 요청을 하는가 " + selectedAlliance);
    sendStockmon();
  };
  const sendStockmon = async () => {
    try{
      await service.requestExchange(selectedAlliance, data.stockmonId);
      setCheckModalOpen(true);
    }catch(error){  
      console.log("교환 요청 error",error)
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-20 items-center">
      <StockmonCard data={data} />
      <StockmonStock data={data} />
      <StockmonChart data={chartData.chart} />
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
