import { useRouter } from "next/router";
import { useState } from "react";
import TagManager from "react-gtm-module";

const defaultInput = {};

export const useGtm = (input = defaultInput) => {
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();
  const checkToggle = () => {
    setIsSent(true);
    router.events.on("routeChangeComplete", () => {
      setIsSent(false);
    });
  };

  function waitForFbq(callback) {
    if (typeof window.fbq !== "undefined") {
      callback();
    } else {
      setTimeout(function () {
        waitForFbq(callback);
      }, 100);
    }
  }

  const onClick = (dataLayer) => {
    checkToggle();
    const gtmArgs = {
      dataLayer: dataLayer ?? input,
    };
    if (!isSent) {
      waitForFbq(() => {
        setTimeout(() => {
          TagManager.dataLayer(gtmArgs);
        }, 100);
      });
    }
  };
  return onClick;
};
