import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  open: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  hasClose?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
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
  onConfirm = onClose,
  children,
  title,
  describe,
}: Props) {
  return (
    open && (
      <div
        className="fixed inset-0 bg-stock-dark-950 bg-opacity-20 flex justify-center items-center z-50 px-6"
        onClick={onClose}
      >
        <div
          className="flex flex-col gap-4 max-w-xl justify-center items-center bg-somsatang-gradient p-4 w-full rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading && (
            <>
              <AiOutlineLoading
                className="animate-spin m-auto"
                color={"gray"}
              />
              <p className="font-ptr text-sm text-stock-dark-400">로딩중</p>
            </>
          )}
          {!isLoading && (
            <>
              <header className="w-full p-3 flex flex-col gap-2 text-center text-stock-blue-950 bg-white rounded-lg break-keep">
                {title && <h2 className="font-ptb text-lg">{title}</h2>}
                {describe && (
                  <p className="font-ptr text-sm w-full break-keep">
                    {describe}
                  </p>
                )}
              </header>

              {children}
              <footer className="flex justify-center gap-16">
                {hasClose && (
                  <button onClick={onClose}>
                    <img src="/icons/button-close.svg" alt="close" />
                  </button>
                )}
                <button onClick={onConfirm} disabled={isDisabled || isLoading}>
                  {isDisabled || isLoading ? (
                    <img src="/icons/button-ok-off.svg" alt="ok-off" />
                  ) : (
                    <img src="/icons/button-ok-on.svg" alt="ok-on" />
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
