"use client";
import NewStockmon from "@/components/game/NewStockmon";
import BtnClose from "@/components/ui/BtnClose";
import React, { useState } from "react";

type GAME_STATUS = "playing" | "done";
export default function Game() {
  return (
    <div className="h-full">
      <div className="w-48 m-auto">
        <img src="/icons/status-new.png" alt="새로 추가" />
      </div>
    </div>
  );
}
