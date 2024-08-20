import Button from "@/components/ui/Button";
import React from "react";
import DevContainer from "@/components/dev/DevContainer";
export default function UI() {
  return (
    <div>
      <DevContainer title="버튼">
        <div className="button-container w-5/12">
          <Button />
        </div>
      </DevContainer>
    </div>
  );
}
