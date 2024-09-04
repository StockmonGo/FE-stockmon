import { useAtom } from "jotai";
import authAPI, { IAuth } from "../apis/authAPI";
import { useEffect } from "react";
import { userLocalAtom } from "@/store/store";

export function useAuth() {
  //TODO: 상태관리(jotai)로 유저 정보 전역 저장해놓기
  const service = new authAPI();
  const [userLocal, setUserLocal] = useAtom(userLocalAtom);

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
      } else {
        console.error("signup failed");
        return res;
      }
    } catch (error) {
      //TODO: 에러 메세지 전달
      throw Error("");
    }
  }

  // POST 로그인
  async function signIn(auth: { nickname: string; password: string }) {
    try {
      const res = await service.signIn(auth);
      if (res.data) {
        //TODO: 저장
        setUserLocal({
          nickname: auth.nickname,
          accessToken: res.data.accessToken,
        });
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
        setUserLocal({ nickname: "", accessToken: "" });
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
