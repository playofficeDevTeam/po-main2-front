import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { datePrettier } from "../../../3organisms/Org_adminTable/fn_DatePrettier";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import Modal_adminEdit, {
  isModal_adminEditOpenAtom,
} from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import { ColumnIndeterminateCheckbox } from "../../../3organisms/Org_adminTable/tableOptions";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { dateSmall } from "/home/app/components/3organisms/Org_adminTable/fn_DateSmall";
import {
  FIND_ALL_QUESTION_MANAGEMENT,
  CREATE_QUESTION_MANAGEMENT,
  EDIT_QUESTION_MANAGEMENT,
  DELETE_QUESTION_MANAGEMENT,
} from "./Gql_questionManagement";
import {
  questionManagementFocusId,
  questionManagementExceptionDataInCreateForm,
  questionManagementExceptionDataInEditForm,
} from "./questionManagementControlData";
import {
  questionManagementColumnsData,
  questionManagementColumnsDefault,
  rawQuestionManagementColumnsData,
  useQuestionManagementColumnsDataOnChange,
} from "./Var_questionManagementColumns";
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
import useShortCutEffect from "../../../3organisms/Org_adminTable/useShortCutEffect";
import {
  formFocus,
  columnsInput,
} from "../../../3organisms/Org_adminTable/fn_inputControl";

//폼 컴포넌트
function Form({ getToggleHideAllColumnsProps, allColumns, selectedFlatRows }) {
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

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

  //생성 뮤테이션
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

  //수정 뮤테이션
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

  //삭제 뮤테이션
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

  //글로벌 스테이트 관리
  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminCreateOpenAtom
  );
  const [isEditModalOpen, setisEditModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );

  const [questionManagementColumns, setQuestionManagementColumns] =
    useRecoilState(questionManagementColumnsData);
  const [rawQuestionManagementColumns, setRawQuestionManagementColumns] =
    useRecoilState(rawQuestionManagementColumnsData);

  const onChange = useQuestionManagementColumnsDataOnChange();

  // 생성시 포커싱
  useEffect(() => {
    if (isModalOpen) {
      formFocus(questionManagementFocusId);
    }
  }, [isModalOpen]);

  //수정시 테이블데이터 반영 및 포커싱
  useEffect(() => {
    if (isEditModalOpen) {
      setQuestionManagementColumns(rawQuestionManagementColumns);
      formFocus(
        rawQuestionManagementColumns.find((val) => val.selected)?.accessor || ""
      );
    }
  }, [rawQuestionManagementColumns]);

  // 생성 인풋
  const createInput = columnsInput(
    questionManagementColumns,
    questionManagementExceptionDataInCreateForm
  );

  const onSubmit_create = (data) => {
    tokenCheck("mutation", async () => {
      try {
        await createQuestionManagementMutation({
          variables: {
            input: createInput,
          },
        });
        setQuestionManagementColumns(questionManagementColumnsDefault);
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
    questionManagementColumns,
    questionManagementExceptionDataInEditForm.filter((val) => val !== "id")
  );

  const onSubmit_edit = () => {
    tokenCheck("mutation", async () => {
      console.log(editInput);
      try {
        if (editInput.stateDate === "Invalid Date") {
          throw "스케쥴 날짜를 입력해주세요";
        }
        await editQuestionManagementMutation({
          variables: {
            input: editInput,
          },
        });
        setQuestionManagementColumns(questionManagementColumnsDefault);
        setisEditModalOpen(false);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };

  useShortCutEffect(
    { createBtn: true, hotkey: true },
    setQuestionManagementColumns
  );

  const [columnPopupState, setColumnPopupState] = useState(false);

  return (
    <>
      {/* 메뉴 */}
      <div className="flex py-2">
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
                    {questionManagementColumns.map(
                      (val, idx) =>
                        !questionManagementExceptionDataInEditForm.includes(
                          val.accessor
                        ) && (
                          <li key={idx} className="flex items-center">
                            <div className="w-28 flex pl-1">{val.Header}</div>
                            {["stateDate"].includes(val.accessor) ? (
                              <input
                                id={val.accessor}
                                value={val.value}
                                onChange={(e) => {
                                  onChange(e, idx);
                                }}
                                className="border w-96 p-1 m-1"
                                type={`date`}
                              />
                            ) : ["note", "comment"].includes(val.accessor) ? (
                              <textarea
                                id={val.accessor}
                                value={val.value}
                                onChange={(e) => {
                                  onChange(e, idx);
                                }}
                                className={`border w-96 p-1 m-1 ${
                                  ["comment"].includes(val.accessor) && "h-40"
                                }`}
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
                    deleteQuestionManagementMutation({
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
                window.open(window.location.href + "/" + val.values.relationId);
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
