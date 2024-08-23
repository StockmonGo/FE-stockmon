"use client";
import Button from "@/components/ui/Button";
import React from "react";
import DevContainer from "@/components/dev/DevContainer";
import Background from "./Background";

export default function UI() {
  return (
    <div>
      <DevContainer title="버튼">
        <div className="button-container w-5/12">
          <Button text="버튼" click={() => {}} />
          <Button text="disable 버튼" click={() => {}} disabled />
          <Button text="로딩 버튼" click={() => {}} isLoading />
          <Button text="흰 버튼" click={() => {}} variant="white" />
        </div>
      </DevContainer>
      <DevContainer title="백그라운드">
        <Background />
      </DevContainer>
      <DevContainer title="폰트">
        <div>
          <p>기본 폰트입니다.</p>
          <p className="font-ptb">평택반도체입니다. font-ptb 로 사용하세요</p>
          <p className="font-ptr">평택반도체입니다. font-ptr 로 사용하세요</p>
        </div>
      </DevContainer>
    </div>
  );
}
