import { useGtm } from "./useGtm";
import { throttle } from "throttle-debounce";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useGtmScroll = () => {
  const gtmScrollLevel0 = useGtm({
    event: "ScrollTracking",
    eventModel: {
      num_items: 0,
    },
  });
  const gtmScrollLevel25 = useGtm({
    event: "ScrollTracking",
    eventModel: {
      num_items: 25,
    },
  });
  const gtmScrollLevel50 = useGtm({
    event: "ScrollTracking",
    eventModel: {
      num_items: 50,
    },
  });
  const gtmScrollLevel75 = useGtm({
    event: "ScrollTracking",
    eventModel: {
      num_items: 75,
    },
  });
  const gtmScrollLevel90 = useGtm({
    event: "ScrollTracking",
    eventModel: {
      num_items: 90,
    },
  });

  const router = useRouter();

  const [scrollDepth, setscrollDepth] = useState(-1);
  const scrollYCheck = () => {
    router.events.on("routeChangeComplete", () => {
      setscrollDepth(-1);
    });
    const scrollPercent = Math.round(
      (window.scrollY / document.body.scrollHeight) * 100
    );
    if (scrollPercent < 25) {
      setscrollDepth(0);
    } else if (scrollPercent < 50) {
      setscrollDepth(25);
    } else if (scrollPercent < 75) {
      setscrollDepth(50);
    } else if (scrollPercent < 90) {
      setscrollDepth(75);
    } else if (scrollPercent < 100) {
      setscrollDepth(90);
    }
  };

  useEffect(() => {
    if (scrollDepth === 0) {
      gtmScrollLevel0();
    } else if (scrollDepth === 25) {
      gtmScrollLevel25();
    } else if (scrollDepth === 50) {
      gtmScrollLevel50();
    } else if (scrollDepth === 75) {
      gtmScrollLevel75();
    } else if (scrollDepth === 90) {
      gtmScrollLevel90();
    }
  }, [scrollDepth]);

  const throttleScrollYCheck = throttle(200, scrollYCheck);
  useEffect(() => {
    window.addEventListener("scroll", throttleScrollYCheck);
    return () => window.removeEventListener("scroll", throttleScrollYCheck);
  }, []);
};
