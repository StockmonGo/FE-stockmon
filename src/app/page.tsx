"use client";
import { accessTokenAtom } from "@/store/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    // accessToken의 상태에 따라 페이지를 리다이렉트
    if (accessToken) {
      router.replace("/world");
    } else {
      router.replace("/users/register");
    }
  }, [accessToken, router]);

  return null; // 혹은 로딩 상태를 표시하는 JSX를 반환
}
