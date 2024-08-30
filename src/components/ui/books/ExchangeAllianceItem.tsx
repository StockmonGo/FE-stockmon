import Avatar from "boring-avatars";

type Props = {
  nickname: string;
};

export default function ExchangeAllianceItem({ nickname }: Props) {
  return (
    <div className="w-full flex items-center gap-2">
      <Avatar name={nickname} variant="beam" />
      <p>{nickname}</p>
    </div>
  );
}
