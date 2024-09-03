"use client";
import memberAPI from "@/apis/memberAPI";
import CommonLayout from "@/components/ui/CommonLayout";
import UserMenu from "@/components/ui/profile/UserMenu";
import UserProfile from "@/components/ui/profile/UserProfile";
import { useEffect, useState } from "react";

export default function Profile() {
  // TODO 사용자 정보랑 연결
  const [user, setUser] = useState({
    nickname: "희을을",
    hasAccount: true,
    accountNumber: "010-12345-67890",
  });
  const service = new memberAPI();

  useEffect(() => {
    service
      .getMemberProfile()
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CommonLayout title="마이페이지">
      <div className="w-full h-full flex flex-col items-center gap-6">
        <UserProfile nickname={user.nickname} />
        <UserMenu />
      </div>
    </CommonLayout>
  );
}
