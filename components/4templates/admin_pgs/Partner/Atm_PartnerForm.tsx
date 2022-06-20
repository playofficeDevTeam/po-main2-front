import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { UserRole } from "../../../../__generated__/globalTypes";
import { dateTime } from "../../../3organisms/Org_adminTable/fn_DateTime";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { formSelector } from "../../../3organisms/Org_adminTable/fn_formSelector";
import Modal_adminCreate, {
  isModal_adminCreateOpenAtom,
} from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import Modal_adminEdit, {
  isModal_adminEditOpenAtom,
} from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import { ColumnIndeterminateCheckbox } from "../../../3organisms/Org_adminTable/tableOptions";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { nickNameAtom } from "../../../3organisms/Org_header/Org_adminSidebar";
import { useTokenCheck } from "../../../hooks/useTokenCheck";

import {
  CREATE_USER_FOR_ADMIN,
  DELETE_USER,
  EDIT_USER,
  FIND_USERS,
} from "./Gql_user";
import {
  partnerExceptionDataInCreateForm,
  partnerExceptionDataInEditForm,
  partnerFocusId,
} from "./partnerControlData";
import {
  partnerColumnsData,
  partnerColumnsDefault,
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
    loading: findUsersLoading,
    error: findUsersError,
    data: findUsersData,
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
  }, [findUsersData]);

  //생성 뮤테이션
  const [
    createUserForAdminMutation,
    {
      loading: createUserForAdminLoading,
      error: createUserForAdminError,
      data: createUserForAdminData,
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
  const [editUserMutation, { loading: editUserLoading, data: editUserData }] =
    useMutation<editUser, editUserVariables>(EDIT_USER, {
      onCompleted: () => {
        refetch();
      },
    });

  //삭제 뮤테이션
  const [
    deleteUserMutation,
    { loading: deleteUserLoading, data: deleteUserData },
  ] = useMutation<deleteUser, deleteUserVariables>(DELETE_USER, {
    onCompleted: () => {
      refetch();
    },
  });

  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminCreateOpenAtom
  );

  const [isEditModalOpen, setisEditModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );

  // 생성시 포커싱
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setFocus_create(partnerFocusId);
      }, 100);
    }
  }, [isModalOpen]);

  //수정시 테이블데이터 반영 및 포커싱
  const [partnerColumns, setPartnerColumns] =
    useRecoilState(partnerColumnsData);
  useEffect(() => {
    reset_edit(
      partnerColumns.reduce(
        (pre, cur) => ({
          ...pre,
          [cur.accessor]: cur.value,
        }),
        {}
      )
    );
    if (isEditModalOpen) {
      setTimeout(() => {
        setFocus_edit(
          partnerColumns.find((val) => val.selected)?.accessor || ""
        );
      }, 100);
    }
  }, [partnerColumns]);

  //유즈폼 생성
  const {
    register: register_create,
    handleSubmit: handleSubmit_create,
    reset: reset_create,
    setFocus: setFocus_create,
    getValues: getValues_create,
    formState: { errors: errors_create },
    watch: watch_create,
  } = useForm();

  const onSubmit_create = (data) => {
    tokenCheck("mutation", async () => {
      try {
        if (data.password === data.passwordCheck) {
          await createUserForAdminMutation({
            variables: {
              input: {
                role: UserRole.Partner,
                email: data.email === "" ? null : data.email,
                password: data.password === "" ? null : data.password,
                name: data.name,
                nameId: data.nameId === "" ? null : data.nameId,
                phoneNumber: data.phoneNumber,
                brandName: data.brandName,
                residentRegistrationNumber: data.residentRegistrationNumber,
                tags: data.tags,
              },
            },
          });
          reset_create(
            partnerColumnsDefault.reduce(
              (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
              { password: "", passwordCheck: "" }
            )
          );
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

  //유즈폼 수정
  const {
    register: register_edit,
    handleSubmit: handleSubmit_edit,
    reset: reset_edit,
    setFocus: setFocus_edit,
    getValues: getValues_edit,
    formState: { errors: errors_edit },
    watch: watch_edit,
  } = useForm();

  const onSubmit_edit = (data) => {
    tokenCheck("mutation", async () => {
      try {
        if (data.password === data.passwordCheck) {
          await editUserMutation({
            variables: {
              input: {
                email: data.email === "" ? null : data.email,
                password: data.password === "" ? null : data.password,
                name: data.name,
                nameId: data.nameId === "" ? null : data.nameId,
                phoneNumber: data.phoneNumber,
                brandName: data.brandName,
                residentRegistrationNumber: data.residentRegistrationNumber,
                tags: data.tags,
                id: +formSelector("id", partnerColumns),
              },
            },
          });
          reset_edit(
            partnerColumnsDefault.reduce(
              (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
              {}
            )
          );
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
          alert(`브랜드명(ID)이 중복됩니다.`);
        } else {
          alert(pureError);
        }
      }
    });
  };

  const [nickName, setNickName] = useRecoilState(nickNameAtom);

  useEffect(() => {
    const handler = (e) => {
      try {
        if (e.shiftKey) {
          //시프트 c 누를때 생성
          if ([67].includes(e.keyCode)) {
            setisModalOpen(true);
          }
          //시프트 s/d누를때 닉네임/데이트 생성
          if ([83, 68].includes(e.keyCode)) {
            let newContent;

            if ([83].includes(e.keyCode)) {
              newContent = nickName;
            } else if ([68].includes(e.keyCode)) {
              const date = new Date();
              const prettyDate = dateTime(date);
              newContent = nickName + " " + prettyDate;
            }
            const focusedElement: any = document.activeElement;
            const getValue_create = getValues_create(focusedElement.name);
            setTimeout(() => {
              reset_create({
                [focusedElement.name]: getValue_create + newContent,
              });
            }, 0);
            const getValue_edit = getValues_edit(focusedElement.name);
            setTimeout(() => {
              reset_edit({
                [focusedElement.name]: getValue_edit + newContent,
              });
            }, 0);
          }
        }
      } catch (error) {}
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [nickName]);

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
                <form onSubmit={handleSubmit_create(onSubmit_create)}>
                  <ul>
                    {partnerColumnsDefault.map((val, idx) => {
                      if (
                        !partnerExceptionDataInCreateForm.includes(val.accessor)
                      ) {
                        if (["email"].includes(val.accessor)) {
                          return (
                            <>
                              <li key={idx}>
                                <div>{val.Header}*</div>
                                <input
                                  defaultValue={val.value}
                                  required
                                  {...register_create(val.accessor)}
                                  type={`text`}
                                />
                              </li>
                              <li>
                                <div>{"비밀번호"}*</div>
                                <input
                                  defaultValue={""}
                                  required
                                  {...register_create("password")}
                                  type={`password`}
                                />
                              </li>
                              <li>
                                <div>{"비밀번호 확인"}*</div>
                                <input
                                  defaultValue={""}
                                  required
                                  {...register_create("passwordCheck")}
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
                                defaultValue={val.value}
                                {...register_create(val.accessor)}
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
                        reset_create(
                          partnerColumnsDefault.reduce(
                            (pre, cur) => ({
                              ...pre,
                              [cur.accessor]: cur.value,
                            }),
                            { password: "", passwordCheck: "" }
                          )
                        );
                        setTimeout(() => {
                          setFocus_create(partnerFocusId);
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
                <form onSubmit={handleSubmit_edit(onSubmit_edit)}>
                  <ul>
                    {partnerColumnsDefault.map((val, idx) => {
                      if (
                        !partnerExceptionDataInEditForm.includes(val.accessor)
                      ) {
                        if (["email"].includes(val.accessor)) {
                          return (
                            <>
                              <li key={idx}>
                                <div>{val.Header}</div>
                                <input
                                  defaultValue={val.value}
                                  {...register_edit(val.accessor)}
                                  type={`text`}
                                />
                              </li>
                              <li>
                                <div>{"비밀번호"}</div>
                                <input
                                  defaultValue={""}
                                  {...register_edit("password")}
                                  type={`password`}
                                />
                              </li>
                              <li>
                                <div>{"비밀번호 확인"}</div>
                                <input
                                  defaultValue={""}
                                  {...register_edit("passwordCheck")}
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
                                defaultValue={val.value}
                                {...register_edit(val.accessor)}
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
                    deleteUserMutation({
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
