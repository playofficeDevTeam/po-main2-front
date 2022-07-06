import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  columnsInput,
  formFocus,
} from "../../../3organisms/Org_adminTable2/fn_inputControl";
import Modal_adminCreate, {
  isModal_adminCreateOpenAtom,
} from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import Modal_adminEdit, {
  isModal_adminEditOpenAtom,
} from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import { ColumnIndeterminateCheckbox } from "../../../3organisms/Org_adminTable/tableOptions";
import useShortCutEffect from "../../../3organisms/Org_adminTable/useShortCutEffect";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  adminExceptionDataInCreateForm,
  adminExceptionDataInEditForm,
  adminFocusId,
} from "./adminControlData";
import {
  CREATE_ADMIN,
  EDIT_ADMIN,
  DELETE_ADMIN,
  FIND_ALL_ADMIN,
  FIND_ME_FOR_ADMIN,
} from "./Gql_admin";
import {
  adminColumnsData,
  adminColumnsDefault,
  rawAdminColumnsData,
  useAdminColumnsDataOnChange,
} from "./Var_adminColumns";
import { createAdmin, createAdminVariables } from "./__generated__/createAdmin";
import { deleteAdmin, deleteAdminVariables } from "./__generated__/deleteAdmin";
import { editAdmin, editAdminVariables } from "./__generated__/editAdmin";
import { findAllAdmin } from "./__generated__/findAllAdmin";
import { findMeforAdmin } from "./__generated__/findMeforAdmin";

//폼 컴포넌트
function Form({ getToggleHideAllColumnsProps, allColumns, selectedFlatRows }) {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findAllAdminLoading,
    error: findAllAdminError,
    data: findAllAdminData,
    refetch,
  } = useQuery<findAllAdmin>(FIND_ALL_ADMIN);

  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findAllAdminData]);

  //생성 뮤테이션
  const [
    createAdminMutation,
    {
      loading: createAdminLoading,
      error: createAdminError,
      data: createAdminData,
    },
  ] = useMutation<createAdmin, createAdminVariables>(CREATE_ADMIN, {
    onCompleted: () => {
      refetch();
    },
  });

  //수정 뮤테이션
  const [
    editAdminMutation,
    { loading: editAdminLoading, error: editAdminError, data: editAdminData },
  ] = useMutation<editAdmin, editAdminVariables>(EDIT_ADMIN, {
    onCompleted: () => {
      refetch();
    },
  });

  //삭제 뮤테이션
  const [
    deleteAdminMutation,
    {
      loading: deleteAdminLoading,
      error: deleteAdminError,
      data: deleteAdminData,
    },
  ] = useMutation<deleteAdmin, deleteAdminVariables>(DELETE_ADMIN, {
    onCompleted: () => {
      refetch();
    },
  });

  //글로벌 스테이트 관리
  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminCreateOpenAtom
  );
  const [isEditModalOpen, setisEditModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );

  const [adminColumns, setAdminColumns] = useRecoilState(adminColumnsData);
  const [rawAdminColumns, setRawAdminColumns] =
    useRecoilState(rawAdminColumnsData);

  const onChange = useAdminColumnsDataOnChange();

  // 생성시 포커싱
  useEffect(() => {
    if (isModalOpen) {
      formFocus(adminFocusId);
    }
  }, [isModalOpen]);

  //수정시 테이블데이터 반영 및 포커싱
  useEffect(() => {
    if (isEditModalOpen) {
      setAdminColumns(rawAdminColumns);
      formFocus(rawAdminColumns.find((val) => val.selected)?.accessor || "");
    }
  }, [rawAdminColumns]);

  // 수정인풋
  const editInput = columnsInput(
    adminColumns,
    adminExceptionDataInEditForm.filter((val) => val !== "id")
  );
  const onSubmit_edit = () => {
    tokenCheck("mutation", async () => {
      try {
        await editAdminMutation({
          variables: {
            input: editInput,
          },
        });
        setAdminColumns(adminColumnsDefault);
        setisEditModalOpen(false);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };

  useShortCutEffect({ createBtn: true, hotkey: true }, setAdminColumns);

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
                    {adminColumns.map((val, idx) => {
                      if (
                        !adminExceptionDataInEditForm.includes(val.accessor)
                      ) {
                        if (["role"].includes(val.accessor)) {
                          return (
                            <>
                              <li key={idx}>
                                <div>
                                  <label
                                    htmlFor={val.accessor}
                                    className="form_label"
                                  >
                                    {val.Header}
                                  </label>
                                </div>
                                <select
                                  id={val.accessor}
                                  value={val.value}
                                  onChange={(e) => {
                                    onChange(e, idx);
                                  }}
                                  className="border w-96 p-1 m-1"
                                >
                                  <option value="General">일반</option>
                                  <option value="Super">슈퍼</option>
                                </select>
                              </li>
                            </>
                          );
                        } else {
                          return (
                            <li key={idx}>
                              <div>{val.Header}</div>
                              <input
                                id={val.accessor}
                                value={val.value}
                                onChange={(e) => {
                                  onChange(e, idx);
                                }}
                                className="border w-96 p-1 m-1"
                                type={`text`}
                              />
                            </li>
                          );
                        }
                      }
                    })}
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
                    deleteAdminMutation({
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
      </div>
    </>
  );
}
export default Form;
