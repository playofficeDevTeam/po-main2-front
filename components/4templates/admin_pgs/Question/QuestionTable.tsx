import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  findQuestionsForAdmin,
  findQuestionsForAdminVariables,
} from "./__generated__/findQuestionsForAdmin";
import {
  editQuestionForAdmin,
  editQuestionForAdminVariables,
} from "./__generated__/editQuestionForAdmin";
import {
  createQuestionForAdmin,
  createQuestionForAdminVariables,
} from "./__generated__/createQuestionForAdmin";
import {
  deleteQuestionForAdmin,
  deleteQuestionForAdminVariables,
} from "./__generated__/deleteQuestionForAdmin";
import { useRecoilState } from "recoil";
import { questionFormData, questionFormDefalut } from "./Var_questionForm";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import Org_adminTable, {
  SelectColumnFilter,
} from "../../../3organisms/Org_adminTable";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import { formSelector } from "./fn_formSelector";
import { datePrettier } from "./fn_DatePrettier";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { useForm } from "react-hook-form";

export const FIND_QUESTIONS_FOR_ADMIN = gql`
  query findQuestionsForAdmin($input: FindQuestionsInput!) {
    findQuestionsForAdmin(input: $input) {
      ok
      error
      questions {
        id
        createdAt
        brandName
        tags
        name
        phoneNumber
        email
        budget
        productLink
        uniqueness
        isAgency
        user {
          nameId
        }
        product
        serviceInquired
        isAnalyzed
      }
    }
  }
`;

export const CREATE_QUESTION_FOR_ADMIN = gql`
  mutation createQuestionForAdmin($input: CreateQuestionForAdminInput!) {
    createQuestionForAdmin(input: $input) {
      ok
      error
      questionId
    }
  }
`;

export const EDIT_QUESTION_FOR_ADMIN = gql`
  mutation editQuestionForAdmin($input: EditQuestionInput!) {
    editQuestionForAdmin(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_QUESTION_FOR_ADMIN = gql`
  mutation deleteQuestionForAdmin($input: DeleteQuestionInput!) {
    deleteQuestionForAdmin(input: $input) {
      ok
      error
    }
  }
`;

export default function App() {
  const [questionForm, setQuestionForm] = useRecoilState(questionFormData);

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
        Header: "문의서비스",
        accessor: "serviceInquired",
        width: 150,
        sortDescFirst: true,
      },
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
    loading: findQuestionsForAdminLoading,
    error: findQuestionsForAdminError,
    data: findQuestionsForAdminData,
    refetch,
  } = useQuery<findQuestionsForAdmin, findQuestionsForAdminVariables>(
    FIND_QUESTIONS_FOR_ADMIN,
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
  }, [findQuestionsForAdminData]);

  const questionsData = useMemo(
    () =>
      findQuestionsForAdminData?.findQuestionsForAdmin.questions?.map(
        (val, idx) => ({
          ...val,
          createdAt: datePrettier(val.createdAt),
          isAgency: val.isAgency?.toString(),
          brandName_partner: val.user?.nameId,
        })
      ),
    [findQuestionsForAdminData]
  );

  //뮤테이션
  const [
    createQuestionForAdminMutation,
    {
      loading: createQuestionForAdminLoading,
      error: createQuestionForAdminError,
      data: createQuestionForAdminData,
    },
  ] = useMutation<createQuestionForAdmin, createQuestionForAdminVariables>(
    CREATE_QUESTION_FOR_ADMIN,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  const [
    editQuestionForAdminMutation,
    { loading: editQuestionForAdminLoading, data: editQuestionForAdminData },
  ] = useMutation<editQuestionForAdmin, editQuestionForAdminVariables>(
    EDIT_QUESTION_FOR_ADMIN,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  const [
    deleteQuestionForAdminMutation,
    {
      loading: deleteQuestionForAdminLoading,
      data: deleteQuestionForAdminData,
    },
  ] = useMutation<deleteQuestionForAdmin, deleteQuestionForAdminVariables>(
    DELETE_QUESTION_FOR_ADMIN,
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
        await createQuestionForAdminMutation({
          variables: {
            input: {
              brandName: data.brandName,
              brandName_partner: data.brandName_partner,
              product: data.product,
              serviceInquired: data.serviceInquired,
              isAnalyzed: data.isAnalyzed,
              name: data.name,
              phoneNumber: data.phoneNumber,
              email: data.email,
              budget: data.budget,
              productLink: data.productLink,
              uniqueness: data.uniqueness,
              isAgency: data.isAgency === "true" ? true : false,
              tags: data.tags,
            },
          },
        });
        reset_create(
          questionFormDefalut.reduce(
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
              serviceInquired: data.serviceInquired,
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
          openDetailPage: (selectedFlatRows) => {
            selectedFlatRows.forEach((val) => {
              window.open(
                window.location.href.replace(
                  "question",
                  "question-management"
                ) +
                  "/" +
                  val.values.id
              );
            });
          },
          refetch: () => {
            tokenCheck("query", refetch);
          },
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
                          {["uniqueness"].includes(val.accessor) ? (
                            <textarea
                              defaultValue={val.value}
                              {...register_create(val.accessor)}
                              className="border w-60 p-1 m-1"
                            ></textarea>
                          ) : (
                            <input
                              defaultValue={val.value}
                              {...register_create(val.accessor)}
                              className="border w-60 p-1 m-1"
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
