"use client";
import React, { useCallback } from "react";
const { useState, useEffect } = React;
import "./style.scss";
import useGame from "@/hooks/useGame";
import "animate.css";
import "@/app/animations.css";
import Confetti from "./Confetti";
import useVibrate from "@/hooks/useVibrate";
import useToast from "@/hooks/useToast";

type Props = {
  catchStockmon: () => void;
  throwStockBall: () => void;
  imgUrl: string;
  remainStockBall: number;
};

export default function TimingGame({
  catchStockmon,
  throwStockBall,
  imgUrl,
  remainStockBall,
}: Props) {
  const {
    onTargetClick,
    status,
    targetPosition,
    targetSize,
    aimPosition,
    AIM_WIDTH,
    disable,
    gage,
  } = useGame();
  const [animNum, setAnimNum] = useState<Number>();
  const [confettiAnimation, setConfettiAnimation] = useState(false);
  const { ErrorToast } = useToast();
  const { vibrate } = useVibrate();

  useEffect(() => {
    setAnimNum(Math.floor(Math.random() * 10));

    const confettiTimeout = setTimeout(() => {
      if (gage <= 0) {
        setConfettiAnimation(true);
      }
    }, 3000);

    const catchTimeout = setTimeout(() => {
      if (gage <= 0) {
        catchStockmon();
      }
    }, 5000);

    return () => {
      clearTimeout(confettiTimeout);
      clearTimeout(catchTimeout);
    };
  }, [status]);

  const handleTargetClick = () => {
    if (disable) return;
    if (remainStockBall <= 0) {
      return ErrorToast("사용할 복숭아가 없어요..");
    }
    //TODO: 포켓볼 사용하여 던짐
    vibrate([200]);
    throwStockBall();
    onTargetClick();
  };

  return (
    <div
      onClick={handleTargetClick}
      className="flex justify-between flex-col h-full items-center p-6"
    >
      <div></div>
      <div className="stockmon-container w-full h-1/3">
        {status && (
          <span
            className={`absolute z-10 left-0 w-full bounce-in-up TimingGame__status TimingGame__status--${String(
              status
            ).toLowerCase()}`}
          >
            {status === "Perfect" && (
              <img src="/icons/status-perfect.png" alt="스톡몬 잡기 성공" />
            )}
            {status === "Good" && (
              <img src="/icons/status-good.png" alt="스톡몬 잡기 성공" />
            )}
            {status === "Miss" && (
              <img src="/icons/status-fail.png" alt="스톡몬 잡기 실패" />
            )}
          </span>
        )}
        <div id="heart" className="m-auto bottom-12">
          <div className={`fill`} style={{ height: `${gage}px` }}></div>
          <div className="h-outline"></div>
        </div>
        <img
          className="catch-stokcmon-bounce m-auto h-full"
          src={imgUrl}
          alt="스톡몬"
        />
        <div className="stockmon-shadow w-24 h-10 m-auto bg-stock-dark-600 bg-opacity-20"></div>
      </div>
      {/* {status === "Hit" && ( */}
      {/* Confetti 애니메이션 */}
      {confettiAnimation && <Confetti />}
      {status && (
        <div
          className={` ${
            status ? "catch " + status + "-" + animNum : "hidden"
          }`}
        >
          <img
            className="m-auto h-full"
            src="/images/peach.svg"
            alt="피치"
            width={100}
          />
        </div>
      )}
      {/* )} */}
      <div className="TimingGame">
        <div className="TimingGame__bar">
          <div className="TimingGame__lemon">
            <div
              className="TimingGame__target"
              style={{
                left: `${targetPosition - targetSize / 2}%`,
                width: `${targetSize}%`,
              }}
            />
          </div>
          <div
            className="TimingGame__aim"
            style={{
              left: `${aimPosition - AIM_WIDTH / 2}%`,
              width: `${AIM_WIDTH}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
