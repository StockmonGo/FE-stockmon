"use client";
import TimingGame from "@/components/game/TimingGame";
import PeachCount from "@/components/ui/game/PeachCount";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type GAME_STATUS = "playing" | "done";
export default function Game() {
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>("playing");
  const router = useRouter();
  // TODO: 선택한 스톡몬 id 가져와서 노출 catchStockmon에 api붙히기
  // TODO: 잡은 스톡몬 정보 NewStockmon에 뿌려주기

  const catchStockmon = () => {
    setGameStatus("done");
    router.push("/game/new-stockmon");
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
            <PeachCount />
            {<TimingGame catchStockmon={catchStockmon} />}
          </div>
        </main>
        <footer className="w-full flex justify-center"></footer>
      </div>
    </div>
  );
}
