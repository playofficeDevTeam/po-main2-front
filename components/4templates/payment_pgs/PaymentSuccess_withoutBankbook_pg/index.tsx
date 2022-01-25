import { useScroll, useScrollEffect } from "../../../hooks/useScroll";
import Org_1paymentSuccessHeader from "./Org_1paymentSuccessHeader";
import Org_2depositInfomation from "./Org_2depositInfomation";
import Org_3folderbleCheckBill from "./Org_3folderbleCheckBill";
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

          <Org_2depositInfomation />

          <Org_3folderbleCheckBill />

          <div className="" ref={Org_4userInfoEditScroll.ref}></div>
          <Org_4userInfoEdit trigger={Org_4userInfoEditScroll.trigger} />

          <Org_5process />

          <Org_6complete />
        </>
      ) : (
        <>
          <section className="pc-max">
            <Org_1paymentSuccessHeader />

            <div className="flex mb-6 ">
              <div className="w-4/12 mr-2">
                <Org_2depositInfomation />
              </div>
              <div className="w-8/12 ">
                <Org_3folderbleCheckBill />
              </div>
            </div>

            <div className="" ref={Org_4userInfoEditScroll.ref}></div>
            <Org_4userInfoEdit trigger={Org_4userInfoEditScroll.trigger} />

            <div className="mb-6"></div>
            <Org_5process />

            <div className="mb-6"></div>
            <Org_6complete />

            <div className="mb-10"></div>
          </section>
        </>
      )}
    </>
  );
}
