import { gql, useMutation, useQuery } from "@apollo/client";
import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Org_adminTable, {
  SelectColumnFilter,
} from "../../../3organisms/Org_adminTable";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { datePrettier } from "../Question/fn_DatePrettier";
import { formSelector } from "../Question/fn_formSelector";
import {
  FIND_QUESTIONS_FOR_ADMIN,
  CREATE_QUESTION_FOR_ADMIN,
  EDIT_QUESTION_FOR_ADMIN,
  DELETE_QUESTION_FOR_ADMIN,
} from "../Question/QuestionTable";
import { questionFormDefalut } from "../Question/Var_questionForm";
import {
  createQuestionForAdmin,
  createQuestionForAdminVariables,
} from "../Question/__generated__/createQuestionForAdmin";
import {
  deleteQuestionForAdmin,
  deleteQuestionForAdminVariables,
} from "../Question/__generated__/deleteQuestionForAdmin";
import {
  editQuestionForAdmin,
  editQuestionForAdminVariables,
} from "../Question/__generated__/editQuestionForAdmin";
import {
  questionManagementFormData,
  questionManagementFormDefalut,
} from "./Var_questionManagementForm";
import {
  createQuestionManagement,
  createQuestionManagementVariables,
} from "./__generated__/createQuestionManagement";
import {
  deleteQuestionManagement,
  deleteQuestionManagementVariables,
} from "./__generated__/deleteQuestionManagement";
import {
  editQuestionManagement,
  editQuestionManagementVariables,
} from "./__generated__/editQuestionManagement";
import {
  findAllQuestionManagement,
  findAllQuestionManagementVariables,
} from "./__generated__/findAllQuestionManagement";

export const FIND_ALL_QUESTION_MANAGEMENT = gql`
  query findAllQuestionManagement($input: FindAllQuestionManagementInput!) {
    findAllQuestionManagement(input: $input) {
      ok
      error
      questionManagements {
        id
        createdAt
        stateDate
        stateName
        stateTime
        note
        question {
          id
        }
        questionId
      }
    }
  }
`;

export const CREATE_QUESTION_MANAGEMENT = gql`
  mutation createQuestionManagement($input: CreateQuestionManagementInput!) {
    createQuestionManagement(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_QUESTION_MANAGEMENT = gql`
  mutation editQuestionManagement($input: EditQuestionManagementInput!) {
    editQuestionManagement(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_QUESTION_MANAGEMENT = gql`
  mutation deleteQuestionManagement($input: DeleteQuestionManagementInput!) {
    deleteQuestionManagement(input: $input) {
      ok
      error
    }
  }
`;

export default function App() {
  const [questionManagementForm, setQuestionManagementForm] = useRecoilState(
    questionManagementFormData
  );

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

      { Header: "제품", accessor: "product", width: 150, sortDescFirst: true },
      {
        Header: "분석유무",
        accessor: "isAnalyzed",
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
        Header: "예산",
        accessor: "budget",
        width: 150,
        Filter: SelectColumnFilter,

        sortDescFirst: true,
      },
      {
        Header: "제품 링크",
        accessor: "productLink",
        width: 150,

        sortDescFirst: true,
      },
      {
        Header: "특이사항",
        accessor: "uniqueness",
        width: 150,

        sortDescFirst: true,
      },
      {
        Header: "대행사",
        accessor: "isAgency",
        width: 100,
        Filter: SelectColumnFilter,

        sortDescFirst: true,
      },
      {
        Header: "태그",
        accessor: "tags",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "dataId",
        accessor: "id",
        width: 0,
      },
    ],
    []
  );

  //토큰체크
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findAllQuestionManagementLoading,
    error: findAllQuestionManagementError,
    data: findAllQuestionManagementData,
    refetch,
  } = useQuery<findAllQuestionManagement, findAllQuestionManagementVariables>(
    FIND_ALL_QUESTION_MANAGEMENT,
    {
      variables: {
        input: {
          fromDate: dateToInput(tableFromDateState),
          toDate: dateToInput(tableToDateState),
        },
      },
    }
  );
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findAllQuestionManagementData]);

  const questionsData = useMemo(
    () =>
      findAllQuestionManagementData?.findAllQuestionManagement.questionManagements?.map(
        (val, idx) => ({
          ...val,
          createdAt: datePrettier(val.createdAt),
        })
      ),
    [findAllQuestionManagementData]
  );

  //뮤테이션
  const [
    createQuestionManagementMutation,
    {
      loading: createQuestionManagementLoading,
      error: createQuestionManagementError,
      data: createQuestionManagementData,
    },
  ] = useMutation<createQuestionManagement, createQuestionManagementVariables>(
    CREATE_QUESTION_MANAGEMENT,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  const [
    editQuestionManagementMutation,
    {
      loading: editQuestionManagementLoading,
      data: editQuestionManagementData,
    },
  ] = useMutation<editQuestionManagement, editQuestionManagementVariables>(
    EDIT_QUESTION_MANAGEMENT,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  const [
    deleteQuestionManagementMutation,
    {
      loading: deleteQuestionManagementLoading,
      data: deleteQuestionManagementData,
    },
  ] = useMutation<deleteQuestionManagement, deleteQuestionManagementVariables>(
    DELETE_QUESTION_MANAGEMENT,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

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
    formState: { errors: errors_create },
  } = useForm();

  const onSubmit_create = (data) => {
    tokenCheck("mutation", async () => {
      try {
        await createQuestionManagementMutation({
          variables: {
            input: {
              stateDate: data.stateDate,
              stateName: data.stateName,
              state: data.state,
              stateTime: data.stateTime,
              note: data.note,
              questionId: data.questionId,
            },
          },
        });
        reset_create(
          questionManagementFormDefalut.reduce(
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
    formState: { errors: errors_edit },
  } = useForm();

  const onSubmit_edit = (data) => {
    tokenCheck("mutation", async () => {
      try {
        await editQuestionForAdminMutation({
          variables: {
            input: {
              brandName: data.brandName,
              brandName_partner: data.brandName_partner,
              product: data.product,
              isAnalyzed: data.isAnalyzed,
              name: data.name,
              phoneNumber: data.phoneNumber,
              email: data.email,
              budget: data.budget,
              productLink: data.productLink,
              uniqueness: data.uniqueness,
              isAgency: data.isAgency === "true" ? true : false,
              tags: data.tags,
              id: +formSelector("id", questionForm),
            },
          },
        });
        reset_edit(
          questionFormDefalut.reduce(
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

  if (findQuestionsForAdminError) {
    return <>권한이 없습니다.</>;
  }
  if (findQuestionsForAdminLoading) {
    return <div className="">로딩중</div>;
  }
  return (
    <>
      <Org_adminTable
        columns={columns}
        data={questionsData}
        customOptions={{
          refetch: refetch,
          deleteMutation: (id) => {
            tokenCheck("mutation", () => {
              deleteQuestionForAdminMutation({
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
          setEditRecoil: setQuestionForm,
          setEditReset: reset_edit,
          setEditFocus: setFocus_edit,
          createForm: (
            <>
              <form onSubmit={handleSubmit_create(onSubmit_create)}>
                <ul>
                  {questionForm.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) && (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          {!["uniqueness"].includes(val.accessor) ? (
                            <input
                              defaultValue={val.value}
                              {...register_create(val.accessor)}
                              className="border w-60 p-1 m-1"
                              type={`text`}
                            />
                          ) : (
                            <textarea
                              defaultValue={val.value}
                              {...register_create(val.accessor)}
                              className="border w-60 p-1 m-1"
                            ></textarea>
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
                        questionFormDefalut.reduce(
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
                  {questionForm.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) && (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          {!["uniqueness"].includes(val.accessor) ? (
                            <input
                              defaultValue={val.value}
                              {...register_edit(val.accessor)}
                              className="border w-60 p-1 m-1"
                              type={`text`}
                            />
                          ) : (
                            <textarea
                              defaultValue={val.value}
                              {...register_edit(val.accessor)}
                              className="border w-60 p-1 m-1"
                            ></textarea>
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
