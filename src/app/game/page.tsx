"use client";
import mapAPI from "@/apis/mapAPI";
import TimingGame from "@/components/game/TimingGame";
import PeachCount from "@/components/ui/game/PeachCount";
import { stockmonGameAtom } from "@/store/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import React, { useEffect, useMemo, useState } from "react";
import useToast from "@/hooks/useToast";

type GAME_STATUS = "playing" | "done";
export default function Game() {
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>("playing");
  const router = useRouter();
  const service = new mapAPI();
  const [stockmonGame] = useAtom(stockmonGameAtom);
  const { SuccessToast, ErrorToast } = useToast();
  const [usedStockball, setUsedStockball] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [stockballs, setStockballs] = useState(0);
  const stockmonImgSrc = `${process.env.NEXT_PUBLIC_S3_URL}/${stockmonGame.stockmonId}.png`;
  const stockballCnt = useMemo(
    () => stockballs - usedStockball,
    [stockballs, usedStockball]
  );
  const throwStockBall = () => {
    if (stockballCnt <= 0) {
      return ErrorToast("사용할 복숭아가 없어요..");
    }
    setUsedStockball((prev) => {
      return prev + 1;
    });
  };

  //스톡볼 소모만 하고 잡기 실패
  const handleFailCatch = async () => {
    SuccessToast("도망갈게요!");
    //setGameStatus("done");
    const res = await service.throwStockballs(usedStockball);
    console.log("fail catch res:", res);
    router.push(`/world`);
  };

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
  useEffect(() => {
    service
      .getStockBallNum()
      .then((res) => {
        if (res) {
          setStockballs(res.stockballs);
        }
      })
      .catch((err) => console.log(err));
  }, []);
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
            <div>
              <div
                className="fixed min-w-28 left-[12px] top-4"
                onClick={() => handleFailCatch()}
              >
                <Image
                  alt="exit"
                  src="/icons/icon-exit.svg"
                  width={40}
                  height={40}
                  className=""
                />
              </div>
              <PeachCount stockballCnt={stockballCnt} />
            </div>
            <TimingGame
              remainStockBall={stockballCnt}
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
