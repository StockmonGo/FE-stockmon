import React from "react";
import MessageItem from "./components/MessageItem";

//알림이 있을경우&없을경우 + 팝업
//TODO: 더미데이터 만들어서 띄우기. 없을경우 없는 UI 노출
//type:1 동맹 type:2 스톡몬 교환
export default function Message() {
  return (
    <div className="w-full bg-stock-blue-200 border-4 border-dashed border-stock-border min-h-56 rounded-lg p-3">
      <div className="w-full bg-stock-lemon-50  min-h-56 rounded-lg p-2">
        메세지함
        <MessageItem />
      </div>
    </div>
  );
}
