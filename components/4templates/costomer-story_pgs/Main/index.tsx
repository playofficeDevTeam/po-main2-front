import { useScroll, useScrollEffect } from "../../../hooks/useScroll";
import Org_1headline from "./Org_1headline";
import Org_2main from "./Org_2main";
import Org_3lastMsg from "./Org_3lastMsg";
import Org_0floatingBtn from "./Org_0floatingBtn";
import useIsMobile from "../../../hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();

  const floatingBtnScroll = useScroll(-200);
  const lastMesageScroll = useScroll(-300);
  useScrollEffect(
    isMobile
      ? [floatingBtnScroll.scrollCheck, lastMesageScroll.scrollCheck]
      : [lastMesageScroll.scrollCheck]
  );

  return (
    <>
      {isMobile ? (
        <>
          <Org_0floatingBtn trigger={!floatingBtnScroll.trigger} />
          <Org_1headline />
          <Org_2main />
          <div className="" ref={floatingBtnScroll.ref}></div>
          <div className="" ref={lastMesageScroll.ref}></div>
          <Org_3lastMsg trigger={lastMesageScroll.trigger} />
        </>
      ) : (
        <>
          <Org_0floatingBtn trigger={floatingBtnScroll.trigger} />
          <Org_1headline />
          <Org_2main />
          <div className="" ref={floatingBtnScroll.ref}></div>
          <div className="" ref={lastMesageScroll.ref}></div>
          <Org_3lastMsg trigger={lastMesageScroll.trigger} />
        </>
      )}
    </>
  );
}
