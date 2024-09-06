import React from "react";
import BtnClose from "./BtnClose";
import Twinkle from "./Twinkle";

type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  useButton?: boolean;
  routeUrl?: string;
};
export default function CommonLayout({
  children,
  header,
  title,
  useButton = true,
  routeUrl,
}: Props) {
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-scroll">
      <div className="fixed w-full h-full overflow-hidden z-0">
        <div
          className="bg-cover bg-center w-full h-full fixed z-[-1]"
          style={{ backgroundImage: "url('/images/bg.jpg')" }}
        ></div>
        <Twinkle />
      </div>
      <div className="p-6 max-w-xl w-xl h-screen relative z-1 m-auto flex flex-col items-center justify-between gap-6">
        {header && (
          <header className="w-full">
            <h2 className="text-center text-stock-dark-800 text-xl font-bold py-2">
              {title}
            </h2>
            {header}
          </header>
        )}
        <main className="flex-1 w-full h-full overflow-scroll">{children}</main>
        {useButton && (
          <footer className="w-full flex justify-center">
            <BtnClose routeUrl={routeUrl} />
          </footer>
        )}
      </div>
    </div>
  );
}
