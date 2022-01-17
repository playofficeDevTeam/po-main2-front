import { useScroll, useScrollEffect } from "../../../hooks/useScroll";
import Org_1topFullVdo from "./Org_1topFullVdo";
import Org_2mainExplanation from "./Org_2mainExplanation";
import Org_3mainExplanation_reverse from "./Org_3mainExplanation_reverse";
import Org_4mainExplanation from "./Org_4mainExplanation";
import Org_5mainExplanation from "./Org_5mainExplanation";
import Org_6mainExplanation from "./Org_6mainExplanation";
import Org_7lastMessage from "./Org_7lastMessage";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();

  const org2Scroll = useScroll(-400);
  const org3Scroll = useScroll(-400);
  const org4Scroll = useScroll(-400);
  const org5Scroll = useScroll(-400);
  const org6Scroll = useScroll(-400);

  useScrollEffect(
    isMobile
      ? []
      : [
          org2Scroll.scrollCheck,
          org3Scroll.scrollCheck,
          org4Scroll.scrollCheck,
          org5Scroll.scrollCheck,
          org6Scroll.scrollCheck,
        ]
  );

  return (
    <>
      {isMobile ? (
        <>
          <Org_1topFullVdo />
          <Org_2mainExplanation />
          <Org_3mainExplanation_reverse />
          <Org_4mainExplanation />
          <Org_5mainExplanation />
          <Org_6mainExplanation />
          <Org_7lastMessage />
        </>
      ) : (
        <>
          <Org_1topFullVdo />

          <div ref={org2Scroll.ref} />
          <Org_2mainExplanation trigger={org2Scroll.trigger} />

          <div ref={org3Scroll.ref} />
          <Org_3mainExplanation_reverse trigger={org3Scroll.trigger} />

          <div ref={org4Scroll.ref} />
          <Org_4mainExplanation trigger={org4Scroll.trigger} />

          <div ref={org5Scroll.ref} />
          <Org_5mainExplanation trigger={org5Scroll.trigger} />

          <div ref={org6Scroll.ref} />
          <Org_6mainExplanation trigger={org6Scroll.trigger} />
          <Org_7lastMessage />
        </>
      )}
    </>
  );
}
