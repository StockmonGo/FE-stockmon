import Avatar from "boring-avatars";
import { ITraveler } from "@/types/member";

type Props = {
  alliance: ITraveler;
  onClickAliance: (travelerId: number) => void;
  selected: boolean;
};

export default function ExchangeAllianceItem({
  alliance,
  onClickAliance,
  selected,
}: Props) {
  return (
    <div
      className={`w-full flex py-2 items-center gap-2 ${
        selected && "bg-stock-lemon-300"
      } overflow-y-hidden`}
      onClick={() => onClickAliance(alliance.travelerId)}
    >
      <Avatar name={alliance.nickname} variant="beam" />
      <p>{alliance.nickname}</p>
    </div>
  );
}
