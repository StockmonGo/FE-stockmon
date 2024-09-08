import React from "react";

type Props = {
  message?: string;
  children?: React.ReactNode;
  imgUrl?: string;
};

export default function Error({
  message = "데이터를 가져오는데 실패하였습니다.",
  children,
  imgUrl = `${process.env.NEXT_PUBLIC_S3_URL}/${20}.png`,
}: Props) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {imgUrl && (
        <div className="relative w-1/2">
          <img
            className="absolute top-4 right-10"
            src="/icons/depress-feeling.svg"
            alt="bad"
          />
          <img className="w-full aspect-square" src={imgUrl} alt="스톡몬" />
        </div>
      )}
      <div className="w-4/5 break-all mx-6 text-center text-stock-dark-600 text-lg">
        {message}
      </div>
      <div> {children && children}</div>
    </div>
  );
}
