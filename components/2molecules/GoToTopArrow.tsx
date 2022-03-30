import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { throttle } from "throttle-debounce";
import { isAdminAtom } from "../common/AdminDetect";
import useIsMobile from "../hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  const [ArrowState, setArrowState] = useState(false);
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  const scrollYCheck = () => {
    const scrollY = window.scrollY;
    scrollY === 0 ? setArrowState(false) : setArrowState(true);
  };

  const throttleScrollYCheck = throttle(300, scrollYCheck);
  useEffect(() => {
    window.addEventListener("scroll", throttleScrollYCheck);
    return () => window.removeEventListener("scroll", throttleScrollYCheck);
  }, []);

  if (isAdmin) {
    return <></>;
  }

  return isMobile ? (
    <></>
  ) : (
    <>
      <div
        className={`fixed z-40 bottom-24 right-8 mr-px pr-px text-5xl text-gray-500 transition  duration-200
  ${ArrowState ? "text-opacity-50" : "text-opacity-0"} `}
      >
        <i
          className="fas fa-arrow-up cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
        ></i>
      </div>
    </>
  );
}
