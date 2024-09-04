import authAPI, { IAuth } from "../apis/authAPI";
import { useEffect } from "react";

export function useAuth() {
  //TODO: 상태관리(jotai)로 유저 정보 전역 저장해놓기
  const service = new authAPI();

  // POST join
  async function signIn(auth: { nickname: string; password: string }) {
    try {
      const res = await service.signIn(auth);
      if (res && res.user) {
        //TODO: 저장
        return res.user;
      } else {
        throw Error;
      }
    } catch (err) {
      //복구
      console.log("Error to login", err);
      return false;
      //실패 케이스에 따라 로그아웃 실패 노출(존재하지않는계정 )
    }
  }

  // POST signup
  async function signUp({ nickname, password, inviterNickname }: IAuth) {
    const res = await service.signUp({
      nickname,
      password,
      inviterNickname,
    });
    if (res && res.user) {
      //TODO: 저장
      return res;
    } else {
      console.error("signup failed");
      return res;
    }
  }

  //logout 유저정보 clear
  async function signOut() {
    try {
      const res = await service.signOut();
      if (res) {
        //TODO: jotai 유저정보 클리어
      }
    } catch (err) {
      console.log(err);
    }
  }

  //TODO: 마운트시 로그인여부체크해서 유저정보 세팅
  useEffect(() => {
    async function init() {}
    init();
  }, []);

  return {
    signIn,
    signUp,
    signOut,
  };
}
