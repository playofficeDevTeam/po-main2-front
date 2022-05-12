import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Org_adminTable from "../../../3organisms/Org_adminTable";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { datePrettier } from "../Question/fn_DatePrettier";
import { formSelector } from "../Question/fn_formSelector";
import { EDIT_ADMIN } from "./Gql_admin";
import { adminFormData, adminFormDefault } from "./Var_adminForm";
import { createAdmin, createAdminVariables } from "./__generated__/createAdmin";
import { deleteAdmin, deleteAdminVariables } from "./__generated__/deleteAdmin";
import { editAdmin, editAdminVariables } from "./__generated__/editAdmin";
import { findAllAdmin } from "./__generated__/findAllAdmin";

export const FIND_ALL_ADMIN = gql`
  query findAllAdmin {
    findAllAdmin {
      ok
      error
      admins {
        id
        createdAt
        email
        nickName
        role
      }
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation createAdmin($input: CreateAdminSuperInput!) {
    createAdmin(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation deleteAdmin($input: DeleteAdminInput!) {
    deleteAdmin(input: $input) {
      ok
      error
    }
  }
`;

const App = () => {
  const [adminForm, setAdminForm] = useRecoilState(adminFormData);
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
        width: 400,
        sortDescFirst: true,
      },
      {
        Header: "닉네임",
        accessor: "nickName",
        width: 300,
        sortDescFirst: true,
      },

      {
        Header: "역할",
        accessor: "role",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "dataId", accessor: "id", width: 0 },
    ],
    []
  );

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

  const adminsData = useMemo(
    () =>
      findAllAdminData?.findAllAdmin.admins?.map((val, idx) => ({
        ...val,
        createdAt: datePrettier(val.createdAt),
      })),
    [findAllAdminData]
  );

  //뮤테이션
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

  const [
    editAdminMutation,
    { loading: editAdminLoading, data: editAdminData },
  ] = useMutation<editAdmin, editAdminVariables>(EDIT_ADMIN, {
    onCompleted: () => {
      refetch();
    },
  });

  const [
    deleteAdminMutation,
    { loading: deleteAdminLoading, data: deleteAdminData },
  ] = useMutation<deleteAdmin, deleteAdminVariables>(DELETE_ADMIN, {
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
          await createAdminMutation({
            variables: {
              input: {
                email: data.email === "" ? null : data.email,
                password: data.password,
                nickName: data.nickName,
              },
            },
          });
          reset_create(
            adminFormDefault.reduce(
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
        if (data.password === data.passwordCheck) {
          await editAdminMutation({
            variables: {
              input: {
                email: data.email === "" ? null : data.email,
                nickName: data.nickName,
                password: data.password,
                id: +formSelector("id", adminForm),
              },
            },
          });
          reset_edit(
            adminFormDefault.reduce(
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
        alert(pureError);
      }
    });
  };

  if (findAllAdminError) {
    return (
      <>
        권한이 없습니다.
        <div className="">{findAllAdminError.toString()}</div>
      </>
    );
  }
  if (findAllAdminLoading) {
    return <div className="">로딩중</div>;
  }
  return (
    <>
      <Org_adminTable
        columns={columns}
        data={adminsData}
        customOptions={{
          setCreateReset: reset_create,
          getValues_create,
          getValues_edit,
          noDate: true,
          refetch: () => {
            tokenCheck("query", refetch);
          },
          deleteMutation: (id) => {
            tokenCheck("mutation", () => {
              deleteAdminMutation({
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
          removeEditBtn: ["role"],
          setEditRecoil: setAdminForm,
          setEditReset: reset_edit,
          setEditFocus: setFocus_edit,
          createForm: (
            <>
              <form onSubmit={handleSubmit_create(onSubmit_create)}>
                <ul>
                  {adminForm.map(
                    (val, idx) =>
                      !["id", "createdAt", "role"].includes(val.accessor) && (
                        <>
                          {["email"].includes(val.accessor) ? (
                            <li key={idx} className="flex items-center">
                              <div className="w-28 flex pl-1">
                                {val.Header}*
                              </div>
                              <input
                                defaultValue={val.value}
                                required
                                {...register_create(val.accessor)}
                                className="border w-96 p-1 m-1"
                                type={`text`}
                              />
                            </li>
                          ) : (
                            <li key={idx} className="flex items-center">
                              <div className="w-28 flex pl-1">{val.Header}</div>
                              <input
                                defaultValue={val.value}
                                {...register_create(val.accessor)}
                                className="border w-96 p-1 m-1"
                                type={`text`}
                              />
                            </li>
                          )}

                          {["email"].includes(val.accessor) && (
                            <>
                              <li className="flex items-center">
                                <div className="w-28 flex pl-1">
                                  {"비밀번호"}*
                                </div>
                                <input
                                  defaultValue={""}
                                  required
                                  {...register_create("password")}
                                  className="border w-96 p-1 m-1"
                                  type={`password`}
                                />
                              </li>
                              <li className="flex items-center">
                                <div className="w-28 flex pl-1">
                                  {"비밀번호 확인"}*
                                </div>
                                <input
                                  defaultValue={""}
                                  required
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
                        adminFormDefault.reduce(
                          (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
                          { password: "", passwordCheck: "" }
                        )
                      );

                      setTimeout(() => {
                        setFocus_create("email");
                      }, 100);
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
                  {adminForm.map(
                    (val, idx) =>
                      !["id", "createdAt", "role"].includes(val.accessor) && (
                        <>
                          <li key={idx} className="flex items-center">
                            <div className="w-28 flex pl-1">{val.Header}</div>
                            <input
                              defaultValue={val.value}
                              {...register_edit(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`text`}
                            />
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
