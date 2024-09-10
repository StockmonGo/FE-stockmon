"use client";
import React, { useState } from "react";
import { useStockBook } from "@/hooks/useStockBook";
import useSWR from "swr";
import { formatNumber } from "@/utils/nums";
type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (stockmonId: number) => void;
  stockmonId?: number;
  stockmonName?: string;
};

export default function StockExchangeModal({
  open,
  onClose,
  onConfirm,
  stockmonId,
  stockmonName,
}: Props) {
  const [choiceStockmon, setChoiceStockmon] = useState<number>();
  const { getStockmonDetail, getStockmons } = useStockBook();
  const { data: stockmonList, error: stockmonListError } = useSWR(
    "stockmons",
    getStockmons
  );
  const handleStockmonClick = (id: number) => {
    setChoiceStockmon(id);
  };
  const isDisabled = typeof choiceStockmon === "undefined";

  return (
    open && (
      <div
        className="fixed inset-0 bg-stock-dark-950 bg-opacity-20 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="flex flex-col gap-4 justify-center items-center bg-white p-4 min-w-[360px] rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <header
            className={`w-full py-3 flex flex-row gap-2 text-stock-blue-950 rounded-lg ${
              stockmonId ? "justify-between" : "justify-center text-center"
            } items-center`}
          >
            <div className="">
              <h2 className="font-ptb text-xl pb-3">스톡몬 교환</h2>
              <p className="font-ptr text-stock-dark-700 text-sm">
                교환할 스톡몬을 선택해주세요.
              </p>
            </div>
            {stockmonName && stockmonId && (
              <div>
                <div className="max-w-20">
                  <img
                    className="h-[88px] w-[88px]"
                    src={`${process.env.NEXT_PUBLIC_S3_URL}/${stockmonId}.png`}
                    alt="스톡몬"
                  />
                </div>
                <p className="text-xs font-ptr text-center text-stock-dark-800 pt-1">
                  {stockmonName}
                </p>
              </div>
            )}
          </header>
          <div
            className="w-full bg-stock-lemon-50 bg-border-custom-dotted-thin  p-[1px] content-start"
            style={{
              aspectRatio: "1/1",
            }}
          >
            {stockmonList && stockmonList?.stockmons.length > 0 && (
              <div
                className="w-full h-full overflow-y-scroll grid grid-cols-3 gap-2 px-3 py-6 content-start"
                style={{
                  aspectRatio: "1/1",
                }}
              >
                {stockmonList.stockmons.map((stockmon) => {
                  if (stockmon.catchCount === 0) return;

                  return (
                    <div
                      key={stockmon.id}
                      className={`m-auto p-1 max-w-24 relative flex flex-col min-h-[112px] items-center justify-end ${
                        choiceStockmon === stockmon.id && "bg-stock-lemon-100"
                      }`}
                      onClick={() => {
                        handleStockmonClick(stockmon.id);
                      }}
                    >
                      <p className="absolute top-2 right-2 text-stock-blue-800 bg-somsatang-gradient bg-opacity-50 px-2 text-center rounded-full">
                        {stockmon.catchCount}
                      </p>
                      <img
                        className="h-[88px] w-[88px]"
                        src={`${process.env.NEXT_PUBLIC_S3_URL}/${stockmon.id}.png`}
                        alt=""
                      />
                      <p className="font-ptr text-center text-slate-700 text-sm">
                        {stockmon.name}
                      </p>
                      {choiceStockmon === stockmon.id && (
                        <div className="absolute -translate-y-1/2 top-1/2 bg-slate-700 rounded p-1 bg-opacity-70">
                          <p className="font-ptr text-center text-slate-50 text-sm ">
                            {"[평단가]"}
                          </p>
                          <p className="font-ptr text-center text-slate-50 text-sm">
                            {formatNumber(stockmon.stockAveragePrice)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {stockmonList?.stockmons.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg text-stock-blue-400 font-ptr">
                    교환할 스톡몬이 없습니다!
                  </p>
                  <p className="text-lg text-stock-blue-400 font-ptr">
                    스톡몬을 잡아봐요.
                  </p>
                </div>
              </div>
            )}
          </div>
          <footer className="flex justify-center gap-16">
            <button
              onClick={() => {
                setChoiceStockmon(undefined);
                onClose();
              }}
            >
              <img src="/icons/button-close.svg" alt="close" />
            </button>
            <button
              onClick={() => {
                if (!isDisabled) {
                  setChoiceStockmon(undefined);
                  onConfirm(choiceStockmon);
                }
              }}
              disabled={isDisabled}
            >
              {isDisabled ? (
                <img src="/icons/button-ok-off.svg" alt="ok-off" />
              ) : (
                <img src="/icons/button-ok-on.svg" alt="ok-on" />
              )}
            </button>
          </footer>
        </div>
      </div>
    )
  );
}
