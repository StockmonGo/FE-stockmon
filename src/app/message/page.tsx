"use client";
import React, { useEffect, useMemo, useState } from "react";
import MessageItem from "../../components/ui/message/MessageItem";
import dummyNotice from "../../../dummy/notice/notices.json";
import { TbMessageDots } from "react-icons/tb";
import StockExchangeModal from "@/components/ui/message/StockExchangeModal";
import allianceAPI from "@/apis/allianceAPI";
import useSWR, { mutate } from "swr";
import exchangeAPI from "@/apis/exchangeAPI";
import { IAllianceRequest } from "@/types/alliances";
import { IExchangeRequest } from "@/types/exchanges";
import Loading from "@/components/ui/Loading";
import Modal from "@/components/ui/Modal";
import { IModal } from "@/types/modal";

type noticeType = "동맹" | "교환";
export interface IStockmonInfo {
  stockmonId?: number;
  stockmonName?: string;
  stockmonImageUrl?: string;
}
export interface IStockExchangeInfo {
  noticeId?: number;
  stockmon?: IStockmonInfo;
}
export interface INoticeItem {
  senderNickname: string;
  noticeId: number;
  noticeType: noticeType;
  stockmonId?: number;
  createdDateTimeStamp: number;
}
interface IStockExchangeModalInfo extends IStockExchangeInfo {
  isOpen: boolean;
}
export default function Message() {
  const serviceAlliance = useMemo(() => new allianceAPI(), []);
  const serviceExchange = useMemo(() => new exchangeAPI(), []);
  const [notices, setNotices] = useState<INoticeItem[]>([]);
  const {
    data: dataExchange,
    isLoading: loadingExchange,
    error: errorExchange,
  } = useSWR<IExchangeRequest[]>("exchangeRequest", () =>
    serviceExchange.getExchangeRequests()
  );
  const {
    data: dataAlliance,
    isLoading: loadingAllaince,
    error: errorAlliance,
  } = useSWR<IAllianceRequest[]>("allianceRequest", () =>
    serviceAlliance.getAllianceRequests()
  );
  const [stockExchange, setStockExchange] = useState<IStockExchangeModalInfo>({
    isOpen: false,
  });
  const [modal, setModal] = useState<IModal>({
    isOpen: false,
    content: "",
    onClick: () => {},
  });

  const closeModal = () => {
    setModal({
      isOpen: false,
      content: "",
      onClick: () => {},
    });
  };

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
  const handleConfirmStockExchange = (stockmonId: number) => {
    //TODO: 교환요청 수락. 해당 스톡몬 보내기
  };
  const handleConfirm = (noticeInfo: INoticeItem) => {
    console.log("confirm: ", noticeInfo);
    //TODO: 교환팝업이면 handleExchangeOpen 실행, 동맹팝업이면 동맹요청 실행
    if (noticeInfo.noticeType === "동맹")
      return acceptAlliance(noticeInfo.noticeId);
    if (noticeInfo.noticeType === "교환") return handleExchangeOpen(noticeInfo);
  };
  const handleCancel = (noticeInfo: INoticeItem) => {
    if (noticeInfo.noticeType === "동맹")
      return rejectAlliance(noticeInfo.noticeId);
    if (noticeInfo.noticeType === "교환")
      return rejectExchange(noticeInfo.noticeId);
  };
  const acceptAlliance = async (noticeId: number) => {
    try {
      await serviceAlliance.acceptAlliance(noticeId);
      setModal({
        isOpen: true,
        content: "동맹을 수락했습니다.",
        onClick: closeModal,
      });
    } catch (error: any) {
      setModal({
        isOpen: true,
        title: "실패",
        content: error.toString(),
        onClick: closeModal,
      });
    } finally {
      mutate("allianceRequest");
    }
  };
  const rejectAlliance = async (noticeId: number) => {
    try {
      await serviceAlliance.rejectAlliance(noticeId);
      setModal({
        isOpen: true,
        content: "동맹을 거절했습니다.",
        onClick: closeModal,
      });
    } catch (error) {
    } finally {
      mutate("allianceRequest");
    }
  };
  const acceptExchange = async (noticeId: number, stockmonId: number) => {
    try {
      await serviceExchange.acceptExchange(noticeId, stockmonId);
    } catch (error) {
    } finally {
      mutate("exchangeRequest");
    }
  };
  const rejectExchange = async (noticeId: number) => {
    try {
      await serviceExchange.rejectExchange(noticeId);
    } catch (error) {
    } finally {
      mutate("exchangeRequest");
    }
  };

  useEffect(() => {
    if (dataAlliance)
      setNotices(
        notices
          .concat(
            dataAlliance.map((data: IAllianceRequest) => {
              return {
                senderNickname: data.nickName,
                noticeType: "동맹",
                noticeId: data.noticeId,
                createdDateTimeStamp: new Date(data.createdAt).getTime(),
              };
            })
          )
          .sort((a, b) => b.createdDateTimeStamp - a.createdDateTimeStamp)
      );
  }, [dataAlliance]);

  useEffect(() => {
    if (dataExchange)
      setNotices(
        notices
          .concat(
            dataExchange.map((data: IExchangeRequest) => {
              return {
                senderNickname: data.senderNickname,
                noticeType: "교환",
                stockmonId: data.senderStockmonId,
                noticeId: data.noticeId,
                createdDateTimeStamp: new Date(data.createAt).getTime(),
              };
            })
          )
          .sort((a, b) => b.createdDateTimeStamp - a.createdDateTimeStamp)
      );
  }, [dataExchange]);

  return (
    <>
      <div
        className={`w-full bg-stock-blue-200 bg-border-custom-dotted ${
          notices?.length > 0 ? "h-full" : "h-56"
        } rounded-lg p-3`}
      >
        <div className="w-full bg-stock-lemon-50 h-full rounded-lg p-2 overflow-scroll">
          {notices &&
            notices.map((notice) => {
              return (
                <MessageItem
                  key={notice.noticeId}
                  noticeInfo={notice}
                  handleCancel={handleCancel}
                  handleConfirm={handleConfirm}
                />
              );
            })}
          {notices.length === 0 && (
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
        onConfirm={handleConfirmStockExchange}
        stockmon={{
          name: "삼성전자몬",
          id: 1,
          imgUrl: "/images/dummy-stockmon.png",
        }}
      />
      <Modal
        open={modal.isOpen}
        onClose={modal.onClick}
        title={modal.title}
        describe={modal.content}
      />
    </>
  );
}
