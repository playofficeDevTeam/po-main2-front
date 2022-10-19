import { useEffect } from "react";
import ChannelService from "./ChannelService";
import { useGtmScroll } from "../hooks/useGtmScroll";
import TagManager from "react-gtm-module";
import { useRouter } from "next/router";
import useConversionApi from "../hooks/useConversionApi";
import Script from "next/script";
import { v1 } from "uuid";
import setFbCookies from "set-fb-cookies";

export const LOCAL_SAVED_MEMVER_ID = "localSavedMemberId";

export default function App() {
  //채널톡 부팅
  useEffect(() => {
    const channelTalk = new ChannelService();
    channelTalk.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
      memberId: window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID),
    });
    return () => {
      channelTalk.shutdown();
    };
  }, []);

  //태그매니저 부팅
  useEffect(() => {
    const prodGtmId = "GTM-WTBKCZ8";
    const testGtmId = "GTM-MJD569B";
    const tagManagerArgs = {
      gtmId: process.env.NODE_ENV === "production" ? prodGtmId : testGtmId,
    };
    const asyncEffect = async () => {
      TagManager.initialize(tagManagerArgs);
    };
    if (process.env.NODE_ENV === "production") {
      asyncEffect();
    }
  }, []);
  useGtmScroll();

  //픽셀 부팅
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID || "";
  const router = useRouter();
  const conversionApiMutation = useConversionApi();

  //픽셀 첫 부팅
  useEffect(() => {
    // fb 쿠키 생성용으로 이벤트 한번 발생 시켜야함
    (window as any).fbq("track", "PageView", { test: "testpageview" });
    console.log("픽셀 첫 부팅");
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      conversionApiMutation({
        event_name: "PageView",
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* 픽셀 부팅 */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${pixelId});
          `,
        }}
      />
    </>
  );
}
