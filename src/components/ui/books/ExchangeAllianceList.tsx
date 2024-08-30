import { ITraveler } from "../alliance/AllianceItem";
import ExchangeAllianceItem from "./ExchangeAllianceItem";

type Props = {
  alliances: Array<ITraveler>;
};
export default function ExchangeAllianceList({ alliances }: Props) {
  return (
    <div className="w-full aspect-square overflow-y-scroll bg-border-custom-dotted bg-stock-lemon-50 p-6 space-y-3">
      {alliances.map((alliance) => (
        <ExchangeAllianceItem nickname={alliance.nickname} key={alliance.travelerId} />
      ))}
    </div>
  );
}
