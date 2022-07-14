import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import Org_adminTable2 from "../../../3organisms/Org_adminTable2";
import { tableTranslator } from "../../../3organisms/Org_adminTable2/tableTranslator";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  FIND_ALL_ADMIN,
  CREATE_ADMIN,
  EDIT_ADMIN,
  DELETE_ADMIN,
} from "./Gql_admin";
import { adminColumnsDefault, rawAdminColumnsData } from "./Var_adminColumns";
import { createAdmin, createAdminVariables } from "./__generated__/createAdmin";
import { deleteAdmin, deleteAdminVariables } from "./__generated__/deleteAdmin";
import { editAdmin, editAdminVariables } from "./__generated__/editAdmin";
import { findAllAdmin } from "./__generated__/findAllAdmin";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //데이트 스테이트
  // const [tableFromDateState, setTableFromDateState] =
  //   useRecoilState(tableFromDate);
  // const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //쿼리
  const query = useQuery<findAllAdmin>(FIND_ALL_ADMIN);
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.data]);

  //테이블 컬럼 가공
  const columns = useMemo(() => adminColumnsDefault, []);

  //쿼리데이터 가공
  const questionsData = useMemo(
    () =>
      query.data?.findAllAdmin.admins?.map((val, idx) => ({
        ...tableTranslator(columns, val),
      })),
    [query.data]
  );

  //생성 뮤테이션
  const createMutation = useMutation<createAdmin, createAdminVariables>(
    CREATE_ADMIN,
    {
      onCompleted: () => {
        query.refetch();
      },
    }
  );

  //수정 뮤테이션
  const editMutation = useMutation<editAdmin, editAdminVariables>(EDIT_ADMIN, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //삭제 뮤테이션
  const deleteMutation = useMutation<deleteAdmin, deleteAdminVariables>(
    DELETE_ADMIN,
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
        data={questionsData}
        createMutation={createMutation}
        editMutation={editMutation}
        deleteMutation={deleteMutation}
        rawColumnsAtom={rawAdminColumnsData}
        options={{
          dateFilter: false,
          createFunction: false,
          shortCutHotkey: true,
          // newPageLink: "/question",
          // tableTitle: tableTitle,
          extraCreateInputObject: {},
          extraEditInputObject: {},
        }}
      />
    );
  }
  return <></>;
}
