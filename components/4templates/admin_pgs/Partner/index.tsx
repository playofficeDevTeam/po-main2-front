import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { UserRole } from "../../../../__generated__/globalTypes";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import Org_adminTable2 from "../../../3organisms/Org_adminTable2";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  FIND_USERS,
  CREATE_USER_FOR_ADMIN,
  EDIT_USER,
  DELETE_USER,
} from "../Partner/Gql_user";
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
import {
  partnerColumnsDefault,
  rawPartnerColumnsData,
} from "./Var_partnerColumns";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //데이트 스테이트
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //쿼리
  const query = useQuery<findUsers, findUsersVariables>(FIND_USERS, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
        userRole: UserRole.Partner,
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.data]);

  //쿼리데이터 가공
  const usersData = useMemo(
    () =>
      query.data?.findUsers.users?.map((val, idx) => ({
        ...val,
      })),
    [query.data]
  );

  //테이블 컬럼 가공
  const columns = useMemo(() => partnerColumnsDefault, []);

  //생성 뮤테이션
  const createMutation = useMutation<
    createUserForAdmin,
    createUserForAdminVariables
  >(CREATE_USER_FOR_ADMIN, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //수정 뮤테이션
  const editMutation = useMutation<editUser, editUserVariables>(EDIT_USER, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //삭제 뮤테이션
  const deleteMutation = useMutation<deleteUser, deleteUserVariables>(
    DELETE_USER,
    {
      onCompleted: () => {
        query.refetch();
      },
    }
  );

  if (query.data) {
    return (
      <Org_adminTable2
        columns={columns}
        data={usersData}
        createMutation={createMutation}
        editMutation={editMutation}
        deleteMutation={deleteMutation}
        rawColumnsAtom={rawPartnerColumnsData}
        options={{
          dateFilter: true,
          createFunction: true,
          shortCutHotkey: true,
          // newPageLink: "/question",
          // tableTitle: tableTitle,
          extraCreateInputObject: { role: UserRole.Partner },
          extraEditInputObject: {},
        }}
      />
    );
  }
  return <></>;
}
