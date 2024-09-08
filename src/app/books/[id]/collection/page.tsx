"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import useSWR from "swr";
import { COLLECTION_MAX } from "@/types/stockmons";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import RealStockExchangeModal from "@/components/ui/books/RealStockExchangeModal";
import NewPoint from "@/components/ui/NewPoint";
import { useStockBook } from "@/hooks/useStockBook";
import memberAPI from "@/apis/memberAPI";
import { IAccountInfoRes } from "@/types/member";
import useToast from "@/hooks/useToast";

export default function Collection() {
  const router = useRouter();
  const params = useParams();
  const { getStockmonDetail, postStockExchange } = useStockBook();
  const { data: stockmonData, error: stockmonError } = useSWR(
    params?.id,
    getStockmonDetail
  );
  const memberService = new memberAPI();
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [getStockModalOpen, setGetStockModalOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { ErrorToast, SuccessToast } = useToast();

  if (stockmonError) return <Error message={stockmonError.message} />;
  if (!stockmonData) {
    return <Loading />;
  }

  const handleExchange = async () => {
    setButtonLoading(true);
    const profileData: IAccountInfoRes | null =
      await memberService.getAccountStatus();
    setButtonLoading(false);
    if (profileData?.hasAccount) {
      setGetStockModalOpen(true);
    } else {
      setAccountModalOpen(true);
    }
  };

  const handleConfirmAccountModal = async () => {
    try {
      await memberService.createAccount();
      setAccountModalOpen(false);
      SuccessToast("계좌 개설이 완료되었습니다.");
      setGetStockModalOpen(true);
    } catch (err) {
      ErrorToast("계좌 개설을 실패하였습니다.");
      setAccountModalOpen(false);
    }
  };

  const handleCloseGetStockModal = async () => {
    try {
      await postStockExchange(stockmonData.stockCode);
      setGetStockModalOpen(false);
      SuccessToast(`${stockmonData.stockCode} 을(를) 받았습니다!`);
      router.refresh();
    } catch (err) {
      ErrorToast();
      setGetStockModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 overflow-scroll pb-20 justify-center items-center">
      <header className="flex flex-col gap-2 justify-center items-center">
        <div className="relative py-2 px-3 text-2xl font-bold text-stock-dark-500 border-2 border-white rounded-lg bg-somsatang-gradient">
          {stockmonData.catchCount >= COLLECTION_MAX && <NewPoint />}
          {stockmonData.catchCount} / {COLLECTION_MAX}
        </div>
        <p className="font-ptr text-stock-dark-400">
          스톡몬을 모아 주식으로 받을 수 있어요.
        </p>
      </header>
      <main className="p-3 bg-border-custom-dotted bg-stock-blue-200 rounded-lg">
        <div
          className="w-full grid grid-cols-4 p-3 gap-2 overflow-auto bg-stock-lemon-50 rounded-lg"
          style={{ minHeight: "calc(100vh / 2)" }}
        >
          {Array.from({ length: COLLECTION_MAX }).map((_, index) =>
            index < stockmonData.catchCount ? (
              <img
                key={index}
                src={`${process.env.NEXT_PUBLIC_S3_URL}/${stockmonData.stockmonId}.png`}
                alt={stockmonData.stockmonName}
                className="aspect-square object-cover bg-white rounded-lg"
              />
            ) : (
              <div
                key={index}
                className="aspect-square bg-stock-lemon-100 rounded-lg"
              ></div>
            )
          )}
        </div>
      </main>
      <footer className="w-32 mt-4 justify-self-center">
        <Button
          onClick={handleExchange}
          text="주식 받기"
          disabled={stockmonData.catchCount < COLLECTION_MAX}
          isLoading={buttonLoading}
        />
        <Modal
          open={accountModalOpen}
          describe={`계좌를 만들고 '${stockmonData.stockmonName}'을 '${stockmonData.stockName}'(으)로 받으시겠습니까?`}
          onClose={() => setAccountModalOpen(false)}
          onConfirm={handleConfirmAccountModal}
          hasClose
        ></Modal>
        <RealStockExchangeModal
          open={getStockModalOpen}
          onClose={handleCloseGetStockModal}
          image={`${process.env.NEXT_PUBLIC_S3_URL}/${stockmonData.stockmonId}.png`}
          stockmonName={stockmonData.stockmonName}
        />
      </footer>
    </div>
  );
}
