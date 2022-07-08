import { gql, useMutation } from "@apollo/client";
import * as jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { RENEWAL_ADMIN_ACCESS_TOKEN } from "../4templates/admin_pgs/Login/Gql_login";
import {
  RenewalAdminAccessToken,
  RenewalAdminAccessTokenVariables,
} from "../4templates/admin_pgs/Login/__generated__/RenewalAdminAccessToken";
import { accessTokenVar, adminLoggedInVar } from "../common/apollo";

export const useTokenCheck = () => {
  //어드민 토큰 리프레쉬
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
        localStorage.setItem("accessToken", accessToken);
        accessTokenVar(accessToken);
        adminLoggedInVar(true);
      } else if (error) {
        throw (
          "오류가 생겼습니다. 다시 로그인해주세요." + " 에러메세지:" + error
        );
      }
    },
  });

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

      if (refreshTokenExpired - nowTime < marginTime) {
        throw "자동로그인 유효기한(1주)이 만료되었습니다. 다시 로그인해주세요.";
      }

      if (["Super", "General"].includes(refreshTokenRole)) {
        if (!accessToken || accessTokenExpired - nowTime < marginTime) {
          await renewalAdminAccessToken({
            variables: {
              input: {
                refreshToken,
              },
            },
          });
          callback();
        } else {
          if (type === "mutation") {
            callback();
          }
          adminLoggedInVar(true);
        }
      } else if (["Partner", "Creator"].includes(refreshTokenRole)) {
      } else {
        adminLoggedInVar(false);
      }
    } catch (error) {
      adminLoggedInVar(false);
      router.push("/admin/log-in");
      setTimeout(() => {
        alert(error);
      }, 100);
    }
  };
  return tokenDecode;
};
