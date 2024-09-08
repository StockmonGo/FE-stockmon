import { Fragment, useEffect, useState } from "react";
import { BeforeInstallPromptEvent } from "@/types/window";
import MobileInstallPrompt from "./MobileInstallPrompt";

const defaultBeforeInstallPromptEvent: BeforeInstallPromptEvent = {
  platforms: [],
  userChoice: Promise.resolve({ outcome: "dismissed", platform: "" }),
  preventDefault: () => {},
  prompt: () => Promise.resolve(),
};

const isIOSPromptActive = () => {
  const isActive = JSON.parse(localStorage.getItem("iosInstalled") || "true");
  if (isActive) {
    return defaultBeforeInstallPromptEvent;
  }
  return null;
};

export default function BeforeInstallPrompt() {
  // 기기 파악
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    isDeviceIOS ? isIOSPromptActive() : null
  );

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  const handleCancelClick = () => {
    localStorage.setItem("iosInstalled", "false");
    setDeferredPrompt(null);
  };

  const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(window.navigator.userAgent);
    if (isMobile) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      }
    };
  }, []);

  return (
    <Fragment>
      {deferredPrompt && (
        <MobileInstallPrompt
          handleInstallClick={handleInstallClick}
          handleCancelClick={handleCancelClick}
          platform={isDeviceIOS ? "ios" : "android"}
        />
      )}
    </Fragment>
  );
}
