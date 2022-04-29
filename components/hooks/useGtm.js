import { useRouter } from "next/router";
import { useState } from "react";
import TagManager from "react-gtm-module";

const data1 = {};

export const useGtm = (data = data1) => {
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

  const onClick = () => {
    checkToggle();
    const gtmArgs = {
      dataLayer: data,
    };
    if (!isSent) {
      waitForFbq(() => {
        TagManager.dataLayer(gtmArgs);
      });
    }
  };
  return onClick;
};
