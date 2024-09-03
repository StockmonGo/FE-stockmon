"use client";
import { useState } from "react";
import Modal from "../Modal";
import memberAPI from "@/apis/memberAPI";

type Props = {
  accountNumber?: string;
};

export default function UserMenu({ accountNumber }: Props) {
  const [accountModalSee, setAccountModalSee] = useState(false);
  const [infoModalSee, setInfoModalSee] = useState(false);
  const service = new memberAPI();

  const connectAccount = () => {
    service.getAccountStatus().then((res) => {
      console.log(res);
      if (res.status === 200 && !res.hasAccount) {
        setAccountModalSee(true);
      } else {
        setInfoModalSee(true);
      }
    });
  };
  const onAccountClose = () => {
    setAccountModalSee(false);
  };
  const onInfoClose = () => {
    setInfoModalSee(false);
  };
  const createAccount = () => {
    service.createAccount().then((res) => {
      console.log(res);
    });
  };
  // TODO 각자의 함수 생성하기
  const menuItems = [
    {
      text: "계좌 연결하기",
      onClick: connectAccount,
    },
    {
      text: "설정",
      onClick: () => {},
    },
    {
      text: "로그아웃",
      onClick: () => {},
    },
    {
      text: "회원탈퇴",
      onClick: () => {},
    },
  ];

  return (
    <div className="w-full h-fit bg-white/40 rounded-lg p-3">
      {menuItems.map((item, index) => (
        <p
          key={index}
          className={`font-ptr text-lg cursor-pointer p-3 ${item.text === "회원탈퇴" && "text-stock-dark-300"}`}
          onClick={item.onClick}
        >
          {item.text}
        </p>
      ))}
      <Modal
        onClose={onAccountClose}
        open={accountModalSee}
        title="계좌를 연동하시겠습니까?"
        onConfirm={createAccount}
        hasClose={true}
      ></Modal>
      <Modal onClose={onInfoClose} open={infoModalSee} title="연동된 계좌" describe={accountNumber} />
    </div>
  );
}
