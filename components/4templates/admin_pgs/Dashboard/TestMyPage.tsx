import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { FIND_ME_FOR_ADMIN } from "../Admin/Gql_admin";
import { findMeforAdmin } from "../Admin/__generated__/findMeforAdmin";
import MsPhotoBtn from "./MsPhotoBtn";
import MsRefreshBtn from "./MsRefreshBtn";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const tokenCheck = useTokenCheck();
  //쿼리
  const {
    loading: findMeforAdminLoading,
    error: findMeforAdminError,
    data: findMeforAdminData,
    refetch,
  } = useQuery<findMeforAdmin>(FIND_ME_FOR_ADMIN);

  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findMeforAdminData]);

  if (findMeforAdminError) {
    return (
      <>
        <div className="">권한이 없습니다</div>
      </>
    );
  }
  return (
    <div className="">
      <div className="">
        접속한 계정 : {findMeforAdminData?.findMeforAdmin.admin?.email}
      </div>
      <MsRefreshBtn />
      <MsPhotoBtn />
    </div>
  );
}
