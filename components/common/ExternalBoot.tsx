import { useEffect } from "react";
import ChannelService from "./ChannelService";
import { v1 } from "uuid";
import { useGtmScroll } from "../hooks/useGtmScroll";
import TagManager from "react-gtm-module";

export const LOCAL_SAVED_MEMVER_ID = "localSavedMemberId";

export default function App() {
  //채널톡 부트
  useEffect(() => {
    let memberId;
    let localSavedMemberId = window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID);
    if (localSavedMemberId) {
      memberId = localSavedMemberId;
    } else {
      memberId = v1();
      window.localStorage.setItem(LOCAL_SAVED_MEMVER_ID, memberId);
    }

    const channelTalk = new ChannelService();
    channelTalk.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
      memberId: memberId,
    });
    return () => {
      channelTalk.shutdown();
    };
  }, []);

  //태그매니저 부트
  useGtmScroll();
  const prodGtmId = "GTM-WTBKCZ8";
  const devGtmId = "GTM-TCF867Z";
  const tagManagerArgs = {
    gtmId: process.env.NEXT_PUBLIC_TYPE === "prod" ? prodGtmId : devGtmId,
  };
  useEffect(() => {
    const asyncEffect = async () => {
      TagManager.initialize(tagManagerArgs);
    };
    asyncEffect();
    return () => {};
  }, []);

  return <></>;
}
