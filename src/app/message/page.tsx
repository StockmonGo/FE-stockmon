"use client";
import React, { useEffect, useMemo, useState } from "react";
import MessageItem from "../../components/ui/message/MessageItem";
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
import useExchange from "@/hooks/useExchange";
import useToast from "@/hooks/useToast";

export interface IStockmonInfo {
  stockmonId?: number;
  stockmonName?: string;
  stockmonImageUrl?: string;
}

type noticeType = "동맹" | "교환";
export interface INoticeItem {
  senderNickname: string;
  noticeId: number;
  noticeType: noticeType;
  senderStockmonId?: number;
  senderStockmonName?: string;
  createdDateTimeStamp: number;
}
interface IStockExchangeModalInfo extends INoticeItem {
  isOpen: boolean;
}
export default function Message() {
  const serviceAlliance = useMemo(() => new allianceAPI(), []);
  const serviceExchange = useMemo(() => new exchangeAPI(), []);
  const { ErrorToast, SuccessToast } = useToast();
  const { acceptExchange, rejectExchange } = useExchange();

  const {
    data: dataExchange,
    isLoading: loadingExchange,
    error: errorExchange,
    mutate: mutateExchange,
  } = useSWR<IExchangeRequest[]>("exchangeRequest", () =>
    serviceExchange.getExchangeRequests()
  );
  const {
    data: dataAlliance,
    isLoading: loadingAllaince,
    error: errorAlliance,
    mutate: mutateAlliance,
  } = useSWR<IAllianceRequest[]>("allianceRequest", () =>
    serviceAlliance.getAllianceRequests()
  );
  const [stockExchange, setStockExchange] = useState<IStockExchangeModalInfo>({
    isOpen: false,
    senderNickname: "",
    noticeId: -1,
    noticeType: "교환",
    senderStockmonId: -1,
    senderStockmonName: "",
    createdDateTimeStamp: -1,
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

  //교환 모달 오픈
  const handleExchangeOpen = (stockExchangeInfo: INoticeItem) => {
    //exchange에 필요한 데이터 세팅해서 모달 오픈
    setStockExchange({
      isOpen: true,
      ...stockExchangeInfo,
    });
    console.log("왜 안들어가", stockExchangeInfo);
  };
  //교환 모달 닫기
  const handleExchangeClose = () => {
    setStockExchange({
      isOpen: false,
      senderNickname: "",
      noticeId: -1,
      noticeType: "교환",
      senderStockmonId: -1,
      senderStockmonName: "",
      createdDateTimeStamp: -1,
    });
  };
  //교환 모달에서 교환 수락
  const handleConfirmStockExchange = async (stockmonId: number) => {
    try {
      await acceptExchange(stockExchange.noticeId, stockmonId);
      handleExchangeClose();
      SuccessToast("교환 완료되었습니다.");
    } catch (error) {
      ErrorToast("교환 실패했습니다.");
    } finally {
      mutate("exchangeRequest");
    }
  };
  const handleConfirm = (noticeInfo: INoticeItem) => {
    if (noticeInfo.noticeType === "동맹")
      return acceptAlliance(noticeInfo.noticeId);
    if (noticeInfo.noticeType === "교환") return handleExchangeOpen(noticeInfo);
  };
  const handleCancel = (noticeInfo: INoticeItem) => {
    if (noticeInfo.noticeType === "동맹")
      return handleRejectAlliance(noticeInfo.noticeId);
    if (noticeInfo.noticeType === "교환")
      return handleRejectExchange(noticeInfo.noticeId);
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
  const handleRejectAlliance = async (noticeId: number) => {
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
  const handleRejectExchange = async (noticeId: number) => {
    try {
      await rejectExchange(noticeId);
    } catch (error) {
    } finally {
      mutate("exchangeRequest");
    }
  };
  const noticeList = useMemo(() => {
    const exchanges: INoticeItem[] | undefined = dataExchange?.map(
      (data: IExchangeRequest) => {
        return {
          senderNickname: data.senderNickname,
          noticeType: "교환",
          senderStockmonId: data.senderStockmonId,
          senderStockmonName: data.senderStockmonName,
          noticeId: data.noticeId,
          createdDateTimeStamp: new Date(data.createAt).getTime(),
        };
      }
    );
    const allainces: INoticeItem[] | undefined = dataAlliance?.map(
      (data: IAllianceRequest) => {
        return {
          senderNickname: data.nickName,
          noticeType: "동맹",
          noticeId: data.noticeId,
          createdDateTimeStamp: new Date(data.createdAt).getTime(),
        };
      }
    );
    return exchanges
      ?.concat(allainces || [])
      .sort((a, b) => b.createdDateTimeStamp - a.createdDateTimeStamp);
  }, [dataExchange, dataAlliance]);
  return (
    <>
      <div
        className={`w-full bg-stock-blue-200 bg-border-custom-dotted ${
          noticeList && noticeList.length > 0 ? "h-full" : "h-56"
        } rounded-lg p-3`}
      >
        <div className="w-full bg-stock-lemon-50 h-full rounded-lg p-2 overflow-scroll">
          {noticeList &&
            noticeList.map((notice) => {
              return (
                <MessageItem
                  key={notice.noticeId}
                  noticeInfo={notice}
                  handleCancel={handleCancel}
                  handleConfirm={handleConfirm}
                />
              );
            })}
          {noticeList && noticeList.length === 0 && (
            <div className="flex items-center flex-col justify-center h-full">
              <TbMessageDots className="text-stock-blue-400" size={120} />
              <p className="font-ptr text-lg text-stock-blue-400">
                알림이 없습니다
              </p>
            </div>
          )}
        </div>
      </div>
      {stockExchange.isOpen && (
        <StockExchangeModal
          open={stockExchange.isOpen}
          onClose={handleExchangeClose}
          onConfirm={handleConfirmStockExchange}
          stockmonId={stockExchange.senderStockmonId}
          stockmonName={stockExchange.senderStockmonName}
        />
      )}
      <Modal
        open={modal.isOpen}
        onClose={modal.onClick}
        title={modal.title}
        describe={modal.content}
      />
    </>
  );
}
