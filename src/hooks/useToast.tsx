"use client";
import Swal from "sweetalert2";

export default function useToast() {
  const SuccessToast = (message: string = "완료되었습니다.") => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      color: "#424242",
      iconColor: "#56A4FF",
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: message,
    });
  };

  const ErrorToast = (message: string = "에러가 발생하였습니다.") => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      color: "#424242",
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: message,
    });
  };

  return { SuccessToast, ErrorToast };
}
