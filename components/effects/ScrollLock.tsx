import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; width:100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);
  return <></>;
}
