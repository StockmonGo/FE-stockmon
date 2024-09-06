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
      const loginRes = await signIn({ nickname, password });
      if (res && res.data && loginRes) {
        return res.data.nickname;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw Error(error.response?.data.message);
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
      if (axios.isAxiosError(error)) {
        throw Error(error.response?.data.message);
      }
    }
  }
  // POST 탈퇴
  async function withdraw() {
    try {
      const res = await service.withdraw();
      if (res) {
        setAccessToken("");
        setUserLocal("");
        return res;
      }
    } catch (error) {
      //TODO: 에러 메세지 전달
      if (axios.isAxiosError(error)) {
        throw Error(error.response?.data.message);
      }
    }
  }

  //logout 유저정보 clear
  async function signOut() {
    setAccessToken("");
    setUserLocal("");
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
    withdraw,
  };
}
