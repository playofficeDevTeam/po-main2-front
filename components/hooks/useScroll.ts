import { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";

export const useScroll = (offset: number, once = false, init = false) => {
  const ref = useRef<any>();
  const [trigger, setTrigger] = useState(init);
  const scrollCheck = () => {
    const elementCoordinate = ref.current?.getBoundingClientRect().top;

    if (once) {
      if (elementCoordinate < window.innerHeight + offset) {
        setTrigger(true);
      }
    } else {
      if (elementCoordinate < window.innerHeight + offset) {
        setTrigger(true);
      } else {
        setTrigger(false);
      }
    }
  };
  return { ref, trigger, scrollCheck };
};

export const useScrollEffect = (scrollChecks: Array<() => void>) => {
  const scrollYCheck = () => {
    scrollChecks.forEach((val) => {
      val();
    });
  };
  const throttleScrollYCheck = throttle(150, scrollYCheck);
  useEffect(() => {
    window.addEventListener("scroll", throttleScrollYCheck);
    return () => window.removeEventListener("scroll", throttleScrollYCheck);
  }, []);
};

// 예시;
// function App() {
//   const useScroll1 = useScroll(200);
//   const useScroll2 = useScroll(200);
//   useScrollEffect([useScroll1.scrollCheck, useScroll2.scrollCheck]);

//   return (
//     <>
//       <div ref={useScroll1.ref} />
//       <Sec trigger={useScroll1.trigger} />

//       <div ref={useScroll2.ref} />
//       <Sec trigger={useScroll2.trigger} />
//     </>
//   );
// }
