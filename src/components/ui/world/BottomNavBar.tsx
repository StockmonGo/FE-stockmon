import { BsPersonCircle } from "react-icons/bs";
import { BsBackpack } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";
import NavButton from "./NavButton";

export default function BottomNavBar() {
  return (
    <div className="w-screen max-w-xl min-h-16">
      <NavButton type="profile">
        <BsPersonCircle />
      </NavButton>
      <NavButton type="books">
        <BsBackpack />
      </NavButton>
      <NavButton type="alliances">
        <IoPeopleCircleOutline />
      </NavButton>
    </div>
  );
}
