"use client";
import "@/app/world/world.css";
import { useState } from "react";

export default function StockTowerModal() {
  const stockBallNum = 2;
  const [showPeach, setShowPeach] = useState(false);
  const handleTowerClick = () => {
    setShowPeach(true);
    setTimeout(() => {
      setShowPeach(false);
    }, 2000); // 2초 후에 이미지를 숨김
  };

  return (
    <>
      {showPeach && <p className="text-white text-4xl fixed top-4 z-20">+ {stockBallNum}</p>}
      <div className="z-10 border-stock-red border-[100px] w-screen min-w-[450px] scale-x-[1.7] scale-y-110 rounded-full h-full fixed top-0 transform left-1/2 -translate-x-1/2 flex justify-center items-center">
        <img src="/images/peachTower.svg" alt="피치타워" className="w-3/4" onClick={handleTowerClick} />
      </div>
      {showPeach && (
        <>
          <img src="/images/peach.svg" alt="복숭아" className="bounce w-14 h-14 z-20 fixed bottom-4 right-20" />
          <img src="/images/peach.svg" alt="복숭아" className="bounce2 w-14 h-14 z-20 fixed bottom-4 left-24" />
        </>
      )}
    </>
  );
}
