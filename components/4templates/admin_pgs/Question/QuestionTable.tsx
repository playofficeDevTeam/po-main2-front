import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  findQuestionsForAdmin,
  findQuestionsForAdminVariables,
} from "./__generated__/findQuestionsForAdmin";
import Org_adminTable, {
  SelectColumnFilter,
} from "../../../3organisms/Org_adminTable";
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

export const FIND_QUESTIONS_FOR_ADMIN = gql`
  query findQuestionsForAdmin($input: FindQuestionsInput!) {
    findQuestionsForAdmin(input: $input) {
      ok
      error
      questions {
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
  const questionFormOnChange = useQuestionFormDataOnChange();

  const columns = useMemo(
    () => [
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
        width: 150,
        Filter: SelectColumnFilter,
      },
      { Header: "태그", accessor: "tags", width: 150 },
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
    () => findQuestionsForAdminData?.findQuestionsForAdmin.questions,
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
        console.log("complete");
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
    return <>로딩중</>;
  }

  return (
    <>
      <Org_adminTable
        columns={columns}
        data={questionsData?.map((val, idx) => ({
          ...val,
          isAgency: val.isAgency?.toString(),
        }))}
        createForm={
          <>
            <div className="">
              <ul>
                {columns.map((val, idx) => (
                  <li key={idx}>
                    <input
                      className="border p-1 m-1"
                      type="text"
                      value={questionForm[idx]}
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
                          brandName: questionForm[0],
                          name: questionForm[1],
                          phoneNumber: questionForm[2],
                          email: questionForm[3],
                          budget: questionForm[4],
                          productLink: questionForm[5],
                          uniqueness: questionForm[6],
                          isAgency: questionForm[7] === "true" ? true : false,
                          tags: questionForm[8],
                        },
                      },
                    });
                  });
                  setQuestionForm((val) => val.map((val2) => ""));
                  setisModalOpen(false);
                }}
              >
                확인
              </div>
              <div
                className=""
                onClick={() => {
                  setQuestionForm((val) => val.map((val2) => ""));
                }}
              >
                초기화
              </div>
            </div>
          </>
        }
        setEditFormState={setQuestionForm}
        editForm={
          <>
            <div className="">
              <ul>
                {columns.map((val, idx) => (
                  <li key={idx}>
                    <input
                      className="border p-1 m-1"
                      type="text"
                      value={questionForm[idx]}
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
                          brandName: questionForm[0],
                          name: questionForm[1],
                          phoneNumber: questionForm[2],
                          email: questionForm[3],
                          budget: questionForm[4],
                          productLink: questionForm[5],
                          uniqueness: questionForm[6],
                          isAgency: questionForm[7] === "true" ? true : false,
                          tags: questionForm[8],
                        },
                      },
                    });
                  });
                  setQuestionForm((val) => val.map((val2) => ""));
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
