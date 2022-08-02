import * as jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { adminLoggedInVar, userLoggedInVar } from "../common/apollo";
import { isRefreshedAtom } from "../common/UserDetect";

export const useTokenCheck = () => {
  //어드민 토큰 리프레쉬
  const router = useRouter();

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

      //어드민 계정일때
      if (["Super", "General"].includes(refreshTokenRole)) {
        userLoggedInVar(false);
        //리프레시토큰 만료시
        if (refreshTokenExpired - nowTime < marginTime) {
          adminLoggedInVar(false);
        }
        //리프레시토큰 살아있을시
        else {
          //액세스토큰 만료시
          if (!accessToken || accessTokenExpired - nowTime < marginTime) {
            setIsRefreshed({ state: false, callback: callback });
            setTimeout(() => {
              setIsRefreshed({ state: true, callback: () => {} });
            }, 1000);
          }
          //액세스토큰 살아있을시
          else {
            // 뮤테이션일때는 그냥 콜백 실행함
            if (type === "mutation") {
              callback();
            }
          }
          adminLoggedInVar(true);
        }
      }
      //유저 계정일때
      else if (["Partner", "Creator"].includes(refreshTokenRole)) {
        console.log(refreshTokenRole);
        adminLoggedInVar(false);
        //리프레시토큰 만료시
        if (refreshTokenExpired - nowTime < marginTime) {
          userLoggedInVar(false);
        }
        //리프레시토큰 살아있을시
        else {
          //액세스토큰 만료시
          if (!accessToken || accessTokenExpired - nowTime < marginTime) {
            setIsRefreshed({ state: false, callback: callback });
            setTimeout(() => {
              setIsRefreshed({ state: true, callback: () => {} });
            }, 1000);
          }
          //액세스토큰 살아있을시
          else {
            // 뮤테이션일때는 그냥 콜백 실행함
            if (type === "mutation") {
              callback();
            }
          }
          userLoggedInVar(true);
        }
      }
      //role 확인 불가일때
      else {
        adminLoggedInVar(false);
        userLoggedInVar(false);
      }
    } catch (error) {
      adminLoggedInVar(false);
      router.push(`/admin/log-in?error=${error}`);
    }
  };

  return tokenDecode;
};
