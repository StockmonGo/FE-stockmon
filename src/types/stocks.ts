import { AiFillBank } from "react-icons/ai";
import { FaBeer } from "react-icons/fa";

export type StockIconType = {
  [key: number]: React.ComponentType<{ size?: number }>;
};

export const STOCK_ICONS: StockIconType = {
  1: AiFillBank,
  2: FaBeer,
  3: FaBeer,
  4: FaBeer,
  5: FaBeer,
  6: FaBeer,
  7: FaBeer,
  8: FaBeer,
  9: FaBeer,
};
