import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  open: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  hasClose?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};
export default function Modal({
  open,
  isLoading = false,
  isDisabled = false,
  hasClose = false,
  onClose,
  children,
}: Props) {
  return (
    open && (
      <div
        className="fixed inset-0 bg-stock-dark-950 bg-opacity-20 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="flex flex-col gap-4 justify-center items-center bg-gradient-to-b from-[#F9F0FF] to-[#E8F7FF] p-4 min-w-[360px] rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading && (
            <AiOutlineLoading className="animate-spin m-auto" color={"white"} />
          )}
          {!isLoading && (
            <>
              <header className="w-full flex flex-col gap-2 py-3 bg-white text-center rounded-lg">
                <h2 className="text-lg font-ptb">제목</h2>
                <p>내용</p>
              </header>
              {children && children}
              <footer className="flex justify-center gap-16">
                {hasClose && (
                  <button onClick={onClose}>
                    <img src="/icons/ButtonCloseActiveOn.svg" alt="close" />
                  </button>
                )}
                <button onClick={onClose} disabled={isDisabled}>
                  {isDisabled ? (
                    <img src="/icons/ButtonOkActiveOff.svg" alt="ok-off" />
                  ) : (
                    <img src="/icons/ButtonOkActiveOn.svg" alt="ok-on" />
                  )}
                </button>
              </footer>
            </>
          )}
        </div>
      </div>
    )
  );
}
