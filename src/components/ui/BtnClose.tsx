"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function BtnClose() {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined") {
      router.back();
    }
  };

  return (
    <button
      className="w-10 h-10"
      style={{ backgroundImage: "url('/images/icons/close.png')" }}
      onClick={goBack}
    ></button>
  );
}
