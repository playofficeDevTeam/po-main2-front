import { useEffect, useState } from "react";
import Org_footer from "./Org_footer";
export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    const pathnameFirst = pathname.split("/")[1];
    if (pathnameFirst === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);
  return isAdmin ? (
    <></>
  ) : (
    <>
      <Org_footer />
    </>
  );
}
