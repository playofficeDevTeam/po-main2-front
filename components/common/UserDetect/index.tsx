import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import ShutdownChanneltalk from "../../2molecules/ShutdownChanneltalk";
import { useTokenCheck } from "../../hooks/useTokenCheck";

export const isAdminAtom = atom({
  key: "isAdmin",
  default: false,
});

export default function App({ children }) {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);

  // 어드민 패스 스테이트
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
    <div className={isAdmin ? "flex h-screen overflow-x-auto" : ""}>
      {isAdmin && <ShutdownChanneltalk />}
      {children}
    </div>
  );
}
