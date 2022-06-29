import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import {
  formFocus,
  columnsInput,
} from "../../../3organisms/Org_adminTable/fn_inputControl";
import Modal_adminCreate, {
  isModal_adminCreateOpenAtom,
} from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import Modal_adminEdit, {
  isModal_adminEditOpenAtom,
} from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import { ColumnIndeterminateCheckbox } from "../../../3organisms/Org_adminTable/tableOptions";
import useShortCutEffect from "../../../3organisms/Org_adminTable/useShortCutEffect";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  FIND_QUESTIONS_FOR_ADMIN,
  CREATE_QUESTION_FOR_ADMIN,
  EDIT_QUESTION_FOR_ADMIN,
  DELETE_QUESTION_FOR_ADMIN,
} from "./Gql_question";
import {
  questionFocusId,
  questionExceptionDataInCreateForm,
  questionExceptionDataInEditForm,
} from "./questionControlData";
import {
  questionColumnsData,
  questionColumnsDefault,
  rawQuestionColumnsData,
  useQuestionColumnsDataOnChange,
} from "./Var_questionColumns";
import {
  createQuestionForAdmin,
  createQuestionForAdminVariables,
} from "./__generated__/createQuestionForAdmin";
import {
  deleteQuestionForAdmin,
  deleteQuestionForAdminVariables,
} from "./__generated__/deleteQuestionForAdmin";
import {
  editQuestionForAdmin,
  editQuestionForAdminVariables,
} from "./__generated__/editQuestionForAdmin";
import {
  findQuestionsForAdmin,
  findQuestionsForAdminVariables,
} from "./__generated__/findQuestionsForAdmin";

//폼 컴포넌트
function Form({ getToggleHideAllColumnsProps, allColumns, selectedFlatRows }) {
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

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

  //생성 뮤테이션
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
  //수정 뮤테이션
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

  //삭제 뮤테이션
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

  //글로벌 스테이트 관리
  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminCreateOpenAtom
  );
  const [isEditModalOpen, setisEditModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );

  const [questionColumns, setQuestionColumns] =
    useRecoilState(questionColumnsData);
  const [rawQuestionColumns, setRawQuestionColumns] = useRecoilState(
    rawQuestionColumnsData
  );
  const onChange = useQuestionColumnsDataOnChange();

  // 생성시 포커싱
  useEffect(() => {
    if (isModalOpen) {
      formFocus(questionFocusId);
    }
  }, [isModalOpen]);

  //수정시 테이블데이터 반영 및 포커싱
  useEffect(() => {
    if (isEditModalOpen) {
      setQuestionColumns(rawQuestionColumns);
      formFocus(rawQuestionColumns.find((val) => val.selected)?.accessor || "");
    }
  }, [rawQuestionColumns]);

  // 생성 인풋
  const createInput = columnsInput(
    questionColumns,
    questionExceptionDataInCreateForm
  );

  const onSubmit_create = () => {
    tokenCheck("mutation", async () => {
      try {
        await createQuestionForAdminMutation({
          variables: {
            input: createInput,
          },
        });
        setQuestionColumns(questionColumnsDefault);
        setisModalOpen(false);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };

  // 수정인풋
  const editInput = columnsInput(
    questionColumns,
    questionExceptionDataInEditForm.filter((val) => val !== "id")
  );
  const onSubmit_edit = () => {
    tokenCheck("mutation", async () => {
      try {
        await editQuestionForAdminMutation({
          variables: {
            input: editInput,
          },
        });
        setQuestionColumns(questionColumnsDefault);
        setisEditModalOpen(false);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };

  useShortCutEffect({ createBtn: true, hotkey: true }, setQuestionColumns);

  const [columnPopupState, setColumnPopupState] = useState(false);

  return (
    <>
      {/* 메뉴 */}
      <div className="flex py-2">
        {/* 생성 */}
        <div className="mr-3 cursor-pointer">
          <Modal_adminCreate
            data={{
              button: (
                <>
                  <div className="center w-20 h-8 bg-orange-400 rounded-md text-white hover:bg-orange-500">
                    <i className="fas fa-plus mr-2 text-sm"></i> 생성
                  </div>
                </>
              ),
              modal: (
                <form
                  onSubmit={(e) => {
                    onSubmit_create();
                    e.preventDefault();
                  }}
                >
                  <ul>
                    {questionColumns.map(
                      (val, idx) =>
                        !questionExceptionDataInCreateForm.includes(
                          val.accessor
                        ) && (
                          <li key={idx} className="flex items-center">
                            <div className="w-28 flex pl-1">{val.Header}</div>
                            {["uniqueness"].includes(val.accessor) ? (
                              <textarea
                                id={val.accessor}
                                value={val.value}
                                onChange={(e) => {
                                  onChange(e, idx);
                                }}
                                className="border w-96 p-1 m-1"
                              ></textarea>
                            ) : (
                              <input
                                id={val.accessor}
                                value={val.value}
                                onChange={(e) => {
                                  onChange(e, idx);
                                }}
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
                        setQuestionColumns(questionColumnsDefault);
                        formFocus(questionFocusId);
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
              ),
            }}
          />
        </div>

        {/* 수정모달 */}
        <div className="">
          <Modal_adminEdit
            data={{
              button: <></>,
              modal: (
                <form
                  onSubmit={(e) => {
                    onSubmit_edit();
                    e.preventDefault();
                  }}
                >
                  <ul>
                    {questionColumns.map(
                      (val, idx) =>
                        !questionExceptionDataInEditForm.includes(
                          val.accessor
                        ) && (
                          <li key={idx} className="flex items-center">
                            <div className="w-28 flex pl-1">{val.Header}</div>
                            {!["uniqueness"].includes(val.accessor) ? (
                              <input
                                id={val.accessor}
                                value={val.value}
                                onChange={(e) => {
                                  onChange(e, idx);
                                }}
                                className="border w-96 p-1 m-1"
                                type={`text`}
                              />
                            ) : (
                              <textarea
                                id={val.accessor}
                                value={val.value}
                                onChange={(e) => {
                                  onChange(e, idx);
                                }}
                                className="border w-96 p-1 m-1"
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
              ),
            }}
          />
        </div>

        {/* 열선택 */}
        <div className="mr-3">
          <div
            className="center w-20 h-8 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300 cursor-pointer"
            onClick={() => {
              setColumnPopupState((state) => !state);
            }}
          >
            <i className="fas fa-columns mr-2"></i>
            <span className="mr-2">열</span>
            {columnPopupState ? (
              <i className="fas fa-caret-up"></i>
            ) : (
              <i className="fas fa-caret-down"></i>
            )}
          </div>

          {columnPopupState && (
            <div className="h-0 w-0 relative z-50 top-1">
              <div className="w-48 p-3 px-4 bg-white border rounded-md shadow-md">
                <div className="py-1 flex items-center">
                  <ColumnIndeterminateCheckbox
                    {...getToggleHideAllColumnsProps()}
                  />{" "}
                  <span className="ml-2">전체 선택</span>
                </div>
                {allColumns.map(
                  (column) =>
                    !["selection", "id"].includes(column.id) && (
                      <div key={column.id} className="py-1">
                        <label className="flex items-center cursor-pointer">
                          <input
                            className="w-4 h-4 mr-2"
                            type="checkbox"
                            {...column.getToggleHiddenProps()}
                          />{" "}
                          {column.Header}
                        </label>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>

        {/* 삭제 */}
        {selectedFlatRows.length !== 0 && (
          <div
            className="mr-3 cursor-pointer center w-14 h-8 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300 "
            onClick={() => {
              try {
                if (selectedFlatRows.length > 4) {
                  throw "5개 이상의 데이터를 한번에 지울 수 없습니다.";
                }
                const returnValue = confirm("정말로 삭제하시겠습니까?");
                if (returnValue) {
                  const selectedIds = selectedFlatRows.map(
                    (val) => val.original.id
                  );
                  tokenCheck("mutation", () => {
                    deleteQuestionForAdminMutation({
                      variables: {
                        input: {
                          ids: selectedIds,
                        },
                      },
                    });
                  });
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </div>
        )}

        {/* {새창열기} */}
        {selectedFlatRows.length !== 0 ? (
          <div
            className="mr-3 cursor-pointer center px-3 h-8 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300"
            onClick={() => {
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
            }}
          >
            상세정보 열기
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default Form;
