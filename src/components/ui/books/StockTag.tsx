import React from "react";

type Props = {
  content: React.ReactNode;
  category: string;
};

export default function StockTag({ content, category }: Props) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#7779FF] text-white ">
      <p className=" text-sm font-ptb ">{content}</p>
      <p className=" text-sm font-ptr">{category}</p>
    </div>
  );
}
