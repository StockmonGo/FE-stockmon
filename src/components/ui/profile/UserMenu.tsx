type Props = {
  nickname?: string;
};

export default function UserMenu({}: Props) {
  // TODO 각자의 함수 생성하기
  const menuItems = [
    {
      text: "계좌 연결하기",
      onClick: () => {},
    },
    {
      text: "설정",
      onClick: () => {},
    },
    {
      text: "로그아웃",
      onClick: () => {},
    },
    {
      text: "회원탈퇴",
      onClick: () => {},
    },
  ];

  return (
    <div className="w-full h-fit bg-white/40 rounded-lg p-3">
      {menuItems.map((item, index) => (
        <p
          key={index}
          className={`font-ptr text-lg cursor-pointer p-3 ${item.text === "회원탈퇴" && "text-stock-dark-300"}`}
          onClick={item.onClick}
        >
          {item.text}
        </p>
      ))}
    </div>
  );
}
