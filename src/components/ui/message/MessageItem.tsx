"use client";
import React from "react";
import Image from "next/image";
import { INotice } from "../../../app/message/page";
type Props = {
  noticeInfo: INotice;
  handleConfirm: () => void;
  handleCancel: () => void;
};
export default function MessageItem({
  handleConfirm,
  handleCancel,
  noticeInfo,
}: Props) {
  const type = noticeInfo.type === 1 ? "동맹" : "교환";
  return (
    <div className="w-full bg-somsatang-gradient border border-stock-blue-900 rounded-lg p-2  my-2">
      <div className="w-full bg-white rounded-lg px-1 py-3 flex flex-row justify-between items-center">
        <div className="message text-stock-blue-950">
          <p className="font-ptb pb-1">{noticeInfo.nickname}</p>
          <p className="text-sm">
            <b className="font-semibold">{type}</b>요청이 왔습니다
          </p>
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
