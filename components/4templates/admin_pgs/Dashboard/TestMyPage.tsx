import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { FIND_ME_FOR_ADMIN } from "../Admin/Gql_admin";
import MsRefreshBtn from "./MsRefreshBtn";
import { findMeforAdmin } from "./__generated__/findMeforAdmin";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  const { loading, error, data, refetch } =
    useQuery<findMeforAdmin>(FIND_ME_FOR_ADMIN);
  const tokenCheck = useTokenCheck();
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [loading]);

  if (error) {
    return (
      <>
        <div className="">권한이 없습니다</div>
      </>
    );
  }
  return (
    <div className="">
      <div className="">접속한 계정 : {data?.findMeforAdmin.admin?.email}</div>
      <MsRefreshBtn />
    </div>
  );
}
