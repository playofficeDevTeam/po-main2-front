import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import Org_footer from "../3organisms/Org_footer";
import Org_header from "../3organisms/Org_header";

export default function Layout({ children }: any) {
  const MinWidth = styled.div`
    min-width: ${isMobile ? "20rem" : "64rem"};
  `;
  return (
    <MinWidth>
      <Org_header />
      <div className="">{children}</div>
      <Org_footer />
    </MinWidth>
  );
}
