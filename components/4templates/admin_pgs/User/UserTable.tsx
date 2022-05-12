import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { UserRole } from "../../../../__generated__/globalTypes";
import Org_adminTable from "../../../3organisms/Org_adminTable";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
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
} from "../Partner/PartnerTable";
import {
  createUserForAdmin,
  createUserForAdminVariables,
} from "../Partner/__generated__/createUserForAdmin";
import {
  deleteUser,
  deleteUserVariables,
} from "../Partner/__generated__/deleteUser";
import { editUser, editUserVariables } from "../Partner/__generated__/editUser";
import {
  findUsers,
  findUsersVariables,
} from "../Partner/__generated__/findUsers";
import { datePrettier } from "../Question/fn_DatePrettier";
import { formSelector } from "../Question/fn_formSelector";
import { userFormData, userFormDefault } from "./Var_UserForm";

const App = () => {
  const [userForm, setPartnerForm] = useRecoilState(userFormData);
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
        Header: "이메일(ID)",
        accessor: "email",
        width: 250,
        sortDescFirst: true,
      },
      {
        Header: "이름(ID)",
        accessor: "nameId",
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
      {
        Header: "주민등록번호",
        accessor: "residentRegistrationNumber",
        width: 180,
        sortDescFirst: true,
      },
      { Header: "태그", accessor: "tags", width: 250, sortDescFirst: true },
      { Header: "dataId", accessor: "id", width: 0 },
    ],
    []
  );

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
        userRole: UserRole.Creator,
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findUsersData]);

  const usersData = useMemo(
    () =>
      findUsersData?.findUsers.users?.map((val, idx) => ({
        ...val,
        createdAt: datePrettier(val.createdAt),
      })),
    [findUsersData]
  );

  //뮤테이션
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

  const [editUserMutation, { loading: editUserLoading, data: editUserData }] =
    useMutation<editUser, editUserVariables>(EDIT_USER, {
      onCompleted: () => {
        refetch();
      },
    });

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
        if (data.password === data.passwordCheck) {
          await createUserForAdminMutation({
            variables: {
              input: {
                role: UserRole.Creator,
                email: data.email === "" ? null : data.email,
                password: data.password === "" ? null : data.password,
                nameId: data.nameId === "" ? null : data.nameId,
                name: data.name,
                phoneNumber: data.phoneNumber,
                residentRegistrationNumber: data.residentRegistrationNumber,
                tags: data.tags,
              },
            },
          });
          reset_create(
            userFormDefault.reduce(
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
          alert(`이름(ID)이 중복됩니다.`);
        } else {
          alert(pureError);
        }
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
        if (data.password === data.passwordCheck) {
          await editUserMutation({
            variables: {
              input: {
                email: data.email === "" ? null : data.email,
                password: data.password === "" ? null : data.password,
                nameId: data.nameId === "" ? null : data.nameId,
                name: data.name,
                phoneNumber: data.phoneNumber,
                residentRegistrationNumber: data.residentRegistrationNumber,
                tags: data.tags,
                id: +formSelector("id", userForm),
              },
            },
          });
          reset_edit(
            userFormDefault.reduce(
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
        } else {
          alert(pureError);
        }
      }
    });
  };

  if (findUsersError) {
    return (
      <>
        권한이 없습니다.
        <div className="">{findUsersError.toString()}</div>
      </>
    );
  }
  if (findUsersLoading) {
    return <div className="">로딩중</div>;
  }
  return (
    <>
      <Org_adminTable
        columns={columns}
        data={usersData}
        customOptions={{
          setCreateReset: reset_create,
          getValues_create,
          getValues_edit,
          refetch: () => {
            tokenCheck("query", refetch);
          },
          deleteMutation: (id) => {
            tokenCheck("mutation", () => {
              deleteUserMutation({
                variables: {
                  input: {
                    id,
                  },
                },
              });
            });
          },
          setCreateFocus: () => {
            setFocus_create("email");
          },
          setEditRecoil: setPartnerForm,
          setEditReset: reset_edit,
          setEditFocus: setFocus_edit,
          createForm: (
            <>
              <form onSubmit={handleSubmit_create(onSubmit_create)}>
                <ul>
                  {userForm.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) && (
                        <>
                          <li key={idx} className="flex items-center">
                            <div className="w-28 flex pl-1">{val.Header}</div>
                            {!["uniqueness"].includes(val.accessor) ? (
                              <input
                                defaultValue={val.value}
                                {...register_create(val.accessor)}
                                className="border w-96 p-1 m-1"
                                type={`text`}
                              />
                            ) : (
                              <textarea
                                defaultValue={val.value}
                                {...register_create(val.accessor)}
                                className="border w-96 p-1 m-1"
                              ></textarea>
                            )}
                          </li>
                          {["email"].includes(val.accessor) && (
                            <>
                              <li className="flex items-center">
                                <div className="w-28 flex pl-1">
                                  {"비밀번호"}
                                </div>
                                <input
                                  defaultValue={""}
                                  {...register_create("password")}
                                  className="border w-96 p-1 m-1"
                                  type={`password`}
                                />
                              </li>
                              <li className="flex items-center">
                                <div className="w-28 flex pl-1">
                                  {"비밀번호 확인"}
                                </div>
                                <input
                                  defaultValue={""}
                                  {...register_create("passwordCheck")}
                                  className="border w-96 p-1 m-1"
                                  type={`password`}
                                />
                              </li>
                            </>
                          )}
                        </>
                      )
                  )}
                </ul>
                <div className="flex justify-end mt-2">
                  <div
                    className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                    onClick={() => {
                      reset_create(
                        userFormDefault.reduce(
                          (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
                          { password: "", passwordCheck: "" }
                        )
                      );

                      setTimeout(() => {
                        setFocus_create("email");
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
            </>
          ),
          editForm: (
            <>
              <form onSubmit={handleSubmit_edit(onSubmit_edit)}>
                <ul>
                  {userForm.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) && (
                        <>
                          <li key={idx} className="flex items-center">
                            <div className="w-28 flex pl-1">{val.Header}</div>
                            {!["uniqueness"].includes(val.accessor) ? (
                              <input
                                defaultValue={val.value}
                                {...register_edit(val.accessor)}
                                className="border w-96 p-1 m-1"
                                type={`text`}
                              />
                            ) : (
                              <textarea
                                defaultValue={val.value}
                                {...register_edit(val.accessor)}
                                className="border w-96 p-1 m-1"
                              ></textarea>
                            )}
                          </li>
                          {["email"].includes(val.accessor) && (
                            <>
                              <li className="flex items-center">
                                <div className="w-28 flex pl-1">
                                  {"비밀번호"}
                                </div>
                                <input
                                  defaultValue={""}
                                  {...register_edit("password")}
                                  className="border w-96 p-1 m-1"
                                  type={`password`}
                                />
                              </li>
                              <li className="flex items-center">
                                <div className="w-28 flex pl-1">
                                  {"비밀번호 확인"}
                                </div>
                                <input
                                  defaultValue={""}
                                  {...register_edit("passwordCheck")}
                                  className="border w-96 p-1 m-1"
                                  type={`password`}
                                />
                              </li>
                            </>
                          )}
                        </>
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
};

export default App;
