import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { nicknameAtom } from "../../../../3organisms/Org_header/Org_adminSidebar";
import { refreshTokenVar } from "../../../../common/apollo";
import * as jwt from "jsonwebtoken";

export default function App() {
  const router = useRouter();
  const refreshToken = router.query.refreshToken + "";

  useEffect(() => {
    if (router.query.refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem(
        "socialRefreshToken",
        router.query.socialRefreshToken + ""
      );

      refreshTokenVar(refreshToken);

      router.push("/admin/dashboard");
    }
  }, [router]);
  return <></>;
}
