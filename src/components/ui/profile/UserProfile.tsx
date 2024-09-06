import Avatar from "boring-avatars";
import { BsPersonCircle } from "react-icons/bs";

type Props = {
  nickname?: string;
};

export default function UserProfile({ nickname }: Props) {
  return (
    <div className="w-full h-fit bg-stock-blue-200 bg-border-custom-dotted rounded-lg p-3">
      <div className="w-full bg-stock-lemon-50 flex flex-col items-center p-6 gap-2">
        <Avatar name={nickname} variant="beam" size={100} />
        <p className="font-ptb text-stock-blue-300 text-lg">환영합니다</p>
        <p className="font-ptb text-lg">{nickname}</p>
      </div>
    </div>
  );
}
