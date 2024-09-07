"use client";
import React from "react";
import Image from "next/image";
import { ITraveler } from "@/types/member";

type Props = {
  traveler: ITraveler;
  travelerType: "alliance" | "others";
  addAlliance: (travelerId: number) => void;
  deleteAlliance: (travelerId: number) => void;
  openExchange: (travelerId: number) => void;
};
export default function AllianceItem({
  traveler,
  travelerType,
  addAlliance,
  deleteAlliance,
  openExchange,
}: Props) {
  return (
    <div className="w-full bg-somsatang-gradient rounded-lg px-3 py-3 mb-2 flex flex-row justify-between items-center border border-4 border-white shadow-alliance-drop-shadow">
      <div className="message text-stock-blue-950">
        <p className="font-ptr text-stock-purple-79">{traveler.nickname}</p>
      </div>
      <div className="btn-box flex flex-row gap-3">
        {travelerType === "alliance" && (
          <>
            <div onClick={() => openExchange(traveler.travelerId)}>
              <Image
                src={"/icons/exchange-alliance.svg"}
                alt={"교환"}
                width={36}
                height={36}
              />
            </div>
            <div onClick={() => deleteAlliance(traveler.travelerId)}>
              <Image
                src={"/icons/delete-alliance.svg"}
                alt={"동맹 끊기"}
                width={36}
                height={36}
              />
            </div>
          </>
        )}
        {travelerType === "others" && (
          <div onClick={() => addAlliance(traveler.travelerId)}>
            <Image
              src={"/icons/add-alliance.svg"}
              alt={"동맹 신청"}
              width={36}
              height={36}
            />
          </div>
        )}
      </div>
    </div>
  );
}
