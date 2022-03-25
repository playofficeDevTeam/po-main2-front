import Org_footer from "../3organisms/Org_footer";
import Org_header from "../3organisms/Org_header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import DeviceDetect from "./DeviceDetect";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { useGtmScroll } from "../hooks/useGtmScroll";
import GoToTopArrow from "../2molecules/GoToTopArrow";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_HOST + "/graphql",
  cache: new InMemoryCache(),
});
const queryClient = new QueryClient();

export default function Layout({ children }: any) {
  useGtmScroll();

  useEffect(() => {
    const tagManagerArgs = {
      gtmId:
        process.env.NEXT_PUBLIC_TYPE !== "prod" ? "GTM-WTBKCZ8" : "GTM-TCF867Z",
    };
    TagManager.initialize(tagManagerArgs);

    return () => {};
  }, []);

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <DeviceDetect>
            <Org_header />
            <GoToTopArrow />
            <>{children}</>
            <Org_footer />
          </DeviceDetect>
        </RecoilRoot>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
