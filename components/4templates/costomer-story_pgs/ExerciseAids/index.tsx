import { isMobile } from "react-device-detect";
import Org_1headLine from "./Org_1headLine";
import Org_2explanation from "./Org_2explanation_R_";
import Org_3explanation from "./Org_3explanation";
import Org_4explanation from "./Org_4explanation";
import Org_5explanation from "./Org_5explanation_link_R_";
import Org_6explanation from "./Org_6explanation";
import Org_7midMessage from "./Org_7midMessage_R_";
import Org_8reference from "./Org_8reference_R_";
import Org_10lastMessage from "./Org_10lastMessage_R_";
import Org_9more_R_ from "./Org_9more_R_";
import { useScroll, useScrollEffect } from "../../../hooks/useScroll";
import Org_0floatingBtn from "../Main/Org_0floatingBtn";

export default function App() {
  const floatingBtnScroll = useScroll(0);
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
          <Org_0floatingBtn trigger={floatingBtnScroll.trigger} />
          <Org_1headLine />
          <div className="mt-16"></div>
          <Org_2explanation />
          <div className="mt-32"></div>
          <Org_3explanation />
          <div className="mt-32"></div>
          <Org_4explanation />
          <div className="mt-32"></div>
          <Org_5explanation />
          <div className="mt-32"></div>
          <Org_6explanation />
          <div className="mt-32"></div>
          <Org_7midMessage />
          <div className="mt-32"></div>
          <Org_8reference />
          <div className="mt-32"></div>
          <Org_9more_R_ />
          <div ref={floatingBtnScroll.ref}></div>
          <div className="mt-32" ref={lastMesageScroll.ref}></div>
          <Org_10lastMessage trigger={lastMesageScroll.trigger} />
        </>
      ) : (
        <>
          <Org_0floatingBtn />
          <Org_1headLine />
          <div className="mt-40"></div>
          <Org_2explanation />
          <div className="mt-40"></div>
          <Org_3explanation />
          <div className="mt-40"></div>
          <Org_4explanation />
          <div className="mt-40"></div>
          <Org_5explanation />
          <div className="mt-40"></div>
          <Org_6explanation />
          <div className="mt-40"></div>
          <Org_7midMessage />
          <div className="mt-40"></div>
          <Org_8reference />
          <div className="mt-40"></div>
          <Org_9more_R_ />
          <div className="mt-40" ref={lastMesageScroll.ref}></div>
          <Org_10lastMessage trigger={lastMesageScroll.trigger} />
        </>
      )}
    </>
  );
}
