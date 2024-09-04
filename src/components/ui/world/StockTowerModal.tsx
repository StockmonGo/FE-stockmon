"use client";
import mapAPI from "@/apis/mapAPI";
import "@/app/world/world.css";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  towerId: number;
  towerActive: boolean;
  service: mapAPI;
};
export default function StockTowerModal({ name, towerId, towerActive, service }: Props) {
  const [stockBallNum, setStockBallNum] = useState(0);
  const [showPeach, setShowPeach] = useState(false);
  const [flipCss, setFlipCss] = useState("");
  const [active, setActvie] = useState(towerActive);
  const [firstCss, setFirstCss] = useState("roll-in");
  const handleTowerClick = () => {
    if (!active) {
      alert("아직 안 됨!");
      return;
    }
    // setStockBallNum(onClick(towerId));
    service.spinStockTower(towerId).then((res) => {
      console.log(res);
    });
    setShowPeach(true);
    setFlipCss("flip");

    setTimeout(() => {
      setShowPeach(false);
      setFlipCss("");
      setActvie(false);
    }, 2000); // 2초 후에 이미지를 숨김
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstCss("left-1/2");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPeach ? (
        <p className="fade-in-down text-white text-4xl fixed top-4 z-20">+ {stockBallNum}</p>
      ) : (
        <p className="text-white text-4xl fixed top-4 z-20">{name}</p>
      )}
      <div
        className={`${firstCss} z-10 ${
          active ? "border-stock-red" : "border-stock-dark-500"
        } border-[100px] w-screen min-w-[450px] scale-x-[1.7] scale-y-110 rounded-full h-full fixed top-0 transform -translate-x-1/2 flex justify-center items-center`}
      >
        {active ? (
          <img src="/images/peachTower.svg" alt="피치타워" className={`w-3/4 ${flipCss}`} onClick={handleTowerClick} />
        ) : (
          <img src="/images/peachTowerGrey.svg" alt="피치타워" className={`w-3/4`} onClick={handleTowerClick} />
        )}
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
