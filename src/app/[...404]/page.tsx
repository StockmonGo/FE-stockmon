import Error from "@/components/ui/Error";
import React from "react";

export default function NotFound() {
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-scroll">
      <div className="fixed w-full h-full overflow-hidden z-0">
        <div
          className="bg-cover bg-center w-full h-full fixed z-[-1]"
          style={{ backgroundImage: "url('/images/bg.jpg')" }}
        ></div>
        <Error
          message="존재하지 않는 페이지 입니다."
          imgUrl={`${process.env.NEXT_PUBLIC_S3_URL}/${13}.png`}
        />
      </div>
    </div>
  );
}
