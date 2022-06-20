import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      localStorage.setItem("refreshToken", router.query.refreshToken + "");
      localStorage.setItem(
        "socialRefreshToken",
        router.query.socialRefreshToken + ""
      );

      router.push("/admin/dashboard");
    }
  }, [router]);
  return <></>;
}
