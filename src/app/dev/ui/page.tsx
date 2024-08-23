"use client";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import DevContainer from "@/components/dev/DevContainer";
import Background from "./Background";
import Modal from "@/components/ui/Modal";

export default function UI() {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

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
        <div>
          <Button
            text="모달 1 : 닫기, 확인"
            click={() => setIsModalOpen1(true)}
          />
          <Modal
            open={isModalOpen1}
            onClose={() => setIsModalOpen1(false)}
            hasClose
          ></Modal>
        </div>
        <div>
          <Button text="모달 2 : 확인" click={() => setIsModalOpen2(true)} />
          <Modal
            open={isModalOpen2}
            onClose={() => setIsModalOpen2(false)}
          ></Modal>
        </div>
        <div>
          <Button
            text="모달 3 : children 삽입"
            click={() => setIsModalOpen3(true)}
          />
          <Modal open={isModalOpen3} onClose={() => setIsModalOpen3(false)}>
            <div>자식 컴포넌트</div>
          </Modal>
        </div>
      </DevContainer>
    </div>
  );
}
