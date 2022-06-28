import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FIND_ME_FOR_ADMIN } from "../../4templates/admin_pgs/Admin/Gql_admin";
import { findMeforAdmin } from "../../4templates/admin_pgs/Admin/__generated__/findMeforAdmin";
import { paymentColumnsData } from "../../4templates/admin_pgs/Payment/Var_paymentColumns";
import { useTokenCheck } from "../../hooks/useTokenCheck";
import { dateTime } from "./fn_DateTime";
import { isModal_adminCreateOpenAtom } from "./Modal_adminCreate";
import { isModal_adminEditOpenAtom } from "./Modal_adminEdit";

export default function useShortCutEffect(input: {
  createBtn: boolean;
  hotkey: boolean;
}) {
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
  const [isEditModalOpen, setisEditModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );
  const [paymentColumns, setPaymentColumns] =
    useRecoilState(paymentColumnsData);

  useEffect(() => {
    const handler = (e) => {
      try {
        if (e.shiftKey) {
          //시프트 c 누를때 생성
          if ([67].includes(e.keyCode) && input.createBtn && !isEditModalOpen) {
            setisModalOpen(true);
          }
          //시프트 s/d누를때 닉네임/데이트 생성
          if ([83, 68].includes(e.keyCode) && input.hotkey) {
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
            const selectedElement: any = document.getElementById(
              focusedElement.id
            );
            const selectedValue = selectedElement.value;
            setTimeout(() => {
              setPaymentColumns((state) =>
                state.map((val) =>
                  val.accessor === focusedElement.id
                    ? { ...val, value: selectedValue + newContent }
                    : val
                )
              );
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
