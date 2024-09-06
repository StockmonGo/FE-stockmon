"use client";
import NewStockmon from "@/components/game/NewStockmon";
import BtnClose from "@/components/ui/BtnClose";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import StockmonCard from "@/components/ui/books/StockmonCard";
type GAME_STATUS = "playing" | "done";
export default function Game() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("stockmonName") as string;

  return (
    <div className="h-full">
      <div className="w-48 m-auto">
        <img src="/icons/status-new.png" alt="새로 추가" />
        {searchTerm}
        <NewStockmon />
      </div>
    </div>
  );
}
