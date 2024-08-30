import BtnClose from "@/components/ui/BtnClose";
import { randomInt } from "crypto";
import { AiFillHeart } from "react-icons/ai";

export default function Yard() {
  // 스톡목 더미
  const stockmons = [
    {
      id: 1,
      name: "신한지주몬",
      imgUrl: "/images/dummy-stockmon.png",
      isGood: true,
    },
    {
      id: 2,
      name: "하나금융지주몬",
      imgUrl: "/images/dummy-stockmon1.png",
      isGood: false,
    },
    {
      id: 3,
      name: "KB금융지주몬",
      imgUrl: "/images/dummy-stockmon2.png",
      isGood: true,
    },
  ];

  return (
    <div className="w-screen max-w-lg h-screen bg-[url('/images/yardBg.png')] bg-cover bg-no-repeat relative">
      {stockmons.map((item) => {
        const top = randomInt(500) + "px";
        const left = randomInt(300) + "px";

        return (
          <div key={item.id} style={{ top, left }} className="w-fit h-fit absolute grid justify-items-center">
            {item.isGood ? (
              <AiFillHeart size={36} fill="#FF0000" />
            ) : (
              <img src="/icons/depress-feeling.svg" alt="bad" className="w-9" />
            )}
            <img src={item.imgUrl} alt={item.name} className="w-24 h-24" />
          </div>
        );
      })}
      <div className="fixed bottom-6 w-full flex justify-center">
        <BtnClose />
      </div>
    </div>
  );
}
