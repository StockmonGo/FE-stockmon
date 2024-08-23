import { BsPersonCircle } from "react-icons/bs";
import NavButton from "./NavButton";

export default function BottomNavBar() {
  return (
    <div className="w-screen max-w-xl min-h-16">
      <NavButton onClick={() => {}}>
        <BsPersonCircle />
      </NavButton>
    </div>
  );
}
