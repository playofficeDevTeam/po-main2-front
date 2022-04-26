import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
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
import { datePrettier } from "../Question/fn_DatePrettier";
import { formSelector } from "../Question/fn_formSelector";
import {
  deleteQuestionForAdmin,
  deleteQuestionForAdminVariables,
} from "../Question/__generated__/deleteQuestionForAdmin";
import {
  editQuestionForAdmin,
  editQuestionForAdminVariables,
} from "../Question/__generated__/editQuestionForAdmin";
import { partnerFormData, partnerFormDefault } from "./Var_PartnerForm";
import {
  createUserForAdmin,
  createUserForAdminVariables,
} from "./__generated__/createUserForAdmin";
import { deleteUser, deleteUserVariables } from "./__generated__/deleteUser";
import { editUser, editUserVariables } from "./__generated__/editUser";
import { findUsers, findUsersVariables } from "./__generated__/findUsers";

export const FIND_USERS = gql`
  query findUsers($input: FindUsersInput!) {
    findUsers(input: $input) {
      ok
      error
      users {
        createdAt
        tags
        email
        role
        name
        phoneNumber
        brandName
        residentRegistrationNumber
        nameId
        campaignParticipations {
          id
        }
        payments {
          id
        }
        questions {
          id
        }
      }
    }
  }
`;

export const CREATE_USER_FOR_ADMIN = gql`
  mutation createUserForAdmin($input: CreateUserForAdminInput!) {
    createUserForAdmin(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      ok
      error
    }
  }
`;

const App = () => {
  const [partnerForm, setPartnerForm] = useRecoilState(partnerFormData);
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
      { Header: "이메일", accessor: "email", width: 150, sortDescFirst: true },
      { Header: "이름", accessor: "name", width: 150, sortDescFirst: true },
      {
        Header: "이름(ID)",
        accessor: "nameId",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "연락처",
        accessor: "phoneNumber",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "브랜드명",
        accessor: "brandName",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "주민등록번호",
        accessor: "residentRegistrationNumber",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "역할", accessor: "role", width: 150, sortDescFirst: true },
      { Header: "태그", accessor: "tags", width: 150, sortDescFirst: true },
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
        userRole: UserRole.Partner,
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
    formState: { errors: errors_create },
  } = useForm();

  const onSubmit_create = (data) => {
    tokenCheck("mutation", async () => {
      try {
        await createUserForAdminMutation({
          variables: {
            input: {
              role: UserRole.Partner,
              email: data.email === "" ? null : data.email,
              password: data.password,
              name: data.name,
              nameId: data.nameId === "" ? null : data.nameId,
              phoneNumber: data.phoneNumber,
              brandName: data.brandName,
              residentRegistrationNumber: data.residentRegistrationNumber,
              tags: data.tags,
            },
          },
        });
        console.log(createUserForAdminLoading);
        console.log(createUserForAdminError);
        console.log(createUserForAdminData);

        reset_create(
          partnerFormDefault.reduce(
            (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
            {}
          )
        );
        setisModalOpen(false);
      } catch (error) {
        const errorString: string = error + "";
        // if (
        //   errorString.indexOf(
        //     "duplicate key value violates unique constraint"
        //   ) !== -1
        // ) {
        //   alert(`(ID)가 중복됩니다. ${errorString}`);
        // }
        alert(errorString);
      }
    });
  };

  const {
    register: register_edit,
    handleSubmit: handleSubmit_edit,
    reset: reset_edit,
    setFocus: setFocus_edit,
    formState: { errors: errors_edit },
  } = useForm();

  const onSubmit_edit = (data) => {
    tokenCheck("mutation", () => {
      editUserMutation({
        variables: {
          input: {
            password: data.password,
            name: data.name,
            nameId: data.nameId === "" ? null : data.nameId,
            phoneNumber: data.phoneNumber,
            brandName: data.brandName,
            residentRegistrationNumber: data.residentRegistrationNumber,
            tags: data.tags,
            id: +formSelector("id", partnerForm),
          },
        },
      });
    });
    reset_edit(
      partnerFormDefault.reduce(
        (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
        {}
      )
    );
    setisEditModalOpen(false);
  };

  if (findUsersError) {
    return (
      <>
        권한이 없습니다.
        {/* <div className="">{findUsersError.toString()}</div> */}
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
        deleteMutation={(id) => {
          tokenCheck("mutation", () => {
            deleteUserMutation({
              variables: {
                input: {
                  id,
                },
              },
            });
          });
        }}
        setCreateForm={{
          setFocus: () => {
            setFocus_create("email");
          },
        }}
        createForm={
          <>
            <form onSubmit={handleSubmit_create(onSubmit_create)}>
              <ul>
                {partnerForm.map(
                  (val, idx) =>
                    !["id", "createdAt"].includes(val.accessor) && (
                      <li key={idx} className="flex items-center">
                        <div className="w-28 flex pl-1">{val.Header}</div>
                        {!["uniqueness"].includes(val.accessor) ? (
                          <input
                            defaultValue={val.value}
                            {...register_create(val.accessor)}
                            className="border w-60 p-1 m-1"
                            type={`text`}
                          />
                        ) : (
                          <textarea
                            defaultValue={val.value}
                            {...register_create(val.accessor)}
                            className="border w-60 p-1 m-1"
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
                    reset_create(
                      partnerFormDefault.reduce(
                        (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
                        {}
                      )
                    );

                    setTimeout(() => {
                      setFocus_create("brandName");
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
        }
        setEditForm={{
          setRecoil: setPartnerForm,
          setReset: reset_edit,
          setFocus: setFocus_edit,
        }}
        editForm={
          <>
            <form onSubmit={handleSubmit_edit(onSubmit_edit)}>
              <ul>
                {partnerForm.map(
                  (val, idx) =>
                    !["id", "createdAt"].includes(val.accessor) && (
                      <li key={idx} className="flex items-center">
                        <div className="w-28 flex pl-1">{val.Header}</div>
                        {!["uniqueness"].includes(val.accessor) ? (
                          <input
                            defaultValue={val.value}
                            {...register_edit(val.accessor)}
                            className="border w-60 p-1 m-1"
                            type={`text`}
                          />
                        ) : (
                          <textarea
                            defaultValue={val.value}
                            {...register_edit(val.accessor)}
                            className="border w-60 p-1 m-1"
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
          </>
        }
      />
    </>
  );
};

export default App;
