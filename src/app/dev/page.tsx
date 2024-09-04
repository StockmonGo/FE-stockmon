"use client";
import { textAtom, userAtom, userLocalAtom } from "@/store/store";
import { useAtom } from "jotai";
import React from "react";

export default function Dev() {
  const [user, setUser] = useAtom(userAtom);
  const [userLocal, setUserLocal] = useAtom(userLocalAtom);
  return (
    <div>
      <p>메뉴</p>
      <ol>
        <li>
          <a href="dev/ui">ui</a>
        </li>
        <li>
          <a href="dev/game">game</a>
        </li>
      </ol>
      <div>
        <p>Jotai</p>
        <div className="my-2">
          <p>그냥 조타이</p>
          <p>nickname : {user.nickname}</p>
          <p>jwt : {user.jwt}</p>
          <span>닉네임 입력: </span>
          <input
            type="text"
            className="border border-1 border-stone-700 mx-2"
            onChange={(event) => {
              setUser({ ...user, nickname: event.target.value });
            }}
          />
        </div>
        <div className="my-2">
          <p>스토리지 저장 조타이</p>
          <p>nickname : {userLocal}</p>
          <span>닉네임 입력: </span>
          <input
            type="text"
            className="border border-1 border-stone-700 mx-2"
            onChange={(event) => {
              setUserLocal(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
