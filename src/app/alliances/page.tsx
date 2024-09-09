"use client";

import AllianceItem from "@/components/ui/alliance/AllianceItem";
import Modal from "@/components/ui/Modal";
import SearchBar from "@/components/ui/SearchBar";
import React, { useEffect, useMemo, useState } from "react";
import StockExchangeModal from "@/components/ui/message/StockExchangeModal";
import { IStockmonInfo } from "../message/page";
import allianceAPI from "@/apis/allianceAPI";
import useSWR from "swr";
import { ITraveler } from "@/types/member";
import useExchange from "@/hooks/useExchange";
import useToast from "@/hooks/useToast";
import { IModal } from "@/types/modal";

export interface IStockExchangeInfo {
  travelerId?: number;
  stockmon?: IStockmonInfo;
}
interface IStockExchangeModalInfo extends IStockExchangeInfo {
  isOpen: boolean;
}

export default function Alliance() {
  const service = useMemo(() => new allianceAPI(), []);
  const { data, error } = useSWR<ITraveler[]>("alliance", () =>
    service.getAlliances()
  );
  const [stockExchange, setStockExchange] = useState<IStockExchangeModalInfo>({
    isOpen: false,
  });
  const { requestExchange } = useExchange();
  const { ErrorToast } = useToast();
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const [modal, setModal] = useState<IModal>({
    isOpen: false,
    content: "",
    title: "",
    onClick: () => {},
  });

  const closeModal = () => {
    setModal({
      isOpen: false,
      content: "",
      onClick: () => {},
    });
  };

  const openExchange = (travelerId: number) => {
    //exchange에 필요한 데이터 세팅해서 모달 오픈
    setStockExchange({
      isOpen: true,
      travelerId,
    });
  };

  const handleConfirmStockExchange = async (stockmonId: number) => {
    closeExchange();
    try {
      await requestExchange(stockExchange.travelerId!, stockmonId);
      setCheckModalOpen(true);
    } catch (err) {
      ErrorToast("교환 요청을 실패하였습니다.");
    }
  };

  const closeExchange = () => {
    setStockExchange({ isOpen: false });
  };

  const [searchedTraveler, setSearchedTraveler] = useState<ITraveler | null>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchKeyword);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    if (event.target.value === "") setSearchedTraveler(undefined);
  };

  const searchUser = async () => {
    try {
      const res = await service.getUser(debouncedQuery);
      if (res)
        setSearchedTraveler({
          nickname: res.nickname,
          travelerId: res.travelerId,
        });
    } catch (error) {
      console.log("검색결과가 없습니다", debouncedQuery);
      setSearchedTraveler(null);
    }
  };
  const addAlliance = async (nickname: string, travelerId: number) => {
    try {
      const res = await service.requestAlliance(travelerId);
      if (res) {
        setModal({
          isOpen: true,
          title: "동맹 요청",
          content: `${nickname}님께 동맹을 요청했습니다.`,
          onClick: closeModal,
        });
      }
    } catch (error: any) {
      setModal({
        isOpen: true,
        title: "동맹 요청 실패",
        content: error.toString(),
        onClick: closeModal,
      });
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchKeyword);
    }, 500); // 500ms 후에 검색 쿼리 업데이트
    return () => clearTimeout(timerId);
  }, [searchKeyword]);

  useEffect(() => {
    if (debouncedQuery) searchUser();
  }, [debouncedQuery]);

  return (
    <>
      <SearchBar
        placeholder={"닉네임을 입력해주세요"}
        onChange={handleSearchChange}
      />
      <div
        className={`w-full bg-stock-blue-200 bg-border-custom-dotted h-4/5 rounded-lg p-3 mt-6`}
      >
        <div className="w-full bg-stock-lemon-50 h-full rounded-lg p-2 overflow-scroll">
          {!searchKeyword &&
            data &&
            data.map((data, idx) => {
              return (
                <AllianceItem
                  key={data.travelerId}
                  traveler={data}
                  addAlliance={addAlliance}
                  openExchange={openExchange}
                  travelerType={"alliance"}
                />
              );
            })}
          {!searchKeyword && data && data.length === 0 && (
            <div className="flex items-center flex-col justify-center h-full">
              <img
                className="text-stock-blue-400"
                src="/images/cannot-find.png"
                alt="찾을 수 없음"
              />
              <p className="font-ptr text-lg text-stock-blue-400">
                동맹이 없습니다
              </p>
            </div>
          )}
          {searchedTraveler === null && (
            <div className="flex items-center flex-col justify-center h-full">
              <img
                className="text-stock-blue-400"
                src="/images/cannot-find.png"
                alt="찾을 수 없음"
              />
              <p className="font-ptr text-lg text-stock-blue-400">
                해당 유저가 없습니다
              </p>
            </div>
          )}
          {searchedTraveler && (
            <AllianceItem
              traveler={searchedTraveler}
              travelerType={"others"}
              addAlliance={addAlliance}
              openExchange={openExchange}
            />
          )}
        </div>
      </div>
      <Modal
        open={modal.isOpen}
        onClose={modal.onClick}
        title={modal.title}
        describe={modal.content}
      />
      <StockExchangeModal
        open={stockExchange.isOpen}
        onClose={closeExchange}
        onConfirm={handleConfirmStockExchange}
      />
      <Modal
        title="교환 요청이 완료되었습니다"
        describe="상대방이 교환할 스톡몬을 선택하면 교환이 이루어집니다."
        open={checkModalOpen}
        onClose={() => setCheckModalOpen(false)}
      />
    </>
  );
}
