"use client";
import mapAPI from "@/apis/mapAPI";
import TimingGame from "@/components/game/TimingGame";
import PeachCount from "@/components/ui/game/PeachCount";
import { stockmonGameAtom } from "@/store/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import React, { useEffect, useState } from "react";

type GAME_STATUS = "playing" | "done";
export default function Game() {
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>("playing");
  const router = useRouter();
  const [usedStockball, setUsedStockball] = useState(0);
  const [stockmonGame] = useAtom(stockmonGameAtom);
  const [isLoading, setIsLoading] = useState(false);
  const stockmonImgSrc = `${process.env.NEXT_PUBLIC_S3_URL}/${stockmonGame.stockmonId}.png`;
  const service = new mapAPI();
  const throwStockBall = () => {
    setUsedStockball((prev) => {
      return prev + 1;
    });
  };
  // TODO: 선택한 스톡몬 id 가져와서 노출 catchStockmon에 api붙히기
  // TODO: 잡은 스톡몬 정보 NewStockmon에 뿌려주기

  const handleCatch = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      setGameStatus("done");
      console.log("이게 오래걸려서 로딩");
      const res = await service.catchStockmon({
        worldId: stockmonGame.id,
        stockmonId: stockmonGame.stockmonId,
        usedStockballs: usedStockball,
      });
      if (res) {
        console.log("catch res:", res);
        router.push(
          `/game/new-stockmon?id=${stockmonGame.stockmonId}&pr=${res.stockPrice}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-scroll">
      <div className="fixed w-full h-full overflow-hidden z-0">
        <div
          className="bg-cover bg-center w-full h-full fixed z-[-1]"
          style={{ backgroundImage: "url('/images/bg-game.jpg')" }}
        ></div>
      </div>
      <div className="max-w-xl w-xl h-screen relative z-1 m-auto flex flex-col items-center justify-between gap-6">
        <main className="flex-1 w-full h-full">
          <div className="h-full">
            <PeachCount usingStockball={usedStockball} />
            <TimingGame
              throwStockBall={throwStockBall}
              catchStockmon={handleCatch}
              imgUrl={stockmonImgSrc}
            />
          </div>
        </main>
        <footer className="w-full flex justify-center"></footer>
      </div>
    </div>
  );
}
