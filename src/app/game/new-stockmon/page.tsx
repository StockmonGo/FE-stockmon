"use client";
import mapAPI from "@/apis/mapAPI";
import NewStockmon from "@/components/game/NewStockmon";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NewStockmonInfo from "@/components/game/NewStockmonInfo";
import { ICatchedStockmonRes } from "@/types/stockmons";
import { useStockBook } from "@/hooks/useStockBook";
import Error from "@/components/ui/Error";
import useSWR from "swr";
import Button from "@/components/ui/Button";
import SimpleLoading from "@/components/ui/SimpleLoading";
import Modal from "@/components/ui/Modal";
import memberAPI from "@/apis/memberAPI";

export default function Game() {
  const searchParams = useSearchParams();
  const id = searchParams!.get("id") as string;
  const pr = searchParams!.get("pr") as string;
  const tpr = searchParams!.get("tpr") as string;
  const name = searchParams!.get("name") as string;
  const desc = searchParams!.get("desc") as string;
  const market = searchParams!.get("market") as string;
  const stockType = searchParams!.get("st") as string;
  const stockTypeName = searchParams!.get("stn") as string;
  const stockCode = searchParams!.get("std") as string;
  const isFirst = searchParams!.get("first") as string;
  const [stockmonData, setStockmonData] = useState<ICatchedStockmonRes>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const service = new memberAPI();
  const { data, mutate } = useSWR("account", () => {
    return service.getAccountStatus();
  });
  const { getStockmonDetail } = useStockBook();
  // const { data, error } = useSWR(id, getStockmonDetail);
  const router = useRouter();
  // 계좌가 아직 없는데 isFirst면 모달을 띄워준다.
  // if (error) return <Error message={error.message} />;
  useEffect(() => {
    if (isFirst && data?.hasAccount === false) {
      console.log(
        "계좌 없음! isFrist:",
        isFirst,
        "has Account? :",
        data?.hasAccount
      );
      setIsOpenModal(true);
    }
  }, []);
  if (id === null) {
    return (
      <div
        className={`w-full h-full flex justify-center items-center text-stock-dark-400 text-lg`}
      >
        존재하지 않는 스톡몬입니다.
      </div>
    );
  }
  // if (!data) {
  //   return <SimpleLoading />;
  // }

  return (
    <>
      <div className="h-full">
        <div className="max-w-xl w-xl h-screen mx-auto">
          <div className="flex flex-col gap-5 pb-20 items-center">
            {id && (
              <>
                <img src="/icons/status-new.png" alt="새로 추가" />
                <NewStockmon
                  stockCode={stockCode}
                  stockmonId={+id}
                  stockmonName={name}
                  description={desc}
                />
                <NewStockmonInfo
                  stockTypeName={stockTypeName}
                  stockName={name}
                  stockMarket={market}
                  stockTotalPrice={+tpr}
                  stockType={+stockType}
                  stockPrice={+pr}
                />
                <Button
                  onClick={() => {
                    router.push(`/books/${id}`);
                  }}
                  text={"도감으로 보러가기"}
                ></Button>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={isOpenModal}
        title={"첫 획득!"}
        describe={"주식계좌를 개설하고 주식을 획득하세요!"}
        onConfirm={() => {
          router.push("/profile?create=true");
        }}
        onClose={() => {
          setIsOpenModal(false);
        }}
        hasClose={true}
      />
    </>
  );
}
