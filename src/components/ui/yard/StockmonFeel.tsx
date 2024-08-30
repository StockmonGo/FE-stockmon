"use client";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";

type StockmonFeelType = {
  id: number;
  name: string;
  imgUrl: string;
  isGood: boolean;
};

type Props = {
  stockmon: StockmonFeelType;
};

export default function StockmonFeel({ stockmon }: Props) {
  const router = useRouter();
  return (
    <>
      {stockmon.isGood ? (
        <AiFillHeart size={36} fill="#FF0000" />
      ) : (
        <img src="/icons/depress-feeling.svg" alt="bad" className="w-9" />
      )}
      <img
        src={stockmon.imgUrl}
        alt={stockmon.name}
        className="w-24 h-24"
        onClick={() => router.push(`/books/${stockmon.id}`)}
      />
    </>
  );
}
