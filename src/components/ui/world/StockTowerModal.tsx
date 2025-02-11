"use client";
import mapAPI from "@/apis/mapAPI";
import "@/app/world/world.css";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  towerId: number;
  towerActive: boolean;
  service: mapAPI;
  clickTower: (stockBall: number) => void;
};
export default function StockTowerModal({
  name,
  towerId,
  towerActive,
  service,
  clickTower,
}: Props) {
  const [stockBallNum, setStockBallNum] = useState(0);
  const [showPeach, setShowPeach] = useState(false);
  const [flipCss, setFlipCss] = useState("");
  const [active, setActvie] = useState(towerActive);
  const [firstCss, setFirstCss] = useState("roll-in");
  const handleTowerClick = () => {
    if (!active) {
      return;
    }
    service.getStockBallNum().then((res) => {
      if (res && res.stockballs == 50) {
        alert("스톡볼이 가득 찼어요!");
        return;
      } else {
        service.spinStockTower(towerId).then((res) => {
          console.log(res);
          if (res) {
            setStockBallNum(res.increasedStockBall);
            clickTower(res.increasedStockBall);
          }
        });
        setShowPeach(true);
        setFlipCss("flip");

        setTimeout(() => {
          setShowPeach(false);
          setFlipCss("");
          setActvie(false);
        }, 2000); // 2초 후에 이미지를 숨김
      }
    });
  };

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setFirstCss("left-1/2");
    // }, 2000);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPeach ? (
        <p className="fade-in-down text-white text-4xl fixed top-4 z-20">
          + {stockBallNum}
        </p>
      ) : (
        <p className="text-white text-4xl fixed top-4 z-20">{name}</p>
      )}
      <div className="overflow-hidden fixed max-w-xl w-full h-screen">
        <div
          className={`${firstCss} z-10 ${
            active ? "border-stock-red" : "border-stock-dark-500"
          } absolute max-w-xl border-[100px] w-screen min-w-[360px] scale-x-[1.9] scale-y-110 rounded-full h-full fixed top-0 transform flex justify-center items-center`}
        >
          {active ? (
            <img
              src="/images/peachTower.svg"
              alt="피치타워"
              className={`w-3/4 ${flipCss}`}
              onClick={handleTowerClick}
            />
          ) : (
            <img
              src="/images/peachTowerGrey.svg"
              alt="피치타워"
              className={`w-3/4`}
            />
          )}
        </div>
      </div>
      {showPeach && (
        <div className="fixed flex bottom-10 w-full justify-center gap-20">
          <img
            src="/images/peach.svg"
            alt="복숭아"
            className="bounce w-14 h-14 z-20 fixed bottom-4 right-24"
          />
          <img
            src="/images/peach.svg"
            alt="복숭아"
            className="bounce2 w-14 h-14 z-20 fixed bottom-4 left-24"
          />
        </div>
      )}
    </>
  );
}
