import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isAdminAtom } from "../../common/UserDetect";
import Org_footer from "./Org_footer";
export default function App() {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);

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
