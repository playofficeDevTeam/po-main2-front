import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { UserRole } from "../../../../../__generated__/globalTypes";
import { dateToInput } from "../../../../3organisms/Org_adminTable/fn_dateToInput";
import {
  tableFromDate,
  tableToDate,
} from "../../../../3organisms/Org_adminTable/Var_tableInputDate";
import Org_adminTable2 from "../../../../3organisms/Org_adminTable2";
import { fn_newColumnsGenerator } from "../../../../3organisms/Org_adminTable2/fn_newColumnsGenerator";
import { tableTranslator } from "../../../../3organisms/Org_adminTable2/tableTranslator";
import { useTokenCheck } from "../../../../hooks/useTokenCheck";
import {
  FIND_USERS,
  CREATE_USER_FOR_ADMIN,
  EDIT_USER,
  DELETE_USER,
} from "../../Partner/Gql_user";
import {
  createUserForAdmin,
  createUserForAdminVariables,
} from "../../Partner/__generated__/createUserForAdmin";
import {
  deleteUser,
  deleteUserVariables,
} from "../../Partner/__generated__/deleteUser";
import {
  editUser,
  editUserVariables,
} from "../../Partner/__generated__/editUser";
import {
  findUsers,
  findUsersVariables,
} from "../../Partner/__generated__/findUsers";
import { userColumnsDefault, rawUserColumnsData } from "../Var_userColumns";
import { instaUserColumns } from "./instaUserColumns";

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
        userRole: UserRole.Creator,
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.loading]);

  const newInstaColumns = fn_newColumnsGenerator(
    userColumnsDefault,
    instaUserColumns
  );

  //테이블 컬럼 가공
  const columns = useMemo(() => newInstaColumns, []);

  //쿼리데이터 가공
  const usersData = useMemo(
    () =>
      query.data?.findUsers.users
        ?.filter((val) => val.insta_isInstaUser)
        .map((val, idx) => ({
          ...tableTranslator(columns, val),
        })),
    [query.data]
  );

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
        rawColumnsAtom={rawUserColumnsData}
        options={{
          dateFilter: true,
          createFunction: true,
          shortCutHotkey: true,
          // newPageLink: "/question",
          // tableTitle: tableTitle,
          extraCreateInputObject: { role: UserRole.Creator },
          extraEditInputObject: {},
          label: [
            { url: "/admin/user", title: "전체" },
            { url: "/admin/user/insta", title: "인스타" },
            { url: "/admin/user/naver", title: "네이버" },
          ],
        }}
      />
    );
  }
  return <></>;
}
