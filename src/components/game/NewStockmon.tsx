"use client";
import React, { useEffect } from "react";

export default function NewStockmon() {
  const data = {
    stockmonId: 1,
    stockmonName: "fs",
    description: "dd",
  };

  return (
    <article className="w-full p-5 font-ptb text-lg bg-border-custom-dotted bg-stock-blue-200">
      <figure className="aspect-square flex flex-col justify-between gap- p-5 bg-[url('/images/bgStamp.svg')] bg-no-repeat bg-cover">
        <p className="text-stock-dark-300">No.{}</p>
        <img
          className={`w-2/3 mx-auto ${"gelatine"}`}
          src={`${process.env.NEXT_PUBLIC_S3_URL}/${data.stockmonId}.png`}
          alt={data.stockmonName}
        />
        <div className="relative text-right">
          <button
            className="p-2 px-3 rounded-lg text-stock-dark-500 bg-somsatang-gradient"
            onClick={() => {}}
          >
            x{1}
          </button>
        </div>
      </figure>
      <figcaption className="relative mt-10 p-4 rounded-lg bg-yellow-50">
        <img
          className="absolute w-full max-h-10 inset-0 scale-[1.2] -top-7 z-1"
          src="/images/ribbon.png"
          alt="ribbon"
        />
        <p className="absolute w-full flex justify-center left-0 -top-6 z-1 text-lg text-white">
          {data.stockmonName}
        </p>
        <div className="pt-2 font-ptr text-base text-stock-dark-400">
          {data.description}
        </div>
      </figcaption>
    </article>
  );
}
