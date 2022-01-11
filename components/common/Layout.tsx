import { useEffect, useState } from "react";
import { isMobile as isMobile_lib } from "react-device-detect";
import styled from "styled-components";
import Org_footer from "../3organisms/Org_footer";
import Org_header from "../3organisms/Org_header";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  makeVar,
  useReactiveVar,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

const MinWidth: any = styled.div`
  min-width: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "23.438rem" : "64rem"};
`;

export const isMobileVar = makeVar(false);

export default function Layout({ children }: any) {
  const isMobile = useReactiveVar(isMobileVar);
  const [deviceDetectSuccessed, setDeviceDetectSuccessed] = useState(false);

  useEffect(() => {
    isMobileVar(isMobile_lib);
    setDeviceDetectSuccessed(true);
  }, []);

  return (
    <ApolloProvider client={client}>
      {deviceDetectSuccessed ? (
        <MinWidth isMobile={isMobile}>
          <Org_header />
          <div className="">{children}</div>
          <Org_footer />
        </MinWidth>
      ) : (
        <></>
      )}
    </ApolloProvider>
  );
}
