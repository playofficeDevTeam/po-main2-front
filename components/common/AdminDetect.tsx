import { useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";
import { isMobile as isMobile_lib } from "react-device-detect";
import ShutdownChanneltalk from "../2molecules/ShutdownChanneltalk";

export const isAdminAtom = atom({
  key: "isAdmin",
  default: false,
});
export default function App({ children }) {
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
  return (
    <div className={isAdmin ? "flex h-screen" : ""}>
      <ShutdownChanneltalk />
      {children}
    </div>
  );
}
