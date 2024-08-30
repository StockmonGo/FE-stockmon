"use client";

import AllianceItem, { ITraveler } from "@/components/ui/alliance/AllianceItem";
import Modal from "@/components/ui/Modal";
import SearchBar from "@/components/ui/SearchBar";
import React, { useEffect, useState } from "react";
import dummyAlliances from "@/../dummy/alliance/alliances.json";
import dummyTraveler from "@/../dummy/alliance/searchTraveler.json";
import StockExchangeModal from "@/components/ui/message/StockExchangeModal";
import { IStockmonInfo } from "../message/page";

export interface IStockExchangeInfo {
  travelerId?: number;
  stockmon?: IStockmonInfo;
}

interface IStockExchangeModalInfo extends IStockExchangeInfo {
  isOpen: boolean;
}

export default function Alliance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //TODO: 커스텀훅으로 뺼까?
  const [stockExchange, setStockExchange] = useState<IStockExchangeModalInfo>({
    isOpen: false,
  });

  const openExchange = (travelerId: number) => {
    //exchange에 필요한 데이터 세팅해서 모달 오픈
    setStockExchange({
      isOpen: true,
      travelerId,
    });
  };
  const addAlliance = (travelerId: number) => {
    //TODO: 동맹추가 모달 열고 확인시 진행
  };
  const deleteAlliance = (travelerId: number) => {
    //TODO: 동맹삭제 모달 열고 확인시 진행
  };
  const closeExchange = () => {
    setStockExchange({ isOpen: false });
  };
  const [alliances, setAlliances] = useState<ITraveler[]>(
    dummyAlliances.data.alliances
  );

  const [searchedTraveler, setSearchedTraveler] = useState<ITraveler>(
    dummyTraveler.data.traveler
  );
  const handleConfirmStockExchange = (stockmonId: number) => {
    //TODO: 동맹에게 교환요청 해당 스톡몬 보내기
  };
  return (
    <>
      <SearchBar placeholder={"닉네임을 입력해주세요"} />
      <div
        className={`w-full bg-stock-blue-200 bg-border-custom-dotted h-4/5 rounded-lg p-3 mt-6`}
      >
        <div className="w-full bg-stock-lemon-50 h-full rounded-lg p-2 overflow-scroll">
          {alliances &&
            alliances.map((data, idx) => {
              return (
                <AllianceItem
                  key={data.travelerId}
                  traveler={data}
                  addAlliance={addAlliance}
                  deleteAlliance={deleteAlliance}
                  openExchange={openExchange}
                  travelerType={"alliance"}
                />
              );
            })}
          {alliances && alliances.length === 0 && (
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
          {searchedTraveler && (
            <AllianceItem traveler={searchedTraveler} travelerType={"others"} addAlliance={addAlliance}
            deleteAlliance={deleteAlliance}
            openExchange={openExchange}/>
          )}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        hasClose
      />
      <StockExchangeModal
        open={stockExchange.isOpen}
        onClose={closeExchange}
        onConfirm={handleConfirmStockExchange}
      />
    </>
  );
}
