import Button from "./ui/Button";

type Props = {
  handleInstallClick: () => void;
  handleCancelClick: () => void;
  platform: "ios" | "android";
};

export default function MobileInstallPrompt({ handleInstallClick, handleCancelClick, platform }: Props) {
  return (
    <div className="fixed bottom-0 left-0 w-screen max-w-xl h-fit max-h-60 bg-white z-50 grid justify-items-center p-3">
      <div className="flex space-x-3 items-center">
        <img src="/images/logo-96x96.png" alt="로고" className="w-20 h-20" />
        <div>
          <p className="font-bold text-lg">StockmonWorld</p>
          <p className="font-bold break-words">StockmonWorld는 앱에서 원활히 사용할 수 있습니다.</p>
        </div>
      </div>
      <div className="w-1/2 mt-4">
        <Button onClick={handleInstallClick} text="홈 화면에 추가" />
      </div>
      <p onClick={handleCancelClick}>괜찮습니다 모바일 웹으로 보겠습니다</p>
    </div>
  );
}
