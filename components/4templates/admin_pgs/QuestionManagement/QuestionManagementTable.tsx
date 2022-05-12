import { gql, useMutation, useQuery } from "@apollo/client";
import { useMemo, useEffect } from "react";
import { isChrome } from "react-device-detect";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Org_adminTable from "../../../3organisms/Org_adminTable";
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

import { questionFormDefalut } from "../Question/Var_questionForm";
import { dateSmall } from "./fn_DateSmall";

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
        state
        stateTime
        note
        comment
        question {
          id
          brandName
          product
          serviceInquired
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
        Header: "브랜드명",
        accessor: "brandName",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "스케쥴",
        accessor: "stateDate",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "제목",
        accessor: "stateName",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "상태", accessor: "state", width: 150, sortDescFirst: true },
      {
        Header: "시간",
        accessor: "stateTime",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "비고", accessor: "note", width: 150, sortDescFirst: true },
      {
        Header: "코멘트",
        accessor: "comment",
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
      { Header: "dataId", accessor: "id", width: 0 },
      { Header: "relationId", accessor: "relationId", width: 0 },
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

  const questionManagementData = useMemo(
    () =>
      findAllQuestionManagementData?.findAllQuestionManagement.questionManagements?.map(
        (val, idx) => ({
          ...val,
          createdAt: datePrettier(val.createdAt),
          stateDate: dateSmall(val.stateDate),
          brandName: val.question?.brandName,
          product: val.question?.product,
          serviceInquired: val.question?.serviceInquired,
          relationId: val.question?.id,
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
    getValues: getValues_create,
    formState: { errors: errors_create },
  } = useForm();

  const onSubmit_create = (data) => {
    tokenCheck("mutation", async () => {
      try {
        if (data.stateDate === "") {
          throw "스케쥴 날짜를 입력해주세요";
        }
        await createQuestionManagementMutation({
          variables: {
            input: {
              stateDate: data.stateDate,
              stateName: data.stateName,
              state: data.state,
              stateTime: data.stateTime,
              note: data.note,
              comment: data.comment,
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
    getValues: getValues_edit,
    formState: { errors: errors_edit },
  } = useForm();

  const onSubmit_edit = (data) => {
    tokenCheck("mutation", async () => {
      try {
        if (data.stateDate === "") {
          throw "스케쥴 날짜를 입력해주세요";
        }
        await editQuestionManagementMutation({
          variables: {
            input: {
              stateDate: data.stateDate,
              stateName: data.stateName,
              state: data.state,
              stateTime: data.stateTime,
              note: data.note,
              comment: data.comment,
              questionId: data.questionId,
              id: +formSelector("id", questionManagementForm),
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

  if (findAllQuestionManagementError) {
    return (
      <>
        권한이 없습니다. <br /> {findAllQuestionManagementError.message}
      </>
    );
  }
  if (findAllQuestionManagementLoading) {
    return <div className="">로딩중</div>;
  }
  return (
    <>
      <Org_adminTable
        columns={columns}
        data={questionManagementData}
        customOptions={{
          setCreateReset: reset_create,
          getValues_create,
          getValues_edit,
          openDetailPage: (selectedFlatRows) => {
            selectedFlatRows.forEach((val) => {
              window.open(window.location.href + "/" + val.values.relationId);
            });
          },
          refetch: () => {
            tokenCheck("query", refetch);
          },
          deleteMutation: (id) => {
            tokenCheck("mutation", () => {
              deleteQuestionManagementMutation({
                variables: {
                  input: {
                    id,
                  },
                },
              });
            });
          },
          setCreateFocus: () => {
            setFocus_create("stateName");
          },
          setEditRecoil: setQuestionManagementForm,
          setEditReset: reset_edit,
          setEditFocus: setFocus_edit,
          removeEditBtn: ["brandName", "product", "serviceInquired"],
          editForm: (
            <>
              <form onSubmit={handleSubmit_edit(onSubmit_edit)}>
                <ul>
                  {questionManagementForm.map(
                    (val, idx) =>
                      ![
                        "id",
                        "relationId",
                        "createdAt",
                        "brandName",
                        "product",
                        "serviceInquired",
                      ].includes(val.accessor) && (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          {["stateDate"].includes(val.accessor) ? (
                            <input
                              defaultValue={val.value}
                              {...register_edit(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`date`}
                            />
                          ) : ["note", "comment"].includes(val.accessor) ? (
                            <textarea
                              defaultValue={val.value}
                              {...register_edit(val.accessor)}
                              className={`border w-96 p-1 m-1 ${
                                ["comment"].includes(val.accessor) && "h-40"
                              }`}
                            ></textarea>
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
