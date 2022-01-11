import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "/home/app/components/common/Layout";
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

export default function App() {
  const isMobile = useReactiveVar(isMobileVar);

  const averagePerfomanceScroll = useScroll(-200);
  const poketingIsScroll = useScroll(-200);

  useScrollEffect([
    averagePerfomanceScroll.scrollCheck,
    poketingIsScroll.scrollCheck,
  ]);

  return (
    <>
      {isMobile ? (
        <>
          <Org_1swipeVideo />
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
        </>
      ) : (
        <>
          <Org_1swipeVideo rightComponent={<Org_2price_plan1 />} />
          <div className="" ref={averagePerfomanceScroll.ref}></div>

          <Org_3averagePerfomance trigger={averagePerfomanceScroll.trigger} />
        </>
      )}
    </>
  );
}
