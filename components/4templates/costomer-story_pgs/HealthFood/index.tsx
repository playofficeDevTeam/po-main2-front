import { isMobile } from "react-device-detect";
import LogPrevUrl from "../../../2molecules/LogPrevUrl";
import { useScroll, useScrollEffect } from "../../../hooks/useScroll";
import Org_0floatingBtn_R_ from "../ExerciseAids/Org_0floatingBtn_R_";
import Org_0helmet from "./Org_0helmet";
import Org_1headline from "./Org_1headline";
import Org_2explanation from "./Org_2explanation";
import Org_3explanation from "./Org_3explanation";
import Org_4explanation from "./Org_4explanation_link";
import Org_5explanation from "./Org_5explanation";
import Org_6midMessage from "./Org_6midMessage";
import Org_7ref from "./Org_7ref";
import Org_8more from "./Org_8more";
import Org_9lastMessage from "./Org_9lastMessage";

export default function App() {
  const floatingBtnScroll = useScroll(0);
  const lastMesageScroll = useScroll(-300);
  const graphAosScroll = useScroll(-400);

  useScrollEffect([
    lastMesageScroll.scrollCheck,
    floatingBtnScroll.scrollCheck,
    graphAosScroll.scrollCheck,
  ]);
  return (
    <>
      <Org_0helmet />
      <LogPrevUrl />
      {isMobile ? (
        <>
          <Org_0floatingBtn_R_ trigger={floatingBtnScroll.scrollTrigger} />
          <Org_1headline />
          <div className="mt-32"></div>
          <Org_2explanation />
          <div className="mt-32"></div>
          <Org_3explanation />
          <div className="mt-32"></div>
          <Org_4explanation />
          <div className="mt-32" ref={graphAosScroll.element}></div>
          <Org_5explanation trigger={graphAosScroll.scrollTrigger} />
          <div className="mt-32"></div>
          <Org_6midMessage />
          <div className="mt-32"></div>
          <Org_7ref />
          <div className="mt-32"></div>
          <Org_8more />
          <div className="" ref={floatingBtnScroll.element}></div>
          <div className="mt-32" ref={lastMesageScroll.element}></div>
          <Org_9lastMessage trigger={lastMesageScroll.scrollTrigger} />
        </>
      ) : (
        <>
          <Org_0floatingBtn_R_ trigger={floatingBtnScroll.scrollTrigger} />
          <Org_1headline />
          <div className="mt-40"></div>
          <Org_2explanation />
          <div className="mt-40"></div>
          <Org_3explanation />
          <div className="mt-40"></div>
          <Org_4explanation />
          <div className="mt-40" ref={graphAosScroll.element}></div>
          <Org_5explanation trigger={graphAosScroll.scrollTrigger} />
          <div className="mt-40"></div>
          <Org_6midMessage />
          <div className="mt-40"></div>
          <Org_7ref />
          <div className="mt-40"></div>
          <Org_8more />
          <div className="" ref={floatingBtnScroll.element}></div>
          <div className="mt-40" ref={lastMesageScroll.element}></div>
          <Org_9lastMessage trigger={lastMesageScroll.scrollTrigger} />
        </>
      )}
    </>
  );
}
