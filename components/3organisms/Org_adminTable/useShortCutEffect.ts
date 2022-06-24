import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FIND_ME_FOR_ADMIN } from "../../4templates/admin_pgs/Admin/Gql_admin";
import { findMeforAdmin } from "../../4templates/admin_pgs/Admin/__generated__/findMeforAdmin";
import { useTokenCheck } from "../../hooks/useTokenCheck";
import { dateTime } from "./fn_DateTime";
import { isModal_adminCreateOpenAtom } from "./Modal_adminCreate";

export default function useShortCutEffect(
  getValues_create,
  reset_create,
  getValues_edit,
  reset_edit
) {
  const tokenCheck = useTokenCheck();
  //쿼리
  const {
    loading: findMeforAdminLoading,
    error: findMeforAdminError,
    data: findMeforAdminData,
    refetch: findMeforAdminRefetch,
  } = useQuery<findMeforAdmin>(FIND_ME_FOR_ADMIN);
  useEffect(() => {
    tokenCheck("query", findMeforAdminRefetch);
  }, [findMeforAdminData]);

  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminCreateOpenAtom
  );

  useEffect(() => {
    const handler = (e) => {
      try {
        if (e.shiftKey) {
          //시프트 c 누를때 생성
          if ([67].includes(e.keyCode)) {
            setisModalOpen(true);
          }
          //시프트 s/d누를때 닉네임/데이트 생성
          if ([83, 68].includes(e.keyCode)) {
            let newContent;

            if ([83].includes(e.keyCode)) {
              newContent = findMeforAdminData?.findMeforAdmin.admin?.nickname;
            } else if ([68].includes(e.keyCode)) {
              const date = new Date();
              const prettyDate = dateTime(date);
              newContent =
                findMeforAdminData?.findMeforAdmin.admin?.nickname +
                " " +
                prettyDate;
            }
            const focusedElement: any = document.activeElement;
            const getValue_create = getValues_create(focusedElement.name);
            setTimeout(() => {
              reset_create({
                [focusedElement.name]: getValue_create + newContent,
              });
            }, 0);
            const getValue_edit = getValues_edit(focusedElement.name);
            setTimeout(() => {
              reset_edit({
                [focusedElement.name]: getValue_edit + newContent,
              });
            }, 0);
          }
        }
      } catch (error) {}
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [findMeforAdminData]);
}
