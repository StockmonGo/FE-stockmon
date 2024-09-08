import { ITraveler } from "@/types/member";
import ExchangeAllianceItem from "./ExchangeAllianceItem";

type Props = {
  alliances: Array<ITraveler>;
  onClickAliance: (travelerId: number) => void;
  selectedAlliance: number;
};

export default function ExchangeAllianceList({
  alliances,
  onClickAliance,
  selectedAlliance,
}: Props) {
  return (
    <div className="w-full max-h-60 min-h-52 bg-border-custom-dotted bg-stock-lemon-50 p-6 space-y-3">
      <div className="max-h-full overflow-y-scroll">
        {alliances.map((alliance) => (
          <ExchangeAllianceItem
            alliance={alliance}
            key={alliance.travelerId}
            onClickAliance={onClickAliance}
            selected={selectedAlliance == alliance.travelerId}
          />
        ))}
      </div>
    </div>
  );
}
