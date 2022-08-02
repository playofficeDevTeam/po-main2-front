import { useRouter } from "next/router";
import { useEffect } from "react";
import { adminLoggedInVar } from "../../../common/apollo";
import TestMyPage from "./TestMyPage";
export default function App() {
  const adminLoggedIn = adminLoggedInVar();
  const router = useRouter();
  useEffect(() => {
    if (adminLoggedIn === false) {
      router.push(`/admin/log-in`);
    }
  }, [adminLoggedIn]);
  return (
    <>
      <TestMyPage />
    </>
  );
}
