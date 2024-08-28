"use client";
import React, { useState } from "react";
import dummyStock from "@/../dummy/books/books.json";
type Props = {
  open: boolean;
  onClose: () => void;
  noticeId: number;
  stockmonId: number;
  stockmonName: string;
  stockmonImageUrl: string;
};

interface IStockmon {
  id: number;
  imgUrl: string;
}

export default function StockExchangeModal({
  open,
  onClose,
  noticeId,
  stockmonId,
  stockmonName,
  stockmonImageUrl,
}: Props) {
  const [stockmons, setStockmons] = useState<IStockmon[]>([]); //내가 보유한 스톡몬들
  const [isDisabled, setIsDisabled] = useState(true);
  const [choiceStockmon, setChoiceStockmon] = useState<number>();
  const handleStockmonClick = (id: number) => {
    if (isDisabled) setIsDisabled(false);
    setChoiceStockmon(id);
  };
  const handleConfirm = () => {
    //TODO: noticeId, travelerStockmonId // 보낼 스톡몬아이디
  };
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
          <header className="w-full py-3 flex flex-row gap-2  text-stock-blue-950 rounded-lg justify-between items-center">
            <div className="">
              <h2 className="font-ptb text-xl pb-3">스톡몬 교환</h2>
              <p className="font-ptr text-stock-dark-700 text-sm">
                교환할 스톡몬을 선택해주세요.
              </p>
            </div>
            <div>
              <div>
                <img src={stockmonImageUrl} alt="스톡몬" />
              </div>
              <p className="text-xs font-ptr text-center text-stock-dark-800 pt-1">
                {stockmonName}
              </p>
            </div>
          </header>
          <div
            className="w-full bg-stock-lemon-50 bg-border-custom-dotted-thin  p-[1px]"
            style={{
              aspectRatio: "1/1",
            }}
          >
            {stockmons.length > 0 && (
              <div
                className="w-full h-full overflow-y-scroll grid grid-cols-3 gap-2 px-3 py-6"
                style={{
                  aspectRatio: "1/1",
                }}
              >
                {stockmons.map((stockmon) => {
                  return (
                    <div
                      key={stockmon.id}
                      className={`m-auto p-1 ${
                        choiceStockmon === stockmon.id && "bg-stock-lemon-100"
                      }`}
                      onClick={() => {
                        handleStockmonClick(stockmon.id);
                      }}
                    >
                      <img src="/images/dummy-stockmon.png" alt="" />
                    </div>
                  );
                })}
              </div>
            )}
            {stockmons.length === 0 && (
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
            <button onClick={onClose}>
              <img src="/icons/button-close.svg" alt="close" />
            </button>
            <button onClick={handleConfirm} disabled={isDisabled}>
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
