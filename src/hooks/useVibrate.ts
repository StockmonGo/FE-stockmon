import React from "react";

export default function useVibrate() {
  // [200,100,200] : 200ms 진동, 100ms 쉬기, 200ms 진동
  const vibrate = (pattern: Array<number>) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };
  return { vibrate };
}
