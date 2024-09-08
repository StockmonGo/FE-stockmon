"use client";

import AllianceItem from "@/components/ui/alliance/AllianceItem";
import Modal from "@/components/ui/Modal";
import SearchBar from "@/components/ui/SearchBar";
import React, { useEffect, useMemo, useState } from "react";
import dummyAlliances from "@/../dummy/alliance/alliances.json";
import dummyTraveler from "@/../dummy/alliance/searchTraveler.json";
import StockExchangeModal from "@/components/ui/message/StockExchangeModal";
import { IStockmonInfo } from "../message/page";
import allianceAPI from "@/apis/allianceAPI";
import useSWR from "swr";
import { ITraveler } from "@/types/member";
import useExchange from "@/hooks/useExchange";
import useToast from "@/hooks/useToast";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  //TODO: 커스텀훅으로 뺼까?
  const [stockExchange, setStockExchange] = useState<IStockExchangeModalInfo>({
    isOpen: false,
  });
  const { requestExchange } = useExchange();
  const { ErrorToast } = useToast();
  const [alliances, setAlliances] = useState<ITraveler[]>(
    dummyAlliances.data.alliances
  );
  const [searchedTraveler, setSearchedTraveler] = useState<ITraveler>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [checkModalOpen, setCheckModalOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

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

  const handleConfirmStockExchange = async (stockmonId: number) => {
    setStockExchange({
      isOpen: false,
    });
    try {
      await requestExchange(stockExchange.travelerId!, stockmonId);
      setCheckModalOpen(true);
    } catch (err) {
      ErrorToast("교환 요청을 실패하였습니다.");
    }
  };
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
          {data &&
            data.map((data, idx) => {
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
            <AllianceItem
              traveler={searchedTraveler}
              travelerType={"others"}
              addAlliance={addAlliance}
              deleteAlliance={deleteAlliance}
              openExchange={openExchange}
            />
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
      <Modal
        title="교환 요청이 완료되었습니다"
        describe="상대방이 교환할 스톡몬을 선택하면 교환이 이루어집니다."
        open={checkModalOpen}
        onClose={() => setCheckModalOpen(false)}
      />
    </>
  );
}
