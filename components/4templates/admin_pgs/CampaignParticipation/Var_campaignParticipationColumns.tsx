import { atom, useRecoilState } from "recoil";
import { IColumn } from "../adminAtoms/interface_column";
import { dateSmall } from "/home/app/components/3organisms/Org_adminTable/fn_DateSmall";

const nowDate = dateSmall(new Date());
export const campaignParticipationColumnsDefault: IColumn[] = [
  {
    Header: "생성일",
    accessor: "createdAt",
    value: "",
    selected: false,
    width: 87,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "크리에이터명(R)",
    accessor: "creatorNameId",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "브랜드명(R)",
    accessor: "brandName_partner",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "누적차수",
    accessor: "cumulativeOrder",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "number",
  },
  {
    Header: "아이템명",
    accessor: "itemName",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "키워드",
    accessor: "keyword",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "원고료",
    accessor: "manuscriptFee",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "won",
  },
  {
    Header: "제안",
    accessor: "proposal",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "승락",
    accessor: "consent",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "가이드",
    accessor: "guide",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "플랜",
    accessor: "plan",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "세금신고여부",
    accessor: "isFileTaxes",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "boolean",
  },
  {
    Header: "dataId",
    accessor: "id",
    value: "",
    selected: false,
    width: 0,
    sortDescFirst: true,
    inputType: "number",
  },
];

export const rawCampaignParticipationColumnsData = atom({
  key: "rawCampaignParticipationColumnsData",
  default: campaignParticipationColumnsDefault,
});
export const campaignParticipationColumnsData = atom({
  key: "campaignParticipationColumnsData",
  default: campaignParticipationColumnsDefault,
});

export const useCampaignParticipationColumnsDataOnChange = () => {
  const [
    campaignParticipationColumnsDataState,
    setCampaignParticipationColumnsDataState,
  ] = useRecoilState(campaignParticipationColumnsData);

  const onChange = (e, id) => {
    setCampaignParticipationColumnsDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
