"use client";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import DevContainer from "@/components/dev/DevContainer";
import Background from "./Background";
import Modal from "@/components/ui/Modal";
import Avatar from "boring-avatars";
import useToast from "@/hooks/useToast";
import useVibrate from "@/hooks/useVibrate";

export default function UI() {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalDisabled3, setIsModalDisabled3] = useState(true);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const { SuccessToast, ErrorToast } = useToast();
  const { vibrate } = useVibrate();

  const handleVibration = () => {
    vibrate([200, 100, 200]);
  };

  return (
    <div>
      <DevContainer title="프로필">
        <>
          <div className="flex flex-rows justify-evenly">
            {/* marble, beam, pixel, sunset, ring and bauhaus. */}
            <div>
              <Avatar name="Margaret Brent" variant="marble" />
              <p>marble</p>
            </div>
            <div>
              <Avatar name="Margaret Brent" variant="beam" />
              <p>beam</p>
            </div>
            <div>
              <Avatar name="Margaret Brent" variant="sunset" />
              <p>sunset</p>
            </div>
            <div>
              <Avatar name="Margaret Brent" variant="ring" />
              <p>ring</p>
            </div>
            <div>
              <Avatar name="Margaret Brent" variant="bauhaus" />
              <p>bauhaus</p>
            </div>
          </div>
          <div className="flex flex-rows justify-evenly">
            <div>
              <Avatar name="현아" variant="beam" />
              <p>bean - 현아 </p>
            </div>
            <div>
              <Avatar name="소연" variant="beam" />
              <p>bean - 소연 </p>
            </div>
            <div>
              <Avatar name="경륜" variant="beam" />
              <p>bean - 경륜 </p>
            </div>
            <div>
              <Avatar name="민증" variant="beam" />
              <p>bean - 민중 </p>
            </div>
            <div>
              <Avatar name="희을" variant="beam" />
              <p>bean - 희을 </p>
            </div>
            <div>
              <Avatar name="채윤" variant="beam" />
              <p>bean - 채윤 </p>
            </div>
          </div>
        </>
      </DevContainer>
      <DevContainer title="버튼">
        <div className="button-container w-5/12">
          <Button text="버튼" onClick={() => {}} />
          <Button text="disable 버튼" onClick={() => {}} disabled />
          <Button text="로딩 버튼" onClick={() => {}} isLoading />
          <Button text="흰 버튼" onClick={() => {}} variant="white" />
        </div>
      </DevContainer>
      <DevContainer title="백그라운드">
        <Background />
      </DevContainer>
      <DevContainer title="모달">
        <div>
          <Button
            text="모달 1 : 닫기, 확인"
            onClick={() => setIsModalOpen1(true)}
          />
          <Modal
            open={isModalOpen1}
            onClose={() => setIsModalOpen1(false)}
            onConfirm={() => setIsModalOpen1(false)}
            hasClose
          ></Modal>
        </div>
        <div>
          <Button text="모달 2 : 확인" onClick={() => setIsModalOpen2(true)} />
          <Modal
            open={isModalOpen2}
            onClose={() => setIsModalOpen2(false)}
          ></Modal>
        </div>
        <div>
          <Button
            text="모달 3 : children 삽입"
            onClick={() => setIsModalOpen3(true)}
          />
          <Modal
            open={isModalOpen3}
            onClose={() => setIsModalOpen3(false)}
            onConfirm={() => setIsModalOpen3(false)}
            isDisabled={isModalDisabled3}
            hasClose
          >
            <button
              className={`${!isModalDisabled3 && "bg-stock-blue-100"}`}
              onClick={() => setIsModalDisabled3((pre) => !pre)}
            >
              여기 클릭하면 버튼 활성화 바뀜
            </button>
          </Modal>
        </div>
        <div>
          <Button text="모달 4 : 로딩" onClick={() => setIsModalOpen4(true)} />
          <Modal
            open={isModalOpen4}
            onClose={() => setIsModalOpen4(false)}
            onConfirm={() => setIsModalOpen4(false)}
            hasClose
            isLoading
          ></Modal>
        </div>
      </DevContainer>
      <DevContainer title="토스트">
        <div>
          <p>기본 폰트입니다.</p>
          <p className="font-ptb">평택반도체입니다. font-ptb 로 사용하세요</p>
          <p className="font-ptr">평택반도체입니다. font-ptr 로 사용하세요</p>
        </div>
      </DevContainer>
      <DevContainer title="폰트">
        <Button
          text="성공 토스트"
          onClick={() => {
            SuccessToast("성공하였습니다.");
          }}
        />
        <Button
          text="실패 토스트"
          onClick={() => {
            ErrorToast("실패하였습니다.");
          }}
        />
      </DevContainer>
      <DevContainer title="진동">
        <Button text="진동" onClick={handleVibration} />
      </DevContainer>
    </div>
  );
}
