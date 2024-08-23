"use client";
import React from "react";
import Image from "next/image";

export default function MessageItem() {
  const handleConfirm = () => {};
  const handleCancel = () => {};

  return (
    <div className="w-full bg-stock-blue-200 border border-stock-blue-950 rounded-lg p-2">
      <div className="w-full bg-stock-blue-50 rounded-lg px-1 py-3 flex flex-row justify-between items-center">
        <div className="message text-stock-blue-950 font-ptb">
          <p>닉넴</p>
          <p>동맹요청이 왔습니다</p>
        </div>
        <div className="btn-box flex flex-row gap-3">
          <div onClick={handleCancel}>
            <Image
              src={"/images/icons/btn-cancel.png"}
              alt={"취소"}
              width={28}
              height={28}
            />
          </div>
          <div onClick={handleConfirm}>
            <Image
              src={"/images/icons/btn-confirm.png"}
              alt={"확인"}
              width={28}
              height={28}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
