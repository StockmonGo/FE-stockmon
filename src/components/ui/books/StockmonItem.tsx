import { COLLECTION_MAX, IStockmonRes } from "@/types/stockmons";
import { useRouter } from "next/navigation";
import React from "react";
import { Skeleton } from "../Skeleton";
import NewPoint from "../NewPoint";

type Props = {
  stockmon: IStockmonRes;
};

export default function StockmonItem({ stockmon }: Props) {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/books/${stockmon.id}`);
  };

  return (
    <li className=" w-full bg-stock-purple" onClick={handleOnClick}>
      {stockmon ? (
        <div className="relative ">
          {stockmon.catchCount >= COLLECTION_MAX && <NewPoint />}
          <img
            className="w-full bg-white"
            src={`${process.env.NEXT_PUBLIC_S3_URL}/${stockmon.id}.png`}
          />
          <p className="p-2 text-center text-white font-ptr">{stockmon.name}</p>
        </div>
      ) : (
        <Skeleton className="w-full h-44" />
      )}
    </li>
  );
}
