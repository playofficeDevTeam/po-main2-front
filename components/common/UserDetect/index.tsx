import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { throttle } from "throttle-debounce";
import ShutdownChanneltalk from "../../2molecules/ShutdownChanneltalk";
import { RENEWAL_ADMIN_ACCESS_TOKEN } from "../../4templates/admin_pgs/Login/Gql_login";
import {
  RenewalAdminAccessToken,
  RenewalAdminAccessTokenVariables,
} from "../../4templates/admin_pgs/Login/__generated__/RenewalAdminAccessToken";
import { useTokenCheck } from "../../hooks/useTokenCheck";
import { accessTokenVar, adminLoggedInVar, refreshTokenVar } from "../apollo";

export const isAdminAtom = atom({
  key: "isAdminAtom",
  default: false,
});

export const isRefreshedAtom = atom({
  key: "isRefreshedAtom",
  default: { state: true, callback: () => {} },
});

export default function App({ children }) {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  const [isRefreshed, setIsRefreshed] = useRecoilState(isRefreshedAtom);

  const [renewalAdminAccessToken] = useMutation<
    RenewalAdminAccessToken,
    RenewalAdminAccessTokenVariables
  >(RENEWAL_ADMIN_ACCESS_TOKEN, {
    onCompleted: (data: RenewalAdminAccessToken) => {
      const {
        renewalAdminAccessToken: { ok, error, accessToken, refreshToken },
      } = data;
      if (ok && accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        accessTokenVar(accessToken);
        console.log(refreshToken);
        localStorage.setItem("refreshToken", refreshToken);
        refreshTokenVar(refreshToken);
        adminLoggedInVar(true);
      } else if (error) {
        throw (
          "오류가 생겼습니다. 다시 로그인해주세요." + " 에러메세지:" + error
        );
      }
    },
  });

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

  useEffect(() => {
    const asyncEffect = async () => {
      if (!isRefreshed.state) {
        const refreshToken =
          sessionStorage.getItem("refreshToken") ||
          localStorage.getItem("refreshToken") ||
          "";
        await renewalAdminAccessToken({
          variables: {
            input: {
              refreshToken,
            },
          },
        });
        isRefreshed.callback();
      }
    };
    throttle(1000, asyncEffect)();
  }, [isRefreshed.state]);

  return (
    <div className={isAdmin ? "flex h-screen overflow-x-auto" : ""}>
      {isAdmin && <ShutdownChanneltalk />}
      {children}
    </div>
  );
}
