"use client";
import memberAPI from "@/apis/memberAPI";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tutorial() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const service = new memberAPI();
  const nextStep = () => {
    if (step == 5) {
      router.push("/world");
      return;
    }
    setStep(step + 1);
  };
  const skipTutorial = () => {
    router.push("/world");
  };
  const generateImageUrls = () => {
    const urls: Record<string, string> = {};
    for (let i = 1; i <= 5; i++) {
      urls[i] = `/images/tutorial${i}.svg`;
    }
    return urls;
  };
  const imgs = generateImageUrls();

  useEffect(() => {
    service
      .didTutorial()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-screen h-screen bg-[url('/images/bg.jpg')] relative grid justify-items-center relative">
      <div className="w-full max-w-xl flex justify-between absolute p-4">
        <div className="w-fit h-fit">
          <Button onClick={skipTutorial} text="스킵하기" />
        </div>
        <div className="w-fit h-fit">
          <Button onClick={nextStep} text={step === 5 ? "시작하기" : "다음으로"} />
        </div>
      </div>
      <img src={imgs[step]} className="max-h-screen h-full object-cover" />
    </div>
  );
}
