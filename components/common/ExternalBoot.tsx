import { useEffect } from "react";
import ChannelService from "./ChannelService";
import { v1 } from "uuid";
import { useGtmScroll } from "../hooks/useGtmScroll";
import TagManager from "react-gtm-module";

export const LOCAL_SAVED_MEMVER_ID = "localSavedMemberId";

export default function App() {
  //채널톡 부트
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

  //태그매니저 부트
  useEffect(() => {
    const prodGtmId = "GTM-WTBKCZ8";
    const testGtmId = "GTM-MJD569B";
    const tagManagerArgs = {
      gtmId: process.env.NODE_ENV === "production" ? prodGtmId : testGtmId,
    };
    const asyncEffect = async () => {
      TagManager.initialize(tagManagerArgs);
    };
    asyncEffect();
    return () => {};
  }, []);
  useGtmScroll();

  return <></>;
}
