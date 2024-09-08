"use client";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/hooks/useAuth";
import { IModal } from "@/types/modal";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  nickname: string;
  password: string;
};
export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    getValues,
    reset,
  } = useForm<FormData>();
  const router = useRouter();
  const { signIn } = useAuth();
  const [modal, setModal] = React.useState<IModal>({
    isOpen: false,
    content: "",
    title: "",
    onClick: () => {},
  });

  const closeModal = () => {
    setModal({
      isOpen: false,
      content: "",
      onClick: () => {},
    });
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn({
        nickname: data.nickname,
        password: data.password,
      });
      if (res) {
        router.push("/world");
      }
    } catch (error: any) {
      console.log("error fail login");
      setModal({
        isOpen: true,
        title: "로그인 실패",
        content: error.toString(),
        onClick: closeModal,
      });
      reset();
    }
  });

  const inputCSS =
    "border rounded-lg px-3 py-2 w-full border-stock-dark-200 my-1";
  const errorCSS = "text-stock-red h-4";

  return (
    <>
      <form onSubmit={onSubmit} className="grid w-full">
        <div className="bg-white/40 rounded-lg px-2 py-4 space-y-4">
          <div>
            <p>
              닉네임 <span className="text-stock-red">*</span>
            </p>
            <input
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
                maxLength: 10,
              })}
              placeholder="닉네임을 입력해주세요(최대 10글자)"
              className={inputCSS}
            />
            <p className={errorCSS}>{errors?.nickname?.message}</p>
          </div>
          <div>
            <p>
              비밀번호 <span className="text-stock-red">*</span>
            </p>
            <input
              {...register("password", { required: "비밀번호를 입력해주세요" })}
              placeholder="비밀번호를 입력해주세요"
              type="password"
              className={inputCSS}
            />
            <p className={errorCSS}>{errors?.password?.message}</p>
          </div>
        </div>
        <div className="justify-self-center mt-4">
          <div className="w-32 m-auto ">
            <Button
              text="로그인"
              onClick={onSubmit}
              disabled={!isDirty || !isValid}
            />
          </div>

          <p className="font-sm text-stock-dark-800 mt-4">
            아직{" "}
            <span className="font-bold text-stock-purple-79 font-ptb">
              Stockmon World
            </span>
            를 사용하고 있지 않으신가요?{"  "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => {
                router.push("/users/register");
              }}
            >
              회원가입
            </span>
          </p>
        </div>
      </form>
      <Modal
        open={modal.isOpen}
        onClose={modal.onClick}
        title={modal.title}
        describe={modal.content}
      />
    </>
  );
}
