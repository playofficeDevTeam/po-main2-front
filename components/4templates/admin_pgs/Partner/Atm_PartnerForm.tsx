import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { UserRole } from "../../../../__generated__/globalTypes";
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
  FIND_USERS,
  CREATE_USER_FOR_ADMIN,
  EDIT_USER,
  DELETE_USER,
} from "./Gql_user";

import {
  partnerExceptionDataInCreateForm,
  partnerExceptionDataInEditForm,
  partnerFocusId,
} from "./partnerControlData";
import {
  partnerColumnsData,
  partnerColumnsDefault,
  rawPartnerColumnsData,
  usePartnerColumnsDataOnChange,
} from "./Var_partnerColumns";
import {
  createUserForAdmin,
  createUserForAdminVariables,
} from "./__generated__/createUserForAdmin";
import { deleteUser, deleteUserVariables } from "./__generated__/deleteUser";
import { editUser, editUserVariables } from "./__generated__/editUser";
import { findUsers, findUsersVariables } from "./__generated__/findUsers";

//폼 컴포넌트
function Form({ getToggleHideAllColumnsProps, allColumns, selectedFlatRows }) {
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //토큰체크
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findPartnersLoading,
    error: findPartnersError,
    data: findPartnersData,
    refetch,
  } = useQuery<findUsers, findUsersVariables>(FIND_USERS, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
        userRole: UserRole.Partner,
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findPartnersData]);

  //생성 뮤테이션
  const [
    createPartnerForAdminMutation,
    {
      loading: createPartnerForAdminLoading,
      error: createPartnerForAdminError,
      data: createPartnerForAdminData,
    },
  ] = useMutation<createUserForAdmin, createUserForAdminVariables>(
    CREATE_USER_FOR_ADMIN,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  //수정 뮤테이션
  const [
    editPartnerMutation,
    { loading: editPartnerLoading, data: editPartnerData },
  ] = useMutation<editUser, editUserVariables>(EDIT_USER, {
    onCompleted: () => {
      refetch();
    },
  });

  //삭제 뮤테이션
  const [
    deletePartnerMutation,
    { loading: deletePartnerLoading, data: deletePartnerData },
  ] = useMutation<deleteUser, deleteUserVariables>(DELETE_USER, {
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
  const [partnerColumns, setPartnerColumns] =
    useRecoilState(partnerColumnsData);
  const [rawPartnerColumns, setRawPartnerColumns] = useRecoilState(
    rawPartnerColumnsData
  );
  const onChange = usePartnerColumnsDataOnChange();

  // 생성시 포커싱
  useEffect(() => {
    if (isModalOpen) {
      formFocus(partnerFocusId);
    }
  }, [isModalOpen]);

  //수정시 테이블데이터 반영 및 포커싱
  useEffect(() => {
    if (isEditModalOpen) {
      setPartnerColumns(rawPartnerColumns);
      formFocus(rawPartnerColumns.find((val) => val.selected)?.accessor || "");
    }
  }, [rawPartnerColumns]);

  // 생성 인풋
  const createInput = columnsInput(partnerColumns, [
    ...partnerExceptionDataInCreateForm,
    "passwordCheck",
  ]);

  const onSubmit_create = () => {
    tokenCheck("mutation", async () => {
      try {
        if (
          partnerColumns.find((val) => val.accessor === "password")?.value ===
          partnerColumns.find((val) => val.accessor === "passwordCheck")?.value
        ) {
          await createPartnerForAdminMutation({
            variables: {
              input: { ...createInput, role: UserRole.Partner },
            },
          });
          setPartnerColumns(partnerColumnsDefault);
          setisModalOpen(false);
        } else {
          throw "비밀번호가 일치하지 않습니다";
        }
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        if (errorString.indexOf("UQ_e12875dfb3b1d92d7d7c5377e22") !== -1) {
          alert(`이메일(ID)이 중복됩니다.`);
        } else if (
          errorString.indexOf("UQ_1db0f40d9ff5904789eb33dc031") !== -1
        ) {
          alert(`브랜드명(ID)이 중복됩니다.`);
        } else {
          alert(pureError);
        }
      }
    });
  };

  // 수정인풋
  const editInput = columnsInput(
    partnerColumns,
    [...partnerExceptionDataInEditForm, "passwordCheck"].filter(
      (val) => val !== "id"
    )
  );

  const onSubmit_edit = () => {
    tokenCheck("mutation", async () => {
      try {
        if (
          partnerColumns.find((val) => val.accessor === "password")?.value ===
          partnerColumns.find((val) => val.accessor === "passwordCheck")?.value
        ) {
          await editPartnerMutation({
            variables: {
              input: editInput,
            },
          });
          setPartnerColumns(partnerColumnsDefault);
          setisEditModalOpen(false);
        } else {
          throw "비밀번호가 일치하지 않습니다";
        }
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        if (errorString.indexOf("UQ_e12875dfb3b1d92d7d7c5377e22") !== -1) {
          alert(`이메일(ID)이 중복됩니다.`);
        } else if (
          errorString.indexOf("UQ_1db0f40d9ff5904789eb33dc031") !== -1
        ) {
          alert(`이름(ID)이 중복됩니다.`);
        } else {
          alert(pureError);
        }
      }
    });
  };

  useShortCutEffect({ createBtn: true, hotkey: true }, setPartnerColumns);

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
                    {partnerColumns.map((val, idx) => {
                      if (
                        !partnerExceptionDataInCreateForm.includes(val.accessor)
                      ) {
                        if (
                          ["password", "passwordCheck"].includes(val.accessor)
                        ) {
                          return (
                            <>
                              <li key={idx}>
                                <div>{val.Header}*</div>
                                <input
                                  id={val.accessor}
                                  value={val.value}
                                  onChange={(e) => {
                                    onChange(e, idx);
                                  }}
                                  type={`password`}
                                />
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
                        setPartnerColumns(partnerColumnsDefault);
                        formFocus(partnerFocusId);
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
                    {partnerColumns.map((val, idx) => {
                      if (
                        !partnerExceptionDataInEditForm.includes(val.accessor)
                      ) {
                        if (
                          ["password", "passwordCheck"].includes(val.accessor)
                        ) {
                          return (
                            <>
                              <li key={idx}>
                                <div>{val.Header}</div>
                                <input
                                  id={val.accessor}
                                  value={val.value}
                                  onChange={(e) => {
                                    onChange(e, idx);
                                  }}
                                  className="border w-96 p-1 m-1"
                                  type={`password`}
                                />
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
                    deletePartnerMutation({
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
