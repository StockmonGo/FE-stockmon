import { AiFillBank } from "react-icons/ai";
import { FaBriefcaseMedical, FaTruck } from "react-icons/fa";
import { FaPersonDigging } from "react-icons/fa6";
import { SlChemistry } from "react-icons/sl";
import { GiOpenBook } from "react-icons/gi";
import { GrPersonalComputer } from "react-icons/gr";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { BiSolidHotel } from "react-icons/bi";
export type StockIconType = {
  [key: number]: React.ComponentType<{ size?: number }>;
};

export const STOCK_ICONS: StockIconType = {
  1: AiFillBank,
  2: SlChemistry,
  3: FaBriefcaseMedical,
  4: GiOpenBook,
  5: FaTruck,
  6: FaPersonDigging,
  7: GrPersonalComputer,
  8: PiTelevisionSimpleFill,
  9: BiSolidHotel,
};
