import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { throttle } from "throttle-debounce";
import ShutdownChanneltalk from "../../2molecules/ShutdownChanneltalk";
import { RENEWAL_ADMIN_ACCESS_TOKEN } from "./gql_adminRenewalAccessToken";
import {
  renewalAdminAccessToken,
  renewalAdminAccessTokenVariables,
} from "/home/app/components/common/UserDetect/__generated__/renewalAdminAccessToken";
import {
  renewalUserAccessToken,
  renewalUserAccessTokenVariables,
} from "/home/app/components/common/UserDetect/__generated__/renewalUserAccessToken";
import {
  accessTokenVar,
  adminLoggedInVar,
  refreshTokenVar,
  userLoggedInVar,
} from "../apollo";
import * as jwt from "jsonwebtoken";
import { RENEWAL_USER_ACCESS_TOKEN } from "./gql_userRenewalAccessToken";

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
    renewalAdminAccessToken,
    renewalAdminAccessTokenVariables
  >(RENEWAL_ADMIN_ACCESS_TOKEN, {
    onCompleted: (data: renewalAdminAccessToken) => {
      const {
        renewalAdminAccessToken: { ok, error, accessToken, refreshToken },
      } = data;
      if (ok && accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        accessTokenVar(accessToken);
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

  const [renewalUserAccessToken] = useMutation<
    renewalUserAccessToken,
    renewalUserAccessTokenVariables
  >(RENEWAL_USER_ACCESS_TOKEN, {
    onCompleted: (data: renewalUserAccessToken) => {
      const {
        renewalUserAccessToken: { ok, error, accessToken, refreshToken },
      } = data;
      if (ok && accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        accessTokenVar(accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        refreshTokenVar(refreshToken);
        userLoggedInVar(true);
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

        const refreshTokendecoded: any = jwt.decode(refreshToken, {
          complete: true,
        });
        //어드민 일때
        if (["Super", "General"].includes(refreshTokendecoded.payload.role)) {
          await renewalAdminAccessToken({
            variables: {
              input: {
                refreshToken,
              },
            },
          });
        }
        //유저일때
        else if (
          ["Partner", "Creator"].includes(refreshTokendecoded.payload.role)
        ) {
          await renewalUserAccessToken({
            variables: {
              input: {
                refreshToken,
              },
            },
          });
        }
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
