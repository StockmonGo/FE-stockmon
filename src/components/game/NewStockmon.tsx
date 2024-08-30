import React from "react";
import BtnClose from "../ui/BtnClose";

export default function NewStockmon() {
  return (
    <div className="fixed w-full h-full bg-yellow-200 top-0 z-50">
      <div
        className="bg-cover bg-center w-full h-full fixed z-[-1]"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      ></div>
      <main className="flex-1 w-full h-full  p-6">
        <div className="w-48 m-auto">
          <img src="/icons/status-new.png" alt="새로 추가" />
        </div>
      </main>

      <footer className="fixed bottom-10 w-full flex justify-center">
        <BtnClose />
      </footer>
    </div>
  );
}
