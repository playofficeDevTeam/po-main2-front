import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import Org_adminTable2 from "../../../3organisms/Org_adminTable2";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { FIND_ME_FOR_ADMIN } from "../Admin/Gql_admin";
import { findMeforAdmin } from "../Admin/__generated__/findMeforAdmin";
import { FIND_QUESTIONS_FOR_ADMIN } from "../Question/Gql_question";
import {
  findQuestionsForAdmin,
  findQuestionsForAdminVariables,
} from "../Question/__generated__/findQuestionsForAdmin";
import {
  FIND_PAYMENTS,
  CREATE_PAYMENT_FOR_ADMIN,
  EDIT_PAYMENT,
  DELETE_PAYMENT,
} from "./Gql_payment";
import {
  paymentColumnsDefault,
  rawPaymentColumnsData,
} from "./Var_paymentColumns";
import {
  createPaymentForAdmin,
  createPaymentForAdminVariables,
} from "./__generated__/createPaymentForAdmin";
import {
  deletePayment,
  deletePaymentVariables,
} from "./__generated__/deletePayment";
import { editPayment, editPaymentVariables } from "./__generated__/editPayment";
import {
  findPayments,
  findPaymentsVariables,
} from "./__generated__/findPayments";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //데이트 스테이트
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //쿼리
  const query = useQuery<findPayments, findPaymentsVariables>(FIND_PAYMENTS, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.data]);

  //조건 쿼리
  const filterQuery = useQuery<
    findQuestionsForAdmin,
    findQuestionsForAdminVariables
  >(FIND_QUESTIONS_FOR_ADMIN, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [filterQuery.data]);

  //나 쿼리
  const meQuery = useQuery<findMeforAdmin>(FIND_ME_FOR_ADMIN);
  useEffect(() => {
    tokenCheck("query", meQuery.refetch);
  }, [meQuery.data]);

  //데이터 가공
  const questionDatas =
    filterQuery.data?.findQuestionsForAdmin.questions?.filter(
      (val) =>
        val.contactPerson?.nickname ===
        meQuery.data?.findMeforAdmin.admin?.nickname
    );

  //쿼리데이터 가공
  const paymentsData = useMemo(
    () =>
      query.data?.findPayments.payments
        ?.filter(
          (val) =>
            questionDatas?.map((val2) => val2.name).includes(val.name) ||
            questionDatas
              ?.map((val2) => val2.phoneNumber)
              .includes(val.phoneNumber) ||
            questionDatas?.map((val2) => val2.email).includes(val.email) ||
            questionDatas?.map((val2) => val2.brandName).includes(val.brandName)
        )
        .map((val, idx) => ({
          ...val,
          brandName_partner: val.user?.nameId,
        })),
    [query.data, filterQuery.data, meQuery.data]
  );

  //테이블 컬럼 가공
  const columns = useMemo(() => paymentColumnsDefault, []);

  //생성 뮤테이션
  const createMutation = useMutation<
    createPaymentForAdmin,
    createPaymentForAdminVariables
  >(CREATE_PAYMENT_FOR_ADMIN, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //수정 뮤테이션
  const editMutation = useMutation<editPayment, editPaymentVariables>(
    EDIT_PAYMENT,
    {
      onCompleted: () => {
        query.refetch();
      },
    }
  );

  //삭제 뮤테이션
  const deleteMutation = useMutation<deletePayment, deletePaymentVariables>(
    DELETE_PAYMENT,
    {
      onCompleted: () => {
        query.refetch();
      },
    }
  );

  if (query.data) {
    return (
      <Org_adminTable2
        columns={columns}
        data={paymentsData}
        createMutation={createMutation}
        editMutation={editMutation}
        deleteMutation={deleteMutation}
        rawColumnsAtom={rawPaymentColumnsData}
        options={{
          dateFilter: true,
          createFunction: false,
          shortCutHotkey: true,
          // newPageLink: "/question",
          // tableTitle: tableTitle,
          extraCreateInputObject: {},
          extraEditInputObject: {},
        }}
      />
    );
  }
  return <></>;
}
