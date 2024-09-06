"use client";
import mapAPI from "@/apis/mapAPI";
import TimingGame from "@/components/game/TimingGame";
import PeachCount from "@/components/ui/game/PeachCount";
import { stockmonGameAtom } from "@/store/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

type GAME_STATUS = "playing" | "done";
export default function Game() {
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>("playing");
  const router = useRouter();
  const [usedStockball, setUsedStockball] = useState(0);
  const service = new mapAPI();
  const [stockmonGame] = useAtom(stockmonGameAtom);
  const stockmonImgSrc = `${process.env.NEXT_PUBLIC_S3_URL}/${stockmonGame.stockmonId}.png`;

  const throwStockBall = () => {
    setUsedStockball((prev) => {
      return prev + 1;
    });
  };
  // TODO: 선택한 스톡몬 id 가져와서 노출 catchStockmon에 api붙히기
  // TODO: 잡은 스톡몬 정보 NewStockmon에 뿌려주기

  const catchStockmon = async () => {
    console.log("info:", stockmonGame);
    setGameStatus("done");
    //TODO:stockmon정보같이 보내기
    const res = await service.catchStockmon({
      worldId: stockmonGame.id,
      stockmonId: stockmonGame.stockmonId,
      usedStockballs: usedStockball,
    });
    //TODO: 쿼리파람으로 보내주기
    /**
     * 	"data": {
		"stockmonId": 1,
		"stockmonName": "신한지주 몬",
		"stockType": "금융",
	  "stockPrice": 1300,
	  "stockTotalPrice" : 32500500,
	  "stockMarket": "코스피"
	},
     */
    console.log("res:", res);
    if (res)
      router.push(
        `/game/new-stockmon?stockmonName=${res.stockmonName}&stockmonId=${res.stockmonId}`
      );
  };

  useEffect(() => {
    //TODO: 스톡볼 다 사용하면 모달 노출하고 월드로 보내기
    console.log("사용한 스톡볼:", usedStockball);
  }, [usedStockball]);
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
            <PeachCount />
            <TimingGame
              throwStockBall={throwStockBall}
              catchStockmon={catchStockmon}
              imgUrl={stockmonImgSrc}
            />
          </div>
        </main>
        <footer className="w-full flex justify-center"></footer>
      </div>
    </div>
  );
}
