import { BsPersonCircle } from "react-icons/bs";
import { BsBackpack } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";
import NavButton from "./NavButton";

export default function BottomNavBar() {
  return (
    <div className="flex w-screen max-w-xl min-h-16 bg-stock-blue-950 absolute bottom-0 left-0 z-10">
      <NavButton type="profile">
        <BsPersonCircle size={36} color="#E8F7FF" />
      </NavButton>
      <NavButton type="books">
        <BsBackpack size={36} color="#E8F7FF" />
      </NavButton>
      <NavButton type="alliances">
        <IoPeopleCircleOutline size={44} color="#E8F7FF" />
      </NavButton>
    </div>
  );
}
