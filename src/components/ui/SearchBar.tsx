import React from "react";
import { BsSearch } from "react-icons/bs";

type Props = {
  placeholder: string;
};

export default function SearchBar({ placeholder }: Props) {
  return (
    <div className="w-full p-3 flex justify-center items-center rounded-lg bg-white border border-1 border-stock-dark-200">
      <BsSearch className="w-6 h-6 m-1 text-stock-dark-300" />
      <input
        className="w-full px-2 font-ptr"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
