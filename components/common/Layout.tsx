import Org_footer from "../3organisms/Org_footer";
import Org_header from "../3organisms/Org_header";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import DeviceDetect from "./DeviceDetect";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { useGtmScroll } from "../hooks/useGtmScroll";
import GoToTopArrow from "../2molecules/GoToTopArrow";
import UserDetect from "./UserDetect";
import { client } from "./apollo";
import { useRouter } from "next/router";
import ChannelService from "./ChannelService";
import { v1 } from "uuid";

const queryClient = new QueryClient();

export const LOCAL_SAVED_MEMVER_ID = "localSavedMemberId";

export default function Layout({ children }: any) {
  useGtmScroll();

  const prodGtmId = "GTM-WTBKCZ8";
  const devGtmId = "GTM-TCF867Z";
  const tagManagerArgs = {
    gtmId: process.env.NEXT_PUBLIC_TYPE === "prod" ? prodGtmId : devGtmId,
  };

  //태그매니저 부트
  useEffect(() => {
    const asyncEffect = async () => {
      TagManager.initialize(tagManagerArgs);
    };
    asyncEffect();
    return () => {};
  }, []);

  //어드민 페이지 구분
  const route = useRouter();
  useEffect(() => {
    if (route.asPath.split("/")[1] === "admin") {
      let htmlElement = document.getElementsByTagName("html")[0];
      htmlElement.style.overflowY = "auto";
    }
  }, []);

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

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <DeviceDetect>
            <UserDetect>
              <Org_header />
              <GoToTopArrow />
              <>{children}</>
              <Org_footer />
            </UserDetect>
          </DeviceDetect>
        </RecoilRoot>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
