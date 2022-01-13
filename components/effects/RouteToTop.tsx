import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RouteToTop() {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);
  return <></>;
}
