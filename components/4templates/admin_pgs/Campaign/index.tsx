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
import { tableTranslator } from "../../../3organisms/Org_adminTable2/tableTranslator";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  FIND_CAMPAIGNS,
  CREATE_CAMPAIGN,
  EDIT_CAMPAIGN,
  DELETE_CAMPAIGN,
} from "./Gql_campaign";
import {
  campaignColumnsDefault,
  rawCampaignColumnsData,
} from "./Var_campaignForm";
import {
  createCampaign,
  createCampaignVariables,
} from "./__generated__/createCampaign";
import {
  deleteCampaign,
  deleteCampaignVariables,
} from "./__generated__/deleteCampaign";
import {
  editCampaign,
  editCampaignVariables,
} from "./__generated__/editCampaign";
import {
  findCampaigns,
  findCampaignsVariables,
} from "./__generated__/findCampaigns";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //데이트 스테이트
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //쿼리
  const query = useQuery<findCampaigns, findCampaignsVariables>(
    FIND_CAMPAIGNS,
    {
      variables: {
        input: {
          fromDate: dateToInput(tableFromDateState),
          toDate: dateToInput(tableToDateState),
        },
      },
    }
  );
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.data]);

  //테이블 컬럼 가공
  const columns = useMemo(() => campaignColumnsDefault, []);
  //쿼리데이터 가공
  const campaignsData = useMemo(
    () =>
      query.data?.findCampaigns.campaigns?.map((val, idx) => ({
        ...tableTranslator(columns, val),
        brandName_partner: val.partner?.nameId,
      })),
    [query.data]
  );

  //생성 뮤테이션
  const createMutation = useMutation<createCampaign, createCampaignVariables>(
    CREATE_CAMPAIGN,
    {
      onCompleted: () => {
        query.refetch();
      },
    }
  );

  //수정 뮤테이션
  const editMutation = useMutation<editCampaign, editCampaignVariables>(
    EDIT_CAMPAIGN,
    {
      onCompleted: () => {
        query.refetch();
      },
    }
  );

  //삭제 뮤테이션
  const deleteMutation = useMutation<deleteCampaign, deleteCampaignVariables>(
    DELETE_CAMPAIGN,
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
        data={campaignsData}
        createMutation={createMutation}
        editMutation={editMutation}
        deleteMutation={deleteMutation}
        rawColumnsAtom={rawCampaignColumnsData}
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
