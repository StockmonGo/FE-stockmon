import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiSolidBell } from "react-icons/bi";

type Props = {
  stockballs: number;
};

export default function TopNavBar({ stockballs }: Props) {
  const router = useRouter();
  return (
    <div className="flex w-screen max-w-xl h-fit absolute top-0 left-0 z-10 items-end justify-end p-2 space-x-1">
      <div className="relative flex items-end min-w-28 justify-end">
        <Image alt="peach" src="/images/peach.svg" width={44} height={44} className="absolute left-[10px]" />
        <div className="bg-white rounded-lg px-2 py-1 h-fit mb-[2px]">
          <p className="font-ptr text-stock-dark-800 leading-5"> {stockballs} / 50</p>
        </div>
      </div>
      <BiSolidBell size={36} color="#FF0C81" onClick={() => router.push("/message")} />
    </div>
  );
}
