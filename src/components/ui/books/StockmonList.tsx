import React from "react";

type StockmonItem = {
  id: number;
  name: string;
  imgUrl: string;
  count: number;
  stockCode: number;
  stockAveragePrice: number;
};

type Props =
  | { isLoading: true; stockmons?: never }
  | { isLoading?: false; stockmons: StockmonItem[] };

export default function StockmonList({ isLoading, stockmons }: Props) {
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (stockmons.length == 0) {
    return (
      <div className="w-full h-full flex justify-center items-center text-stock-dark-400 text-lg">
        스톡몬을 잡고 도감을 채워보세요!
      </div>
    );
  }

  return (
    <ul>
      {stockmons.map((stockmon) => (
        <li key={stockmon.id}>
          <a href={`/books/${stockmon.id}`}>{stockmon.name}</a>
        </li>
      ))}
    </ul>
  );
}
