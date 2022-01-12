import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RouteToTop() {
  const history = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history]);
  return <></>;
}
