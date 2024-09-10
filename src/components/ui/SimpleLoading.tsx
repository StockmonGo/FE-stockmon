import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function SimpleLoading() {
  return (
    <div
      className="p-6 pb-24 overflow-scroll bg-cover bg-center w-full h-full fixed z-[-1]"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="max-w-xl w-xl h-screen mx-auto">
        <div className="fixed left-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              {
                <AiOutlineLoading
                  className="animate-spin m-auto"
                  color={"gray"}
                />
              }
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
