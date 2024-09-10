"use client";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import memberAPI from "@/apis/memberAPI";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import useToast from "@/hooks/useToast";

type Props = {
  accountNumber?: string;
};
export default function UserMenu({ accountNumber }: Props) {
  const [accountModalSee, setAccountModalSee] = useState(false);
  const [infoModalSee, setInfoModalSee] = useState(false);
  const [withdrawModalSee, setWithdrawModalSee] = useState(false);
  const [getStockModalSee, setGetStockModalSee] = useState({
    stockName: "",
    stockmonId: -1,
    stockCode: "",
    isOpen: false,
  });
  const searchParams = useSearchParams();
  const isCreate = searchParams!.get("create") as string;
  const service = new memberAPI();
  const { SuccessToast, ErrorToast } = useToast();
  const { data } = useSWR("account", () => {
    return service.getAccountStatus();
  });
  const { data: stocks } = useSWR("stocks", () => {
    return service.getStocks();
  });
  const router = useRouter();
  const { signOut, withdraw } = useAuth();
  const onAccountClose = () => {
    setAccountModalSee(false);
  };
  const onInfoClose = () => {
    setInfoModalSee(false);
  };
  const onWithdrawClose = () => {
    setWithdrawModalSee(false);
  };
  const createAccount = async () => {
    try {
      const res = await service.createAccount();
      if (res) {
        onAccountClose();
        SuccessToast("계좌 생성 성공!");
        openStockModal(res.stockName, res.stockId, res.stockCode);
      }
    } catch (error) {
      ErrorToast("계좌 생성에 실패했어요.");
      onAccountClose();
    } finally {
      mutate("account");
      mutate("stocks");
    }
  };
  const getAccountInfo = () => {
    if (!data?.hasAccount) {
      return setAccountModalSee(true);
    }
    setInfoModalSee(true);
    console.log("주식 뭘 얻었냐면용");
  };
  const accountWithdraw = () => {
    withdraw().then((res) => {
      console.log(res);
      if (res.result === "success") {
        SuccessToast("탈퇴했습니다.");
        router.replace("/users/register");
      } else {
        //TODO: 에러. 탈퇴실패!
        ErrorToast("탈퇴 실패했어요.");
      }
    });
  };

  const menuItems = [
    {
      text: "계좌 정보 조회",
      onClick: getAccountInfo,
    },
    {
      text: "설정",
      onClick: () => {},
    },
    {
      text: "로그아웃",
      onClick: () => {
        signOut()
          .then(() => {
            SuccessToast("로그아웃 되었습니다.");
          })
          .catch(() => {
            ErrorToast("로그아웃을 실패했어요.");
          })
          .finally(() => {
            router.push("/users/login");
          });
      },
    },
    {
      text: "회원탈퇴",
      onClick: () => {
        setWithdrawModalSee(true);
      },
    },
  ];

  const openStockModal = (
    stockName: string,
    stockmonId: number,
    stockCode: string
  ) => {
    setGetStockModalSee({
      stockCode,
      stockmonId,
      stockName,
      isOpen: true,
    });
  };
  const closeStockModal = () => {
    setGetStockModalSee({
      stockCode: "",
      stockmonId: -1,
      stockName: "",
      isOpen: false,
    });
  };
  useEffect(() => {
    if (isCreate == "true" && data?.hasAccount === false) {
      getAccountInfo();
    }
  }, [isCreate, data]);
  return (
    <div className="w-full h-fit bg-white/40 rounded-lg p-3">
      {menuItems.map((item, index) => (
        <p
          key={index}
          className={`font-ptr text-lg cursor-pointer p-3 ${
            item.text === "회원탈퇴" && "text-stock-dark-300"
          }`}
          onClick={item.onClick}
        >
          {item.text}
        </p>
      ))}
      <Modal
        onClose={onAccountClose}
        open={accountModalSee}
        title="계좌가 아직 없어요"
        describe="계좌를 생성하고 주식을 받으세요 :)"
        onConfirm={createAccount}
        hasClose={true}
      ></Modal>
      <Modal
        onClose={closeStockModal}
        open={getStockModalSee.isOpen}
        title="계좌 생성 완료!"
        onConfirm={closeStockModal}
      >
        <div className="flex flex-col items-center text-center break-all">
          <img
            width={120}
            height={120}
            alt={"주식"}
            src={`${process.env.NEXT_PUBLIC_S3_URL}/${getStockModalSee.stockmonId}.png`}
          />
          <p className="text-center text-sm text-slate-600">
            No.{getStockModalSee.stockCode}
          </p>
          <p className="mt-2">
            <span className="text-stock-blue-900 font-ptb">
              {getStockModalSee.stockName}몬
            </span>
            {`이 해당 주식을 1주 선물했어요.`}
          </p>
          <p>계속해서 스톡몬을 모아 대왕스톡몬에게 돌려보내주세요!</p>
        </div>
      </Modal>
      <Modal
        onClose={onInfoClose}
        open={infoModalSee}
        title="연동된 계좌"
        describe={accountNumber}
      >
        <p className="text-stock-slate-900 font-ptb text-start w-full px-2">
          획득 주식 내역
        </p>
        {stocks && (
          <div className="bg-slate-50 w-full rounded-md p-2 max-h-44 overflow-scroll px-4">
            {stocks.stocks.map((stock, idx) => {
              return (
                <div
                  key={stock.stockId + stock.stockCount}
                  className={`pb-1 flex flex-row justify-between ${
                    idx !== 0 && " border-t border-slate-300 border-soli"
                  }`}
                >
                  <span>{stock.stockName}</span>
                  <span>{stock.stockCount}주</span>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
      <Modal
        onClose={onWithdrawClose}
        open={withdrawModalSee}
        title="회원 탈퇴"
        describe="정말로 탈퇴하시겠습니까?"
        onConfirm={accountWithdraw}
        hasClose={true}
      />
    </div>
  );
}
