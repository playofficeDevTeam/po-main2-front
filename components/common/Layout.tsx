import Org_footer from "../3organisms/Org_footer";
import Org_header from "../3organisms/Org_header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import DeviceDetect from "./DeviceDetect";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_HOST + "/graphql",
  cache: new InMemoryCache(),
});
const queryClient = new QueryClient();

export default function Layout({ children }: any) {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <DeviceDetect>
            <Org_header />
            <>{children}</>
            <Org_footer />
          </DeviceDetect>
        </RecoilRoot>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
