"use client";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Account() {
  const router = useRouter();
  return (
    <div className="grid justify-items-center space-y-12">
      <img src="/images/logo-280x280.png" alt="로고" />
      <div className="w-32 grid">
        <Button text="회원가입" onClick={() => router.push("/account/register")} />
        <Button text="로그인" onClick={() => router.push("/account/login")} />
      </div>
    </div>
  );
}
