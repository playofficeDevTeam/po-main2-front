import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isAdminAtom } from "../../common/UserDetect";
import Org_adminSidebar from "./Org_adminSidebar";
import Org_header, { isVisibleHeaderAtom } from "./Org_header";

export default function App() {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);

  const [isVisibleHeader, setIsBisibleHeader] =
    useRecoilState(isVisibleHeaderAtom);

  useEffect(() => {
    const pathname = window.location.pathname;
    const pathnameFirst = pathname.split("/")[1];
    if (pathnameFirst === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (!isVisibleHeader) {
    return <></>;
  }

  if (isAdmin) {
    return (
      <>
        <Org_adminSidebar />
      </>
    );
  }
  return (
    <>
      <Org_header />
    </>
  );
}
