"use client";
import React from "react";
const { useState, useEffect } = React;
import "./style.scss";
import useGame from "@/hooks/useGame";

type Props = {
  catchStockmon: () => void;
};

export default function TimingGame({ catchStockmon }: Props) {
  const {
    onTargetClick,
    status,
    targetPosition,
    targetSize,
    aimPosition,
    AIM_WIDTH,
    disable,
  } = useGame();

  useEffect(() => {
    if (status === "Hit") {
      setTimeout(() => {
        catchStockmon();
      }, 3000);
    }
  }, [status]);

  useEffect(() => {
    window.addEventListener("keypress", onTargetClick);
    return () => {
      window.removeEventListener("keypress", onTargetClick);
    };
  }, [aimPosition]);

  return (
    <div
      onClick={() => onTargetClick()}
      className="flex justify-between flex-col h-full items-center p-6"
    >
      <div></div>
      <div className="stockmon-container w-full h-1/3">
        {status && (
          <span
            className={`absolute left-0 w-full bounce-in-up TimingGame__status TimingGame__status--${String(
              status
            ).toLowerCase()}`}
          >
            {status === "Hit" && (
              <img src="/icons/status-success.png" alt="스톡몬 잡기 성공" />
            )}
            {status === "Miss" && (
              <img src="/icons/status-fail.png" alt="스톡몬 잡기 실패" />
            )}
          </span>
        )}
        <img
          className="m-auto h-full "
          src="/images/dummy-stockmon.png"
          alt="스톡몬"
        />
      </div>
      {/* {status === "Hit" && ( */}
      {status && (
        <div className={` ${status ? "catch " + status : "hidden"}`}>
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
