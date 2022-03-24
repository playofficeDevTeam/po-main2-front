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

  const onClick = () => {
    checkToggle();
    const gtmArgs = {
      dataLayer: data,
    };
    if (!isSent) {
      TagManager.dataLayer(gtmArgs);
    }
  };
  return onClick;
};
