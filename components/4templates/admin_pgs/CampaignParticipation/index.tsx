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
import {
  FIND_ALL_CAMPAIGN_PARTICIPATIONS,
  CREATE_CAMPAIGN_PARTICIPATION,
  EDIT_CAMPAIGN_PARTICIPATION,
  DELETE_CAMPAIGN_PARTICIPATION,
} from "./Gql_campaignParticipation";
import {
  campaignParticipationColumnsDefault,
  rawCampaignParticipationColumnsData,
} from "./Var_campaignParticipationColumns";
import {
  createCampaignParticipation,
  createCampaignParticipationVariables,
} from "./__generated__/createCampaignParticipation";
import {
  deleteCampaignParticipation,
  deleteCampaignParticipationVariables,
} from "./__generated__/deleteCampaignParticipation";
import {
  editCampaignParticipation,
  editCampaignParticipationVariables,
} from "./__generated__/editCampaignParticipation";
import {
  findAllCampaignParticipations,
  findAllCampaignParticipationsVariables,
} from "./__generated__/findAllCampaignParticipations";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //데이트 스테이트
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //쿼리
  const query = useQuery<
    findAllCampaignParticipations,
    findAllCampaignParticipationsVariables
  >(FIND_ALL_CAMPAIGN_PARTICIPATIONS, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.data]);

  //쿼리데이터 가공
  const campaignParticipationsData = useMemo(
    () =>
      query.data?.findAllCampaignParticipations.campaignParticipations?.map(
        (val, idx) => ({
          ...val,
          creatorNameId: val.user?.nameId,
          brandName_partner: val.campaign?.partner?.nameId,
          cumulativeOrder: val.campaign?.cumulativeOrder,
          itemName: val.campaign?.itemName,
          keyword: val.campaign?.keyword,
        })
      ),
    [query.data]
  );

  //테이블 컬럼 가공
  const columns = useMemo(() => campaignParticipationColumnsDefault, []);

  //생성 뮤테이션
  const createMutation = useMutation<
    createCampaignParticipation,
    createCampaignParticipationVariables
  >(CREATE_CAMPAIGN_PARTICIPATION, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //수정 뮤테이션
  const editMutation = useMutation<
    editCampaignParticipation,
    editCampaignParticipationVariables
  >(EDIT_CAMPAIGN_PARTICIPATION, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //삭제 뮤테이션
  const deleteMutation = useMutation<
    deleteCampaignParticipation,
    deleteCampaignParticipationVariables
  >(DELETE_CAMPAIGN_PARTICIPATION, {
    onCompleted: () => {
      query.refetch();
    },
  });

  if (query.data) {
    return (
      <Org_adminTable2
        columns={columns}
        data={campaignParticipationsData}
        createMutation={createMutation}
        editMutation={editMutation}
        deleteMutation={deleteMutation}
        rawColumnsAtom={rawCampaignParticipationColumnsData}
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
