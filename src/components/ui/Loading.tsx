import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div
      className="bg-cover bg-center w-full h-full fixed z-[-1]"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        {<FaSpinner />}
        <div className="text-stock-dark-700">로딩중</div>
      </div>
    </div>
  );
}
