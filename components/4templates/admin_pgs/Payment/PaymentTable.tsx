import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Org_adminTable from "../../../3organisms/Org_adminTable";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { datePrettier } from "../Question/fn_DatePrettier";
import { formSelector } from "../Question/fn_formSelector";
import { paymentFormData, paymentFormDefalut } from "./Var_paymentForm";

import {
  deletePayment,
  deletePaymentVariables,
} from "./__generated__/deletePayment";
import { editPayment, editPaymentVariables } from "./__generated__/editPayment";
import {
  findPayments,
  findPaymentsVariables,
} from "./__generated__/findPayments";
import {
  createPaymentForAdmin,
  createPaymentForAdminVariables,
} from "./__generated__/createPaymentForAdmin";

export const FIND_PAYMENTS = gql`
  query findPayments($input: FindPaymentsInput!) {
    findPayments(input: $input) {
      ok
      error
      payments {
        id
        createdAt
        tags
        brandName
        name
        phoneNumber
        email
        paymentMethod
        amount
        paymentState
        user {
          nameId
        }
      }
    }
  }
`;

export const CREATE_PAYMENT_FOR_ADMIN = gql`
  mutation createPaymentForAdmin($input: CreatePaymentForAdminInput!) {
    createPaymentForAdmin(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_PAYMENT = gql`
  mutation editPayment($input: EditPaymentInput!) {
    editPayment(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_PAYMENT = gql`
  mutation deletePayment($input: DeletePaymentInput!) {
    deletePayment(input: $input) {
      ok
      error
    }
  }
`;

export default function App() {
  const [paymentForm, setPaymentForm] = useRecoilState(paymentFormData);

  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  const columns = useMemo(
    () => [
      {
        Header: "생성일",
        accessor: "createdAt",
        width: 90,
        sortDescFirst: true,
      },
      {
        Header: "브랜드명(R)",
        accessor: "brandName_partner",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "브랜드명",
        accessor: "brandName",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "이름", accessor: "name", width: 150, sortDescFirst: true },
      {
        Header: "연락처",
        accessor: "phoneNumber",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "이메일", accessor: "email", width: 150, sortDescFirst: true },
      {
        Header: "결제수단",
        accessor: "paymentMethod",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "금액", accessor: "amount", width: 150, sortDescFirst: true },
      {
        Header: "결제상태",
        accessor: "paymentState",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "태그", accessor: "tags", width: 150, sortDescFirst: true },
      { Header: "dataId", accessor: "id", width: 0, sortDescFirst: true },
    ],
    []
  );

  //토큰체크
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findPaymentsLoading,
    error: findPaymentsError,
    data: findPaymentsData,
    refetch,
  } = useQuery<findPayments, findPaymentsVariables>(FIND_PAYMENTS, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findPaymentsData]);

  const paymentsData = useMemo(
    () =>
      findPaymentsData?.findPayments.payments?.map((val, idx) => ({
        ...val,
        createdAt: datePrettier(val.createdAt),
        brandName_partner: val.user?.nameId,
      })),
    [findPaymentsData]
  );

  //뮤테이션
  const [
    createPaymentForAdminMutation,
    {
      loading: createPaymentForAdminLoading,
      error: createPaymentForAdminError,
      data: createPaymentForAdminData,
    },
  ] = useMutation<createPaymentForAdmin, createPaymentForAdminVariables>(
    CREATE_PAYMENT_FOR_ADMIN,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  const [
    editPaymentMutation,
    { loading: editPaymentLoading, data: editPaymentData },
  ] = useMutation<editPayment, editPaymentVariables>(EDIT_PAYMENT, {
    onCompleted: () => {
      refetch();
    },
  });

  const [
    deletePaymentMutation,
    { loading: deletePaymentLoading, data: deletePaymentData },
  ] = useMutation<deletePayment, deletePaymentVariables>(DELETE_PAYMENT, {
    onCompleted: () => {
      refetch();
    },
  });

  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminCreateOpenAtom
  );

  const [isEditModalOpen, setisEditModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );

  const {
    register: register_create,
    handleSubmit: handleSubmit_create,
    reset: reset_create,
    setFocus: setFocus_create,
    getValues: getValues_create,
    formState: { errors: errors_create },
  } = useForm();

  const onSubmit_create = (data) => {
    tokenCheck("mutation", async () => {
      try {
        if (data.salesDate === "") {
          throw "매출일을 입력해주세요";
        } else if (data.targetDate === "") {
          throw "목표일을 입력해주세요";
        }
        console.log(data);
        await createPaymentForAdminMutation({
          variables: {
            input: {
              brandName_partner: data.brandName_partner,
              brandName: data.brandName,
              name: data.name,
              phoneNumber: data.phoneNumber,
              email: data.email,
              paymentMethod: data.paymentMethod,
              amount: +data.amount,
              paymentState: data.paymentState,
              tags: data.tags,
            },
          },
        });
        reset_create(
          paymentFormDefalut.reduce(
            (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
            {}
          )
        );
        setisModalOpen(false);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };

  const {
    register: register_edit,
    handleSubmit: handleSubmit_edit,
    reset: reset_edit,
    setFocus: setFocus_edit,
    getValues: getValues_edit,
    formState: { errors: errors_edit },
  } = useForm();

  const onSubmit_edit = (data) => {
    tokenCheck("mutation", async () => {
      console.log(formSelector("id", paymentForm));
      try {
        await editPaymentMutation({
          variables: {
            input: {
              brandName_partner: data.brandName_partner,
              brandName: data.brandName,
              name: data.name,
              phoneNumber: data.phoneNumber,
              email: data.email,
              paymentMethod: data.paymentMethod,
              amount: +data.amount,
              paymentState: data.paymentState,
              tags: data.tags,
              id: +formSelector("id", paymentForm),
            },
          },
        });
        reset_edit(
          paymentFormDefalut.reduce(
            (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
            {}
          )
        );
        setisEditModalOpen(false);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };

  if (findPaymentsError) {
    return (
      <>
        권한이 없습니다. <br />
        {findPaymentsError.message}
      </>
    );
  }
  if (findPaymentsLoading) {
    return <div className="">로딩중</div>;
  }
  return (
    <>
      <Org_adminTable
        columns={columns}
        data={paymentsData}
        customOptions={{
          setCreateReset: reset_create,
          getValues_create,
          getValues_edit,
          // openDetailPage: (selectedFlatRows) => {
          //   selectedFlatRows.forEach((val) => {
          //     window.open(
          //       window.location.href.replace("payment", "payment-management") +
          //         "/" +
          //         val.values.id
          //     );
          //   });
          // },
          refetch: () => {
            tokenCheck("query", refetch);
          },
          deleteMutation: (id) => {
            tokenCheck("mutation", () => {
              deletePaymentMutation({
                variables: {
                  input: {
                    id,
                  },
                },
              });
            });
          },
          setCreateFocus: () => {
            setFocus_create("brandName");
          },
          setEditRecoil: setPaymentForm,
          setEditReset: reset_edit,
          setEditFocus: setFocus_edit,
          createForm: (
            <>
              <form onSubmit={handleSubmit_create(onSubmit_create)}>
                <ul>
                  {paymentForm.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) && (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          {["salesDate", "targetDate"].includes(
                            val.accessor
                          ) ? (
                            <input
                              defaultValue={val.value}
                              {...register_create(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`date`}
                            />
                          ) : (
                            <input
                              defaultValue={val.value}
                              {...register_create(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`text`}
                            />
                          )}
                        </li>
                      )
                  )}
                </ul>
                <div className="flex justify-end mt-2">
                  <div
                    className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                    onClick={() => {
                      reset_create(
                        paymentFormDefalut.reduce(
                          (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
                          {}
                        )
                      );

                      setTimeout(() => {
                        setFocus_create("brandName");
                      }, 0);
                    }}
                  >
                    초기화
                  </div>
                  <div
                    className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                    onClick={() => {
                      setisModalOpen(false);
                    }}
                  >
                    취소
                  </div>
                  <button className="p-1 px-3 bg-orange-400 hover:bg-orange-500 rounded-md text-white cursor-pointer">
                    확인
                  </button>
                </div>
              </form>
            </>
          ),
          editForm: (
            <>
              <form onSubmit={handleSubmit_edit(onSubmit_edit)}>
                <ul>
                  {paymentForm.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) && (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          {["salesDate", "targetDate"].includes(
                            val.accessor
                          ) ? (
                            <input
                              defaultValue={val.value}
                              {...register_edit(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`date`}
                            />
                          ) : (
                            <input
                              defaultValue={val.value}
                              {...register_edit(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`text`}
                            />
                          )}
                        </li>
                      )
                  )}
                </ul>
                <div className="flex justify-end mt-2">
                  <div
                    className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                    onClick={() => {
                      setisEditModalOpen(false);
                    }}
                  >
                    취소
                  </div>
                  <button className="p-1 px-3 bg-orange-400 hover:bg-orange-500 rounded-md text-white cursor-pointer">
                    확인
                  </button>
                </div>
              </form>
            </>
          ),
        }}
      />
    </>
  );
}
