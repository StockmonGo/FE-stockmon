"use client";
import React, { useEffect, useState } from "react";
import MessageItem from "../../components/ui/message/MessageItem";
import dummyNotice from "../../../dummy/notices.json";
import { TbMessageDots } from "react-icons/tb";
//알림이 있을경우&없을경우 + 팝업
//TODO: 더미데이터 만들어서 띄우기. 없을경우 없는 UI 노출
//type:1 동맹 type:2 스톡몬 교환
export interface INotice {
  type: number; // 1
  optionType: number;
  travelerId: number;
  nickname: string;
  timestamp: string;
}

export default function Message() {
  const [data, setData] = useState<INotice[]>();

  useEffect(() => {
    if (dummyNotice) {
      setData(dummyNotice.data.notices);
      // setData([]);
    }
  }, []);
  const handleConfirm = () => {};
  const handleCancel = () => {};

  return (
    <div
      className={`w-full bg-stock-blue-200 border-4 border-dashed border-stock-border ${
        data && data?.length > 0 ? "h-full" : "h-56"
      } rounded-lg p-3`}
    >
      <div className="w-full bg-stock-lemon-50 h-full rounded-lg p-2 overflow-scroll">
        {data &&
          data.map((notice) => {
            return (
              <MessageItem
                key={notice.timestamp}
                noticeInfo={notice}
                handleCancel={handleCancel}
                handleConfirm={handleConfirm}
              />
            );
          })}
        {data && data.length === 0 && (
          <div className="flex items-center flex-col justify-center h-full">
            <TbMessageDots className="text-stock-blue-400" size={120} />
            <p className="font-ptr text-lg text-stock-blue-400">
              알림이 없습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
