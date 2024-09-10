"use client";
import memberAPI from "@/apis/memberAPI";
import CommonLayout from "@/components/ui/CommonLayout";
import UserMenu from "@/components/ui/profile/UserMenu";
import UserProfile from "@/components/ui/profile/UserProfile";
import SimpleLoading from "@/components/ui/SimpleLoading";
import { IMemberRes } from "@/types/member";
import { Suspense } from "react";
import useSWR from "swr";

export default function Profile() {
  const service = new memberAPI();
  const { data: member, error } = useSWR<IMemberRes | null>(
    "memberProfile",
    () => service.getMemberProfile()
  );

  // 에러 처리
  if (error) {
    console.error(error);
    return <div>Failed to load user profile.</div>;
  }

  if (!member) {
    return <SimpleLoading />;
  }
  return (
    <Suspense>
      <CommonLayout title="마이페이지" routeUrl="/world">
        <div className="w-full h-full flex flex-col items-center gap-6 pt-6">
          <UserProfile nickname={member.nickname} />
          <UserMenu
            accountNumber={member.accountNumber ? member.accountNumber : ""}
          />
        </div>
      </CommonLayout>
    </Suspense>
  );
}
