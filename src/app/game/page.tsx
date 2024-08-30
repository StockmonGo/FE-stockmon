"use client";
import NewStockmon from "@/components/game/NewStockmon";
import TimingGame from "@/components/game/TimingGame";
import PeachCount from "@/components/ui/game/PeachCount";
import Image from "next/image";
import React, { useState } from "react";
import Avatar from "boring-avatars";

type GAME_STATUS = "playing" | "done";
export default function Game() {
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>("playing");
  // TODO: 선택한 스톡몬 id 가져와서 노출 catchStockmon에 api붙히기
  // TODO: 잡은 스톡몬 정보 NewStockmon에 뿌려주기

  const catchStockmon = () => {
    setGameStatus("done");
  };
  return (
    <div className="h-full">
      <PeachCount />
      {/* marble, beam, pixel, sunset, ring and bauhaus. */}
      <Avatar name="Margaret Brent" variant="marble" />
      {<TimingGame catchStockmon={catchStockmon} />}
      {gameStatus === "done" && <NewStockmon />}
    </div>
  );
}
