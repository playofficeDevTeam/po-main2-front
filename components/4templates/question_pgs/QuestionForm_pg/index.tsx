import Ue_loadingCookieData from "../QuestionComplete/Ue_loadingCookieData";
import Org_1topMsg from "./Org_1topMsg";
import Org_2form from "./Org_2form";
import Org_3sendForm from "./Org_3sendForm";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();

  return (
    <>
      <Ue_loadingCookieData />
      {isMobile ? (
        <>
          <Org_1topMsg />
          <Org_2form />
          <Org_3sendForm />
        </>
      ) : (
        <>
          <Org_1topMsg />
          <Org_2form />
          <Org_3sendForm />
        </>
      )}
    </>
  );
}
