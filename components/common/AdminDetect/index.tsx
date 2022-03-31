import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import ShutdownChanneltalk from "../../2molecules/ShutdownChanneltalk";
import { adminLogedInAtom } from "../../4templates/admin_pgs/Login/Var_loginData";
import * as jwt from "jsonwebtoken";
import { RENEWAL_ADMIN_ACCESS_TOKEN } from "../../4templates/admin_pgs/Login/Gql_login";
import { useMutation } from "@apollo/client";
import {
  RenewalAdminAccessToken,
  RenewalAdminAccessTokenVariables,
} from "../../4templates/admin_pgs/Login/__generated__/RenewalAdminAccessToken";
import { useRouter } from "next/router";

export const isAdminAtom = atom({
  key: "isAdmin",
  default: false,
});

export default function App({ children }) {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);

  // 로그인상태
  const [adminLogedInState, setAdminLogedInState] =
    useRecoilState(adminLogedInAtom);

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

  const router = useRouter();
  const [renewalAdminAccessToken] = useMutation<
    RenewalAdminAccessToken,
    RenewalAdminAccessTokenVariables
  >(RENEWAL_ADMIN_ACCESS_TOKEN, {
    onCompleted: (data: RenewalAdminAccessToken) => {
      const {
        renewalAdminAccessToken: { ok, error, accessToken },
      } = data;
      if (ok && accessToken) {
        setAdminLogedInState(true);
        localStorage.setItem("accessToken", accessToken);
      } else if (error) {
        setAdminLogedInState(false);
        router.push("/admin/log-in");
      }
    },
  });

  //토큰 디코딩 및 만료 체크해서 토큰재발급
  useEffect(() => {
    try {
      // 토큰디코드
      const accessToken = localStorage.getItem("accessToken") || "";
      const refreshToken = localStorage.getItem("refreshToken") || "";
      const decoded: any = jwt.decode(accessToken, { complete: true });
      const tokenExpired = decoded?.payload.exp * 1000;
      const tokenRole = decoded?.payload.role;

      if (["Super", "General"].includes(tokenRole)) {
        const now = new Date();
        const nowTime = now.getTime();
        const marginTime = 1000 * 60 * 5;

        if (tokenExpired - nowTime < marginTime) {
          renewalAdminAccessToken({
            variables: {
              input: {
                refreshToken,
              },
            },
          });
        } else {
          setAdminLogedInState(true);
        }
      } else if (["Partner", "Creator"].includes(tokenRole)) {
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={isAdmin ? "flex h-screen" : ""}>
      {isAdmin && <ShutdownChanneltalk />}
      {children}
    </div>
  );
}
