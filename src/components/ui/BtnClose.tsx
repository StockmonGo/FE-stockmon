"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  routeUrl?: string;
};
export default function BtnClose({ routeUrl }: Props) {
  const router = useRouter();

  const go = () => {
    if (typeof window !== "undefined") {
      if (routeUrl) router.push(routeUrl);
      else router.back();
    }
  };

  return (
    <button
      className="w-10 h-10 z-100"
      style={{ backgroundImage: "url('/icons/CloseButton.svg')" }}
      onClick={go}
    ></button>
  );
}
