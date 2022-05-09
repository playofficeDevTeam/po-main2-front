import { useGtm } from "../../../hooks/useGtm";
import Org_1topMsg from "./Org_1topMsg";
import Org_2confirmForm from "./Org_2confirmForm";
import Ue_Gtm from "./Ue_Gtm";
import Ue_loadingCookieData from "./Ue_loadingCookieData";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  return (
    <>
      <Ue_loadingCookieData />
      <Ue_Gtm />
      {isMobile ? (
        <>
          <Org_1topMsg />
          <Org_2confirmForm />
        </>
      ) : (
        <>
          <Org_1topMsg />
          <Org_2confirmForm />
        </>
      )}
    </>
  );
}
