"use client";
import { AiOutlineLoading } from "react-icons/ai";
import ExchangeAllianceList from "./ExchangeAllianceList";
import { useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import { ITraveler } from "@/types/member";
import allianceAPI from "@/apis/allianceAPI";
import useAlliance from "@/hooks/useAlliance";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

type Props = {
  open: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onClickAliance: (travelerId: number) => void;
  selectedAlliance: number;
};
export default function StockmonExchangeModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  onClickAliance,
  selectedAlliance,
}: Props) {
  const router = useRouter();
  const [alliances, setAlliances] = useState<ITraveler[]>();
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const [allianceModalOpen, setAllianceModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const { ErrorToast } = useToast();

  useEffect(() => {
    if (open) {
      const getAlliancesApi = async () => {
        setLoadingModalOpen(true);
        const res = await getAlliances();

        setLoadingModalOpen(false);
        if (res) {
          setAlliances(res);
          if (res.length === 0) {
            setAllianceModalOpen(true);
          } else {
            setListModalOpen(true);
          }
        } else {
          ErrorToast("동맹 관계를 조회할 수 없습니다.");
        }
      };
      getAlliancesApi();
    }
  }, [open]);

  return (
    open && (
      <>
        <Modal
          describe="로딩중"
          open={loadingModalOpen}
          onClose={() => {
            setLoadingModalOpen(false);
            onClose();
          }}
          isLoading
        ></Modal>

        <Modal
          describe="다른 모험가와 동맹을 맺고 스톡몬을 교환하시겠습니까?"
          open={allianceModalOpen}
          onClose={() => {
            setAllianceModalOpen(false);
            onClose();
          }}
          onConfirm={() => {
            setAllianceModalOpen(false);
            onClose();
            router.push("/alliances");
          }}
          hasClose
        ></Modal>

        {listModalOpen && (
          <div
            className="fixed inset-0 bg-stock-dark-950 bg-opacity-20 flex justify-center items-center z-50 px-6"
            onClick={() => {
              setListModalOpen(false);
              onClose();
            }}
          >
            <div
              className="flex flex-col gap-4 justify-between items-center bg-white p-4 w-full rounded-lg h-3/5"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="w-full py-3 flex flex-col gap-2 text-center text-stock-blue-950 bg-white rounded-lg">
                <h2 className="font-ptb text-lg">스톡몬 교환</h2>
                <p className="font-ptr text-sm">
                  스톡몬을 받을 모험가를 선택하세요.
                </p>
              </header>
              {isLoading && (
                <AiOutlineLoading
                  className="animate-spin m-auto"
                  color={"white"}
                />
              )}
              {!isLoading && alliances && (
                <ExchangeAllianceList
                  alliances={alliances}
                  onClickAliance={onClickAliance}
                  selectedAlliance={0}
                />
              )}
              <footer className="flex justify-center gap-16">
                <button onClick={onClose}>
                  <img src="/icons/button-close.svg" alt="close" />
                </button>
                <button
                  onClick={onConfirm}
                  disabled={selectedAlliance == 0 || isLoading}
                >
                  {selectedAlliance == 0 || isLoading ? (
                    <img src="/icons/button-ok-off.svg" alt="ok-off" />
                  ) : (
                    <img src="/icons/button-ok-on.svg" alt="ok-on" />
                  )}
                </button>
              </footer>
            </div>
          </div>
        )}
      </>
    )
  );
}
function getAlliances() {
  throw new Error("Function not implemented.");
}
