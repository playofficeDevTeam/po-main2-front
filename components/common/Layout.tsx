import Org_footer from "../3organisms/Org_footer";
import Org_header from "../3organisms/Org_header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";
import DeviceDetect from "./DeviceDetect";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

export default function Layout({ children }: any) {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <DeviceDetect>
          <Org_header />
          <>{children}</>
          <Org_footer />
        </DeviceDetect>
      </RecoilRoot>
    </ApolloProvider>
  );
}
