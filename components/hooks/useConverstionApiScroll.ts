import { throttle } from "throttle-debounce";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useConversionApi from "./useConversionApi";

export const useConverstionApiScroll = () => {
  const router = useRouter();
  const conversionApiMutation = useConversionApi();

  const [scrollDepth, setscrollDepth] = useState(-1);
  const scrollYCheck = () => {
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

  //스크롤0 트리거 스테이트
  const [scroll0, setscroll0] = useState(false);
  //스크롤25 트리거 스테이트
  const [scroll25, setscroll25] = useState(false);
  //스크롤50 트리거 스테이트
  const [scroll50, setscroll50] = useState(false);
  //스크롤75 트리거 스테이트
  const [scroll75, setscroll75] = useState(false);
  //스크롤90 트리거 스테이트
  const [scroll90, setscroll90] = useState(false);

  useEffect(() => {
    if (scrollDepth === 0) {
      setscroll0(true);
    } else if (scrollDepth === 25) {
      if (!scroll25) {
        conversionApiMutation({
          event_name: "ScrollTracking",
          custom_data_num_items: 25,
        });
        setscroll25(true);
      }
    } else if (scrollDepth === 50) {
      if (!scroll50) {
        conversionApiMutation({
          event_name: "ScrollTracking",
          custom_data_num_items: 50,
        });
        setscroll50(true);
      }
    } else if (scrollDepth === 75) {
      if (!scroll75) {
        conversionApiMutation({
          event_name: "ScrollTracking",
          custom_data_num_items: 75,
        });
        setscroll75(true);
      }
    } else if (scrollDepth === 90) {
      if (!scroll90) {
        conversionApiMutation({
          event_name: "ScrollTracking",
          custom_data_num_items: 90,
        });
        setscroll90(true);
      }
    }
  }, [scrollDepth]);

  const throttleScrollYCheck = throttle(200, scrollYCheck);

  useEffect(() => {
    window.addEventListener("scroll", throttleScrollYCheck);
    return () => window.removeEventListener("scroll", throttleScrollYCheck);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setscrollDepth(-1);
      //스크롤 트리거 리셋
      setscroll0(false);
      setscroll25(false);
      setscroll50(false);
      setscroll75(false);
      setscroll90(false);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
};
