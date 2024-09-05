"use client";
import { accessTokenAtom } from "@/store/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  if (accessToken) {
    router.replace("/world");
  } else {
    router.replace("/users/register");
  }
}
