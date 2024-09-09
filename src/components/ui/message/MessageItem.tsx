"use client";
import React from "react";
import Image from "next/image";
import { INoticeItem } from "@/app/message/page";
type Props = {
  noticeInfo: INoticeItem;
  handleConfirm: (noticeInfo: INoticeItem) => void;
  handleCancel: (noticeInfo: INoticeItem) => void;
};
export default function MessageItem({
  handleConfirm,
  handleCancel,
  noticeInfo,
}: Props) {
  return (
    <div className="w-full bg-somsatang-gradient border border-stock-blue-900 rounded-lg p-2  my-2">
      <div className="w-full bg-white rounded-lg px-1 py-3 flex flex-row justify-between items-center">
        <div className="message text-stock-blue-950">
          <p className="font-ptb pb-1">{noticeInfo.senderNickname}</p>
          <p className="text-sm">
            <b className="font-semibold">{noticeInfo.noticeType}</b>요청이
            왔습니다
          </p>
        </div>
        <div className="btn-box flex flex-row gap-3">
          <div onClick={() => handleCancel(noticeInfo)}>
            <Image
              src={"/icons/button-close.svg"}
              alt={"취소"}
              width={28}
              height={28}
            />
          </div>
          <div onClick={() => handleConfirm(noticeInfo)}>
            <Image
              src={"/icons/button-ok-on.svg"}
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
