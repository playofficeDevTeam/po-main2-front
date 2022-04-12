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
      { Header: "생성일", accessor: "createdAt", width: 150 },
      { Header: "브랜드명", accessor: "brandName", width: 150 },
      { Header: "이름", accessor: "name", width: 150 },
      { Header: "연락처", accessor: "phoneNumber", width: 150 },
      { Header: "이메일", accessor: "email", width: 150 },
      {
        Header: "예산",
        accessor: "budget",
        width: 150,
        Filter: SelectColumnFilter,
      },
      { Header: "제품 링크", accessor: "productLink", width: 150 },
      { Header: "특이사항", accessor: "uniqueness", width: 150 },
      {
        Header: "대행사",
        accessor: "isAgency",
        width: 100,
        Filter: SelectColumnFilter,
      },
      { Header: "태그", accessor: "tags", width: 150 },
      { Header: "dataId", accessor: "id", width: 100 },
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
        createForm={
          <>
            <div className="">
              <ul>
                {questionForm.map((val, idx) => (
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
                ))}
              </ul>
              <div
                className="p-1 m-1 border cursor-pointer"
                onClick={() => {
                  tokenCheck("mutation", () => {
                    createQuestionForAdminMutation({
                      variables: {
                        input: {
                          brandName: questionForm[1].value,
                          name: questionForm[2].value,
                          phoneNumber: questionForm[3].value,
                          email: questionForm[4].value,
                          budget: questionForm[5].value,
                          productLink: questionForm[6].value,
                          uniqueness: questionForm[7].value,
                          isAgency:
                            questionForm[8].value === "true" ? true : false,
                          tags: questionForm[9].value,
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
                {questionForm.map((val, idx) => (
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
                ))}
              </ul>
              <div
                className="p-1 m-1 border cursor-pointer"
                onClick={() => {
                  tokenCheck("mutation", () => {
                    editQuestionForAdminMutation({
                      variables: {
                        input: {
                          createdAt: questionForm[0].value,
                          brandName: questionForm[1].value,
                          name: questionForm[2].value,
                          phoneNumber: questionForm[3].value,
                          email: questionForm[4].value,
                          budget: questionForm[5].value,
                          productLink: questionForm[6].value,
                          uniqueness: questionForm[7].value,
                          isAgency:
                            questionForm[8].value === "true" ? true : false,
                          tags: questionForm[9].value,
                          id: +questionForm[10].value,
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
            </div>
          </>
        }
      />
    </>
  );
}
