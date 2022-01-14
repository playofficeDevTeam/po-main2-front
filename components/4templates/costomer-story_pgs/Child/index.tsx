import { isMobile } from "react-device-detect";
import { useScroll, useScrollEffect } from "../../../hooks/useScroll";
import Org_0floatingBtn from "../Main/Org_0floatingBtn";

import Org_10lastMessage from "./Org_10lastMessage";
import Org_1headline from "./Org_1headline";
import Org_2explanation from "./Org_2explanation";
import Org_3explanation from "./Org_3explanation";
import Org_4explanation from "./Org_4explanation";
import Org_5explanation from "./Org_5explanation_link";
import Org_6explanation from "./Org_6explanation";
import Org_7midMessage from "./Org_7midMessage";
import Org_8ref from "./Org_8ref";
import Org_9more from "./Org_9more";

export default function App() {
  const floatingBtnScroll = useScroll(0);
  const lastMesageScroll = useScroll(-300);

  useScrollEffect([
    floatingBtnScroll.scrollCheck,
    lastMesageScroll.scrollCheck,
  ]);
  return (
    <>
      {isMobile ? (
        <>
          <Org_0floatingBtn trigger={!floatingBtnScroll.trigger} />
          <Org_1headline />
          <div className="mt-32"></div>
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
          <Org_8ref />
          <div className="mt-32"></div>
          <Org_9more />
          <div className="" ref={floatingBtnScroll.ref}></div>
          <div className="mt-32" ref={lastMesageScroll.ref}></div>
          <Org_10lastMessage trigger={lastMesageScroll.trigger} />
        </>
      ) : (
        <>
          <Org_0floatingBtn trigger={floatingBtnScroll.trigger} />
          <Org_1headline />
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
          <Org_8ref />
          <div className="mt-40"></div>
          <Org_9more />
          <div className="" ref={floatingBtnScroll.ref}></div>
          <div className="mt-40" ref={lastMesageScroll.ref}></div>
          <Org_10lastMessage trigger={lastMesageScroll.trigger} />
        </>
      )}
    </>
  );
}
