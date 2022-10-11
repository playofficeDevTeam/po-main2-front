import Org_footer from "../3organisms/Org_footer";
import Org_header from "../3organisms/Org_header";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import DeviceDetect from "./DeviceDetect";
import { useEffect } from "react";
import GoToTopArrow from "../2molecules/GoToTopArrow";
import UserDetect from "./UserDetect";
import { client } from "./apollo";
import { useRouter } from "next/router";
import ExternalBoot from "./ExternalBoot";
const queryClient = new QueryClient();

export default function Layout({ children }: any) {
  //어드민 페이지 구분
  const route = useRouter();
  useEffect(() => {
    if (route.asPath.split("/")[1] === "admin") {
      let htmlElement = document.getElementsByTagName("html")[0];
      htmlElement.style.overflowY = "auto";
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <DeviceDetect>
            <UserDetect>
              <ExternalBoot />
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
