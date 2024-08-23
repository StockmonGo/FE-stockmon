"use client";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import DevContainer from "@/components/dev/DevContainer";
import Background from "./Background";
import Modal from "@/components/ui/Modal";

export default function UI() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <DevContainer title="모달">
        <Button text="모달 열기" click={() => setIsModalOpen(true)} />
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}></Modal>
      </DevContainer>
    </div>
  );
}
