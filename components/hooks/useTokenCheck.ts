import { gql, useMutation } from "@apollo/client";
import * as jwt from "jsonwebtoken";
import { throttle } from "lodash";
import { useRouter } from "next/router";
import { atom, useRecoilState } from "recoil";
import { RENEWAL_ADMIN_ACCESS_TOKEN } from "../4templates/admin_pgs/Login/Gql_login";
import {
  RenewalAdminAccessToken,
  RenewalAdminAccessTokenVariables,
} from "../4templates/admin_pgs/Login/__generated__/RenewalAdminAccessToken";
import {
  accessTokenVar,
  adminLoggedInVar,
  refreshTokenVar,
} from "../common/apollo";
import { isRefreshedAtom } from "../common/UserDetect";

export const useTokenCheck = () => {
  //어드민 토큰 리프레쉬
  const router = useRouter();
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
        // localStorage.setItem("refreshToken", refreshToken);
        // refreshTokenVar(refreshToken);
        // adminLoggedInVar(true);
      } else if (error) {
        throw (
          "오류가 생겼습니다. 다시 로그인해주세요." + " 에러메세지:" + error
        );
      }
    },
  });

  const [isRefreshed, setIsRefreshed] = useRecoilState(isRefreshedAtom);

  const tokenDecode = async (
    type: "query" | "mutation",
    callback: () => void
  ) => {
    try {
      // 토큰디코드
      const accessToken =
        sessionStorage.getItem("accessToken") ||
        localStorage.getItem("accessToken") ||
        "";
      const refreshToken =
        sessionStorage.getItem("refreshToken") ||
        localStorage.getItem("refreshToken") ||
        "";
      const accessTokendecoded: any = jwt.decode(accessToken, {
        complete: true,
      });
      const accessTokenExpired = accessTokendecoded?.payload.exp * 1000;

      const refreshTokendecoded: any = jwt.decode(refreshToken, {
        complete: true,
      });
      const refreshTokenRole = refreshTokendecoded?.payload.role;
      const refreshTokenExpired = refreshTokendecoded?.payload.exp * 1000;

      const now = new Date();
      const nowTime = now.getTime();
      const marginTime = 1000 * 60 * 5;

      if (["Super", "General"].includes(refreshTokenRole)) {
        if (refreshTokenExpired - nowTime < marginTime) {
          adminLoggedInVar(false);
          router.push(`/admin/log-in`);
        }
        accessTokenVar(accessToken);
        adminLoggedInVar(true);
        if (!accessToken || accessTokenExpired - nowTime < marginTime) {
          setIsRefreshed({ state: false, callback: callback });
          setTimeout(() => {
            setIsRefreshed({ state: true, callback: () => {} });
          }, 1000);
        } else {
          // 뮤테이션일때는 그냥 콜백 실행함
          if (type === "mutation") {
            callback();
          }
        }
      } else if (["Partner", "Creator"].includes(refreshTokenRole)) {
      } else {
        adminLoggedInVar(false);
      }
    } catch (error) {
      adminLoggedInVar(false);
      router.push(`/admin/log-in?error=${error}`);
    }
  };

  return tokenDecode;
};
