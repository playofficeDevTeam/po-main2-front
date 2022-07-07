import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import Org_adminTable2 from "../../../3organisms/Org_adminTable2";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { FIND_ALL_ITEM, CREATE_ITEM, EDIT_ITEM, DELETE_ITEM } from "./Gql_item";
import { itemColumnsDefault, rawItemColumnsData } from "./Var_itemColumns";
import { createItem, createItemVariables } from "./__generated__/createItem";
import { deleteItem, deleteItemVariables } from "./__generated__/deleteItem";
import { editItem, editItemVariables } from "./__generated__/editItem";
import { findAllItems } from "./__generated__/findAllItems";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //데이트 스테이트
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //쿼리
  const query = useQuery<findAllItems>(FIND_ALL_ITEM);
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.data]);

  //쿼리데이터 가공
  const itemData = useMemo(
    () =>
      query.data?.findAllItems.items?.map((val, idx) => ({
        ...val,
        detailInfo: val.detailInfo?.join(", "),
      })),
    [query.data]
  );

  //테이블 컬럼 가공
  const columns = useMemo(() => itemColumnsDefault, []);

  //생성 뮤테이션
  const createMutation = useMutation<createItem, createItemVariables>(
    CREATE_ITEM,
    {
      onCompleted: () => {
        query.refetch();
      },
    }
  );

  //수정 뮤테이션
  const editMutation = useMutation<editItem, editItemVariables>(EDIT_ITEM, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //삭제 뮤테이션
  const deleteMutation = useMutation<deleteItem, deleteItemVariables>(
    DELETE_ITEM,
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
        data={itemData}
        createMutation={createMutation}
        editMutation={editMutation}
        deleteMutation={deleteMutation}
        rawColumnsAtom={rawItemColumnsData}
        options={{
          dateFilter: true,
          createFunction: true,
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
