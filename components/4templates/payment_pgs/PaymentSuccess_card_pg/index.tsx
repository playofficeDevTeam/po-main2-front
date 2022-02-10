import { useScroll, useScrollEffect } from "../../../hooks/useScroll";
import Org_1paymentSuccessHeader from "./Org_1paymentSuccessHeader";
import Org_2orangeBox from "./Org_2orangeBox";
import Org_3checkBill from "./Org_3checkBill";
import Org_4userInfoEdit from "./Org_4userInfoEdit";
import Org_5process from "./Org_5process";
import Org_6complete from "./Org_6complete";
import Ue_loadingCookieData from "./Ue_loadingCookieData";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  const Org_4userInfoEditScroll = useScroll(-400);
  const Org_6completeScroll = useScroll(isMobile ? -650 : -550);
  useScrollEffect(
    isMobile
      ? [Org_4userInfoEditScroll.scrollCheck, Org_6completeScroll.scrollCheck]
      : [Org_4userInfoEditScroll.scrollCheck, Org_6completeScroll.scrollCheck]
  );

  return (
    <>
      <Ue_loadingCookieData />
      {isMobile ? (
        <>
          <Org_1paymentSuccessHeader />
          <Org_2orangeBox />
          <Org_3checkBill />

          <div className="" ref={Org_4userInfoEditScroll.ref}></div>
          <Org_4userInfoEdit trigger={Org_4userInfoEditScroll.trigger} />
          <Org_5process />

          <div className="" ref={Org_6completeScroll.ref}></div>
          <Org_6complete trigger={Org_6completeScroll.trigger} />
        </>
      ) : (
        <>
          <Org_1paymentSuccessHeader />
          <div className="pc-max flex mb-6">
            <div className="w-4/12 mr-3">
              <Org_2orangeBox />
            </div>
            <div className="w-8/12">
              <Org_3checkBill />
            </div>
          </div>

          <div className="" ref={Org_4userInfoEditScroll.ref}></div>
          <Org_4userInfoEdit trigger={Org_4userInfoEditScroll.trigger} />
          <div className="mb-6"></div>

          <Org_5process />
          <div className="mb-6"></div>

          <div className="" ref={Org_6completeScroll.ref}></div>
          <Org_6complete trigger={Org_6completeScroll.trigger} />
        </>
      )}
    </>
  );
}
