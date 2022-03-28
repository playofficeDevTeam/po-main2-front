import useIsMobile from "../../../hooks/useIsMobile";
import { useScroll, useScrollEffect } from "../../../hooks/useScroll";

import Org_10performancePrinciple from "../../service_pgs/VisualInfluencer_pg/Org_10performancePrinciple";
import Org_11poketingIs from "../../service_pgs/VisualInfluencer_pg/Org_11poketingIs";
import Org_12partner from "../../service_pgs/VisualInfluencer_pg/Org_12partner";
import Org_14sequence from "../../service_pgs/VisualInfluencer_pg/Org_14sequence";
import Org_15FAQ from "../../service_pgs/VisualInfluencer_pg/Org_15FAQ";
import Org_3averagePerfomance from "../../service_pgs/VisualInfluencer_pg/Org_3averagePerfomance";
import Org_4costomerReact from "../../service_pgs/VisualInfluencer_pg/Org_4costomerReact";
import Org_5visualIs from "../../service_pgs/VisualInfluencer_pg/Org_5visualIs";
import Org_6proposal1 from "../../service_pgs/VisualInfluencer_pg/Org_6proposal1";
import Org_7proposal2 from "../../service_pgs/VisualInfluencer_pg/Org_7proposal2";
import Org_8proposal3 from "../../service_pgs/VisualInfluencer_pg/Org_8proposal3";
import Org_9ref1 from "../../service_pgs/VisualInfluencer_pg/Org_9ref1";

import Ue_loadingCookieData from "../QuestionComplete/Ue_loadingCookieData";
import Org_1topMsg from "../QuestionForm_pg/Org_1topMsg";
import Org_2form from "../QuestionForm_pg/Org_2form";
import Org_3sendForm from "../QuestionForm_pg/Org_3sendForm";
import Org_0floatingBtn from "./Org_0floatingBtn";
import Org_13price_plan2 from "./Org_13price_plan2";
import Org_1showVideo from "./Org_1showVideo";

export default function App() {
  const isMobile = useIsMobile();

  const averagePerfomanceScroll = useScroll(-200);
  const poketingIsScroll = useScroll(-200);
  const floatingBtn1Scroll = useScroll(-200);
  const floatingBtn2Scroll = useScroll(-200);

  useScrollEffect(
    isMobile
      ? [
          averagePerfomanceScroll.scrollCheck,
          poketingIsScroll.scrollCheck,
          floatingBtn1Scroll.scrollCheck,
          floatingBtn2Scroll.scrollCheck,
        ]
      : [averagePerfomanceScroll.scrollCheck, poketingIsScroll.scrollCheck]
  );
  return (
    <>
      <Ue_loadingCookieData />
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <>
          <Org_0floatingBtn
            trigger={floatingBtn1Scroll.trigger && !floatingBtn2Scroll.trigger}
          />

          <Org_1showVideo />
          <div className="" ref={floatingBtn1Scroll.ref}></div>

          <div className="" ref={averagePerfomanceScroll.ref}></div>
          <Org_3averagePerfomance trigger={averagePerfomanceScroll.trigger} />

          <Org_4costomerReact />
          <Org_5visualIs />
          <Org_6proposal1 />
          <Org_7proposal2 />
          <Org_8proposal3 />
          <Org_9ref1 />
          <Org_10performancePrinciple />

          <div className="" ref={poketingIsScroll.ref}></div>
          <Org_11poketingIs trigger={poketingIsScroll.trigger} />

          <Org_12partner />
          <Org_13price_plan2 />
          <Org_14sequence />
          {/* <Org_15FAQ /> */}

          <Org_1topMsg />
          <div className="" ref={floatingBtn2Scroll.ref}></div>
          <Org_2form />
          <Org_3sendForm />
        </>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <>
          <Org_0floatingBtn />

          <Org_1showVideo />
          <div className="" ref={averagePerfomanceScroll.ref}></div>
          <Org_3averagePerfomance trigger={averagePerfomanceScroll.trigger} />

          <Org_4costomerReact />
          <Org_5visualIs />
          <Org_6proposal1 />
          <Org_7proposal2 />
          <Org_8proposal3 />
          <Org_9ref1 />
          <Org_10performancePrinciple />
          <div className="" ref={poketingIsScroll.ref}></div>
          <Org_11poketingIs trigger={poketingIsScroll.trigger} />
          <Org_12partner />
          <Org_13price_plan2 />
          <Org_14sequence />
          {/* <Org_15FAQ /> */}

          <Org_1topMsg />
          <Org_2form />
          <Org_3sendForm />
        </>
      )}
    </>
  );
}
