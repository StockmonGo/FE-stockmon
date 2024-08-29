"use client";
import Button from "@/components/ui/Button";
import * as React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  nickname: string;
  password1: string;
  password2: string;
  inviter: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    getValues,
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => console.log(data));
  const inputCSS = "border rounded-lg px-3 py-2 w-full border-stock-dark-200 my-1";
  const errorCSS = "text-stock-red h-4";

  return (
    <>
      <img src="/images/logo-160x160.png" alt="로고" />
      <form onSubmit={onSubmit} className="grid w-full">
        <div className="bg-white/40 rounded-lg px-2 py-4 space-y-4">
          <div>
            <p>
              닉네임 <span className="text-stock-red">*</span>
            </p>
            <input
              {...register("nickname", { required: "닉네임을 입력해주세요", maxLength: 10 })}
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
              {...register("password1", { required: "비밀번호를 입력해주세요" })}
              placeholder="비밀번호를 입력해주세요"
              type="password"
              className={inputCSS}
            />
            <p className={errorCSS}>{errors?.password1?.message}</p>
          </div>
          <div>
            <p>
              비밀번호 확인 <span className="text-stock-red">*</span>
            </p>
            <input
              {...register("password2", {
                required: "비밀번호를 한번 더 입력해주세요",
                validate: {
                  check: (val) => {
                    if (getValues("password1") !== val) {
                      return "비밀번호가 일치하지 않습니다";
                    }
                  },
                },
              })}
              placeholder="비밀번호를 한번 더 입력해주세요"
              type="password"
              className={inputCSS}
            />
            <p className={errorCSS}>{errors?.password2?.message}</p>
          </div>
          <div>
            <p>초대인 닉네임</p>
            <input
              {...register("inviter", { maxLength: 10 })}
              placeholder="초대한 사람의 닉네임을 입력해주세요"
              className={inputCSS}
            />
          </div>
        </div>
        <div className="w-32 justify-self-center mt-4">
          <Button text="회원가입" onClick={onSubmit} disabled={!isDirty || !isValid} />
        </div>
      </form>
    </>
  );
}
