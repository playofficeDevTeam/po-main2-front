import { useGtm } from "../../../hooks/useGtm";
import Org_1topMsg from "./Org_1topMsg";
import Org_2confirmForm from "./Org_2confirmForm";
import Ue_Gtm from "./Ue_Gtm";
import Ue_loadingCookieData from "./Ue_loadingCookieData";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  const contactGtm = useGtm({
    event: "Contact",
    eventModel: {
      search_string: "전문가 컨설팅 신청",
    },
  });
  const moreGtm = useGtm({
    event: "More",
    eventModel: {
      content_name: "to service page",
    },
  });

  const begin_checkoutGtm = useGtm({
    event: "begin_checkout",
    eventModel: {
      content_category: "test",
      content_name: "test",
      value: 1000,
      currency: "KRW",
      items: [
        {
          item_id: "test",
          item_name: "test",
        },
      ],
    },
  });
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
          <div
            className=""
            onClick={() => {
              contactGtm();
            }}
          >
            콘텍트 테스트 버튼
          </div>
          <div
            className=""
            onClick={() => {
              moreGtm();
            }}
          >
            모어 테스트 버튼
          </div>
          <div
            className=""
            onClick={() => {
              begin_checkoutGtm();
            }}
          >
            결제시작
          </div>
          <Org_1topMsg />
          <Org_2confirmForm />
        </>
      )}
    </>
  );
}
