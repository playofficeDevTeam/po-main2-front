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
  questionFormDefalut,
  useQuestionFormDataOnChange,
} from "./Var_questionForm";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import Org_adminTable, {
  DefaultColumnFilter,
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

  const questionFormOnChange = useQuestionFormDataOnChange();

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

  const {
    register: register_create,
    handleSubmit: handleSubmit_create,
    reset: reset_create,
    formState: { errors: errors_create },
  } = useForm();

  const onSubmit_create = (data) => {
    tokenCheck("mutation", () => {
      createQuestionForAdminMutation({
        variables: {
          input: {
            brandName: data.brandName,
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
    });
    reset_create(
      questionFormDefalut.reduce(
        (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
        {}
      )
    );
    setisModalOpen(false);
  };

  const {
    register: register_edit,
    handleSubmit: handleSubmit_edit,
    reset: reset_edit,
    formState: { errors: errors_edit },
  } = useForm();

  const onSubmit_edit = (data) => {
    tokenCheck("mutation", () => {
      console.log(data);
      editQuestionForAdminMutation({
        variables: {
          input: {
            brandName: data.brandName,
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
    });
    reset_edit(
      questionFormDefalut.reduce(
        (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
        {}
      )
    );
    setisEditModalOpen(false);
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
        deleteMutation={(id) => {
          tokenCheck("mutation", () => {
            deleteQuestionForAdminMutation({
              variables: {
                input: {
                  id,
                },
              },
            });
          });
        }}
        createForm={
          <>
            <form onSubmit={handleSubmit_create(onSubmit_create)}>
              <ul>
                {questionForm.map(
                  (val, idx) =>
                    !["id", "createdAt"].includes(val.accessor) && (
                      <li key={idx} className="flex items-center">
                        <div className="w-28 flex pl-1">{val.Header}</div>
                        <input
                          defaultValue={val.value}
                          {...register_create(val.accessor)}
                          className="border p-1 m-1"
                          type="text"
                        />
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
        }
        setEditForm={{ setRecoil: setQuestionForm, setReset: reset_edit }}
        editForm={
          <>
            <form onSubmit={handleSubmit_edit(onSubmit_edit)}>
              <ul>
                {questionForm.map(
                  (val, idx) =>
                    !["id", "createdAt"].includes(val.accessor) && (
                      <li key={idx} className="flex items-center">
                        <div className="w-28 flex pl-1">{val.Header}</div>
                        <input
                          defaultValue={val.value}
                          {...register_edit(val.accessor)}
                          className="border p-1 m-1"
                          type="text"
                        />
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
        }
      />
    </>
  );
}
