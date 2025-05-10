import { useEffect, useState } from "react";
import ChannelService from "./ChannelService";
import { useGtmScroll } from "../hooks/useGtmScroll";
import TagManager from "react-gtm-module";
import { useRouter } from "next/router";
import useConversionApi from "../hooks/useConversionApi";
import Script from "next/script";
import { v1 } from "uuid";
import { useConverstionApiScroll } from "../hooks/useConverstionApiScroll";
import { gql, useSubscription } from "@apollo/client";

export const LOCAL_SAVED_MEMVER_ID = "localSavedMemberId";

const GTM_SUB = gql`
  subscription gtmSub($input: GtmSubInput!) {
    gtmSub(input: $input) {
      ok
      error
      event
      eventModel
    }
  }
`;

export default function App() {
  //채널톡 부팅
  useEffect(() => {
    const channelTalk = new ChannelService();
    channelTalk.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
      // 비용 이슈로 처음 시작할때 멤버아이디 제공하지 않음
      // memberId: window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID),
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
      // gtmId: process.env.NODE_ENV === "production" ? prodGtmId : testGtmId,
      gtmId: prodGtmId,
    };
    const asyncEffect = async () => {
      TagManager.initialize(tagManagerArgs);
    };
    asyncEffect();
  }, []);
  useGtmScroll();

  //픽셀 부팅
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID || "";
  const router = useRouter();
  const conversionApiMutation = useConversionApi();

  const [isSend, setIsSend] = useState(false);

  useEffect(() => {
    const event_id = v1();
    // fb 쿠키 생성용으로 이벤트 한번 발생 시켜야함
    (window as any).fbq("track", "PageView", {}, { eventID: event_id });
    conversionApiMutation({
      event_name: "PageView",
      event_id,
    });
    conversionApiMutation({
      event_name: "ViewContent",
      custom_data_content_name: document.title,
    });

    const handleRouteChange = () => {
      const event_id = v1();
      (window as any).fbq("track", "PageView", {}, { eventID: event_id });
      conversionApiMutation({
        event_name: "PageView",
        event_id,
      });
      conversionApiMutation({
        event_name: "ViewContent",
        custom_data_content_name: document.title,
      });

      // 페이지당 한번일 경우 사용되는 스테이트
      setIsSend(false);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  useConverstionApiScroll();

  // 채널톡 to conversion api
  const { data, loading, error } = useSubscription(GTM_SUB, {
    variables: {
      input: {
        channelTalkMemberId: window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID),
      },
    },
  });

  useEffect(() => {
    if (data && !isSend) {
      conversionApiMutation({
        event_name: data.gtmSub.event,
        ...JSON.parse(data.gtmSub.eventModel),
      });
      console.log("구독하고 있던 채널톡 api 에서 데이터가 들어옴", data);
      setIsSend(true);
    }
  }, [data]);

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
            
            fbq.disablePushState = true;
            fbq.allowDuplicatePageViews = true
            fbq('init', ${pixelId});
          `,
        }}
      />
    </>
  );
}
