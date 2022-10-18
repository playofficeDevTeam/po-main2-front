import { useEffect } from "react";
import ChannelService from "./ChannelService";
import { useGtmScroll } from "../hooks/useGtmScroll";
import TagManager from "react-gtm-module";
import { useRouter } from "next/router";

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
  const router = useRouter();
  useEffect(() => {
    const prodPixelId = process.env.NEXT_PUBLIC_PIXEL_ID || "";
    const testPixelId = process.env.NEXT_PUBLIC_PIXEL_ID || "";
    const pixelId =
      process.env.NODE_ENV === "production" ? prodPixelId : testPixelId;

    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(pixelId); // facebookPixelId
        ReactPixel.pageView();

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);
  return <></>;
}
