import { useAtom } from "jotai";
import authAPI, { IAuth } from "../apis/authAPI";
import { useEffect } from "react";
import { accessTokenAtom, userLocalAtom } from "@/store/store";
import axios from "axios";

export function useAuth() {
  //TODO: 상태관리(jotai)로 유저 정보 전역 저장해놓기
  const service = new authAPI();
  const [userLocal, setUserLocal] = useAtom(userLocalAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  // POST signup
  async function signUp({ nickname, password, inviterNickname }: IAuth) {
    try {
      const res = await service.signUp({
        nickname,
        password,
        inviterNickname,
      });
      if (res && res.data) {
        return res.data.nickname;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error:", error);
        throw Error(error.message);
      }
    }
  }

  // POST 로그인
  async function signIn(auth: { nickname: string; password: string }) {
    try {
      const res = await service.signIn(auth);
      if (res.data) {
        //TODO: 저장
        console.log("login data:", res.data);
        setAccessToken(res.data.accessToken);
        setUserLocal(auth.nickname);
        return auth.nickname;
      }
    } catch (error) {
      //TODO: 에러 메세지 전달
      throw Error("");
    }
  }

  //logout 유저정보 clear
  async function signOut() {
    try {
      const res = await service.signOut();
      if (res) {
        //TODO: jotai 유저정보 클리어
        setAccessToken("");
        setUserLocal("");
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
