import React, { PropsWithoutRef } from "react";

type VARIANT = "blue" | "white";

type Props = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};
export default function Modal({ open, onClose, children }: Props) {
  return (
    open && (
      <div
        className="fixed inset-0 bg-stock-dark-950 bg-opacity-20 flex justify-center items-center z-50"
        // onClick={onClose}
      >
        <div className=" flex flex-col gap-4 bg-gradient-to-b from-[#F9F0FF] to-[#E8F7FF] p-4 min-w-[360px] rounded-lg">
          <header className="lex flex-col gap-2 py-3 bg-white text-center rounded-lg">
            <h2 className=" font-bold">제목</h2>
            <p className="text-sm">내용</p>
          </header>
          {children && children}
          <footer className="flex justify-center gap-16">
            <button onClick={onClose}>
              <img src="/icons/ButtonCloseActiveOn.svg" alt="close" />
            </button>
            <button onClick={onClose}>
              <img src="/icons/ButtonOkActiveOn.svg" alt="ok" />
            </button>
          </footer>
        </div>
      </div>
    )
  );
}
