import { AiOutlineLoading } from "react-icons/ai";
import ExchangeAllianceList from "./ExchangeAllianceList";
import dummyAlliances from "@/../dummy/alliance/alliances.json";

type Props = {
  open: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
export default function StockmonExchangeModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  isDisabled = false,
}: Props) {
  const alliances = dummyAlliances.data.alliances;
  return (
    open && (
      <div
        className="fixed inset-0 bg-stock-dark-950 bg-opacity-20 flex justify-center items-center z-50 px-6"
        onClick={onClose}
      >
        <div
          className="flex flex-col gap-4 justify-center items-center bg-white p-4 w-full rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="w-full py-3 flex flex-col gap-2 text-center text-stock-blue-950 bg-white  rounded-lg">
            <h2 className="font-ptb text-lg">스톡몬 교환</h2>
            <p className="font-ptr text-sm">스톡몬을 받을 모험가를 선택하세요.</p>
          </header>
          {isLoading && <AiOutlineLoading className="animate-spin m-auto" color={"white"} />}
          {!isLoading && <ExchangeAllianceList alliances={alliances} />}
          <footer className="flex justify-center gap-16">
            <button onClick={onClose}>
              <img src="/icons/button-close.svg" alt="close" />
            </button>
            <button onClick={onConfirm} disabled={isDisabled || isLoading}>
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
