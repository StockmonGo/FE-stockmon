import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};
export default function DevContainer(props: Props) {
  return (
    <div className="py-2 border border-stock-dark-200 rounded-lg px-2">
      <p className="text-lg font-semibold pb-2">{props.title}</p>
      {props.children}
    </div>
  );
}
