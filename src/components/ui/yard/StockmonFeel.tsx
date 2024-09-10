"use client";
import { IStockmonFeel, IStockmonRes } from "@/types/stockmons";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";

type Props = {
  stockmon: IStockmonFeel;
};

export default function StockmonFeel({ stockmon }: Props) {
  const router = useRouter();
  return (
    <>
      {stockmon.good ? (
        <AiFillHeart size={36} fill="#FF0000" />
      ) : (
        <img src="/icons/depress-feeling.svg" alt="bad" className="w-9" />
      )}
      <img
        src={`${process.env.NEXT_PUBLIC_S3_URL}/${stockmon.id}.png`}
        className="w-24 h-24"
        onClick={() => router.push(`/books/${stockmon.id}`)}
      />
    </>
  );
}
