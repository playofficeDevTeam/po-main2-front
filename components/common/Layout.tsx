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

const queryClient = new QueryClient();

export default function Layout({ children }: any) {
  useGtmScroll();

  useEffect(() => {
    const asyncEffect = async () => {
      const prodGtmId = "GTM-WTBKCZ8";
      const devGtmId = "GTM-TCF867Z";
      const tagManagerArgs = {
        gtmId: process.env.NEXT_PUBLIC_TYPE === "prod" ? prodGtmId : devGtmId,
      };
      TagManager.initialize(tagManagerArgs);
    };
    asyncEffect();
    return () => {};
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
