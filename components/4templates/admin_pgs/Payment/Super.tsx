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

  //쿼리데이터 가공
  const paymentsData = useMemo(
    () =>
      query.data?.findPayments.payments?.map((val, idx) => ({
        ...val,
        brandName_partner: val.user?.nameId,
        salesPerson_nickname: val.salesPerson?.nickname,
      })),
    [query.data]
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
          createFunction: true,
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
