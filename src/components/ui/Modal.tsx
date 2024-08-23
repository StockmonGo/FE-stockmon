import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  open: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  hasClose?: boolean;
  onClose: () => void;
  onClickOk?: () => void;
  children?: React.ReactNode;
  title?: string;
  describe?: string;
};

export default function Modal({
  open,
  isLoading = false,
  isDisabled = false,
  hasClose = false,
  onClose,
  onClickOk = onClose,
  children,
  title = "제목",
  describe = "내용",
}: Props) {
  return (
    open && (
      <div
        className="fixed inset-0 bg-stock-dark-950 bg-opacity-20 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="flex flex-col gap-4 justify-center items-center bg-somsatang-gradient p-4 min-w-[360px] rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="w-full py-3 flex flex-col gap-2 text-center text-stock-blue-950 bg-white  rounded-lg">
            {title && <h2 className="font-ptb text-lg">{title}</h2>}
            {describe && <p className="font-ptr text-sm">{describe}</p>}
          </header>
          {isLoading && (
            <AiOutlineLoading className="animate-spin m-auto" color={"white"} />
          )}
          {!isLoading && children && children}
          <footer className="flex justify-center gap-16">
            {hasClose && (
              <button onClick={onClose}>
                <img src="/icons/button-close.svg" alt="close" />
              </button>
            )}
            <button onClick={onClickOk} disabled={isDisabled || isLoading}>
              {isDisabled || isLoading ? (
                <img src="/icons/button-ok-off.svg" alt="ok-off" />
              ) : (
                <img src="/icons/button-ok-on.svg" alt="ok-on" />
              )}
            </button>
          </footer>
        </div>
      </div>
    )
  );
}
