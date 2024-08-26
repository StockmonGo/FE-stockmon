"use client";
import React, { useEffect, useState } from "react";
import MessageItem from "../../components/ui/message/MessageItem";
import dummyNotice from "../../../dummy/notice/notices.json";
import { TbMessageDots } from "react-icons/tb";
import StockExchangeModal from "@/components/ui/message/StockExchangeModal";
export interface INotice {
  noticeId: number;
  type: number; // 1:동맹 2:교환
  optionType: number; //1. 수락/거절 있는경우. 동맹 교환 모두 이경우
  travelerId: number;
  stockmonId?: number;
  stockmonName?: string;
  nickname: string;
  imageUrl?: string;
  timestamp: string;
}
export interface IStockExchangeInfo {
  noticeId?: number;
  stockmonId?: number;
  stockmonName?: string;
  stockmonImageUrl?: string;
}

interface IStockExchangeModalInfo extends IStockExchangeInfo {
  isOpen: boolean;
}
export default function Message() {
  const [data, setData] = useState<INotice[]>();
  //TODO: 커스텀훅으로 뺼까?
  const [stockExchange, setStockExchange] = useState<IStockExchangeModalInfo>({
    isOpen: false,
  });

  const handleExchangeOpen = (stockExchangeInfo: IStockExchangeInfo) => {
    //exchange에 필요한 데이터 세팅해서 모달 오픈
    setStockExchange({
      isOpen: true,
      ...stockExchangeInfo,
    });
  };
  const handleExchangeClose = () => {
    setStockExchange({ isOpen: false });
  };

  const handleConfirm = (noticeInfo: INotice) => {
    console.log("confirm: ", noticeInfo);
    //TODO: 교환팝업이면 handleExchangeOpen 실행, 동맹팝업이면 동맹요청 실행
    if (noticeInfo.type === 1) return;
    if (noticeInfo.type === 2) handleExchangeOpen(noticeInfo);
  };
  const handleCancel = () => {};

  useEffect(() => {
    if (dummyNotice) {
      setData(dummyNotice.data.notices);
      // setData([]);
    }
  }, []);
  return (
    <>
      <div
        className={`w-full bg-stock-blue-200 bg-border-custom-dotted ${
          data && data?.length > 0 ? "h-full" : "h-56"
        } rounded-lg p-3`}
      >
        <div className="w-full bg-stock-lemon-50 h-full rounded-lg p-2 overflow-scroll">
          {data &&
            data.map((notice) => {
              return (
                <MessageItem
                  key={notice.noticeId}
                  noticeInfo={notice}
                  handleCancel={handleCancel}
                  handleConfirm={handleConfirm}
                />
              );
            })}
          {data && data.length === 0 && (
            <div className="flex items-center flex-col justify-center h-full">
              <TbMessageDots className="text-stock-blue-400" size={120} />
              <p className="font-ptr text-lg text-stock-blue-400">
                알림이 없습니다
              </p>
            </div>
          )}
        </div>
      </div>
      <StockExchangeModal
        open={stockExchange.isOpen}
        onClose={handleExchangeClose}
        noticeId={0}
        stockmonId={0}
        stockmonName={"삼성전자몬"}
        stockmonImageUrl={"/images/dummy-stockmon.png"}
      />
    </>
  );
}
