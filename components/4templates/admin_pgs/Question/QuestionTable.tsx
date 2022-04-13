import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo } from "react";
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
import { atom, useRecoilState } from "recoil";
import {
  questionFormData,
  useQuestionFormDataOnChange,
} from "./Var_questionForm";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import fn_DatePrettier from "./fn_DatePrettier";
import Org_adminTable, {
  SelectColumnFilter,
} from "../../../3organisms/Org_adminTable";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import { formSelector } from "./fn_formSelector";

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

let fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 10);
let toDate = new Date();
export default function App() {
  const [questionForm, setQuestionForm] = useRecoilState(questionFormData);
  const memoSetQuestionForm = useCallback(setQuestionForm, []);

  const questionFormOnChange = useQuestionFormDataOnChange();

  const columns = useMemo(
    () => [
      {
        Header: "생성일",
        accessor: "createdAt",
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
      { Header: "태그", accessor: "tags", width: 150, sortDescFirst: true },
      { Header: "dataId", accessor: "id", width: 100, sortDescFirst: true },
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
          fromDate,
          toDate,
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
          createdAt: fn_DatePrettier(val.createdAt),
          isAgency: val.isAgency?.toString(),
        })
      ),
    [findQuestionsForAdminData]
  );

  //뮤테이션
  const [
    createQuestionForAdminMutation,
    {
      loading: createQuestionForAdminLoading,
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
        deleteMutation={(id) => {
          deleteQuestionForAdminMutation({
            variables: {
              input: {
                id,
              },
            },
          });
        }}
        createForm={
          <>
            <div className="">
              <ul>
                {questionForm.map(
                  (val, idx) =>
                    !["id", "createdAt"].includes(val.accessor) && (
                      <li key={idx} className="flex">
                        <div className="w-40">{val.Header}</div>
                        <input
                          className="border p-1 m-1"
                          type="text"
                          value={val.value}
                          onChange={(e) => {
                            questionFormOnChange(e, idx);
                          }}
                        />
                      </li>
                    )
                )}
              </ul>
              <div
                className="p-1 m-1 border cursor-pointer"
                onClick={() => {
                  tokenCheck("mutation", () => {
                    createQuestionForAdminMutation({
                      variables: {
                        input: {
                          brandName: formSelector("brandName", questionForm),
                          name: formSelector("name", questionForm),
                          phoneNumber: formSelector(
                            "phoneNumber",
                            questionForm
                          ),
                          email: formSelector("email", questionForm),
                          budget: formSelector("budget", questionForm),
                          productLink: formSelector(
                            "productLink",
                            questionForm
                          ),
                          uniqueness: formSelector("uniqueness", questionForm),
                          isAgency:
                            formSelector("isAgency", questionForm) === "true"
                              ? true
                              : false,
                          tags: formSelector("tags", questionForm),
                        },
                      },
                    });
                  });
                  setQuestionForm((val) =>
                    val.map((val2) => ({ ...val2, value: "" }))
                  );
                  setisModalOpen(false);
                }}
              >
                확인
              </div>
              <div
                className=""
                onClick={() => {
                  setQuestionForm((val) =>
                    val.map((val2) => ({ ...val2, value: "" }))
                  );
                }}
              >
                초기화
              </div>
            </div>
          </>
        }
        setEditForm={setQuestionForm}
        editForm={
          <>
            <div className="">
              <ul>
                {questionForm.map(
                  (val, idx) =>
                    !["id", "createdAt"].includes(val.accessor) && (
                      <li key={idx} className="flex">
                        <div className="w-40">{val.Header}</div>
                        <input
                          className="border p-1 m-1"
                          type="text"
                          value={val.value}
                          onChange={(e) => {
                            questionFormOnChange(e, idx);
                          }}
                        />
                      </li>
                    )
                )}
              </ul>
              <div
                className="p-1 m-1 border cursor-pointer"
                onClick={() => {
                  tokenCheck("mutation", () => {
                    editQuestionForAdminMutation({
                      variables: {
                        input: {
                          brandName: formSelector("brandName", questionForm),
                          name: formSelector("name", questionForm),
                          phoneNumber: formSelector(
                            "phoneNumber",
                            questionForm
                          ),
                          email: formSelector("email", questionForm),
                          budget: formSelector("budget", questionForm),
                          productLink: formSelector(
                            "productLink",
                            questionForm
                          ),
                          uniqueness: formSelector("uniqueness", questionForm),
                          isAgency:
                            formSelector("isAgency", questionForm) === "true"
                              ? true
                              : false,
                          tags: formSelector("tags", questionForm),
                          id: +formSelector("id", questionForm),
                        },
                      },
                    });
                  });
                  setQuestionForm((val) =>
                    val.map((val2) => ({ ...val2, value: "" }))
                  );
                  setisEditModalOpen(false);
                }}
              >
                확인
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
