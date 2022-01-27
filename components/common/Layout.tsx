import Org_footer from "../3organisms/Org_footer";
import Org_header from "../3organisms/Org_header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import DeviceDetect from "./DeviceDetect";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_HOST,
  cache: new InMemoryCache(),
});
const queryClient = new QueryClient();

export default function Layout({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <DeviceDetect>
            <Org_header />
            <>{children}</>
            <Org_footer />
          </DeviceDetect>
        </RecoilRoot>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
