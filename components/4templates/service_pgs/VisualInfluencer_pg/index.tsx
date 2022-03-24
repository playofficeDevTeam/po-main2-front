import { useScroll, useScrollEffect } from "../../../hooks/useScroll";
import Org_10performancePrinciple from "./Org_10performancePrinciple";
import Org_11poketingIs from "./Org_11poketingIs";
import Org_12partner from "./Org_12partner";
import Org_13price_plan2 from "./Org_13price_plan2";
import Org_14sequence from "./Org_14sequence";
import Org_1swipeVideo from "./Org_1swipeVideo";
import Org_2price_plan1 from "./Org_2price_plan1";
import Org_3averagePerfomance from "./Org_3averagePerfomance";
import Org_4costomerReact from "./Org_4costomerReact";
import Org_5visualIs from "./Org_5visualIs";
import Org_6proposal1 from "./Org_6proposal1";
import Org_7proposal2 from "./Org_7proposal2";
import Org_8proposal3 from "./Org_8proposal3";
import Org_9ref1 from "./Org_9ref1";
import Org_15FAQ from "./Org_15FAQ";
import Org_16lastMessage from "./Org_16lastMessage";
import Org_0floatingBtn from "./Org_0floatingBtn";
import useIsMobile from "../../../hooks/useIsMobile";
import Ue_initServiceAmount from "./Ue_initServiceAmount";
import { useGtmScroll } from "../../../hooks/useGtmScroll";

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
      <Ue_initServiceAmount />
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <>
          <Org_0floatingBtn
            trigger={floatingBtn1Scroll.trigger && !floatingBtn2Scroll.trigger}
          />
          <Org_1swipeVideo />

          <div className="" ref={floatingBtn1Scroll.ref}></div>
          <Org_2price_plan1 />

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
          <Org_15FAQ />

          <div className="" ref={floatingBtn2Scroll.ref}></div>
          <Org_16lastMessage />
        </>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <>
          <Org_0floatingBtn />
          <Org_1swipeVideo rightComponent={<Org_2price_plan1 />} />
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
          <Org_15FAQ />
          <Org_16lastMessage />
        </>
      )}
    </>
  );
}
