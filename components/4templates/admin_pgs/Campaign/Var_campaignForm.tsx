import { atom, useRecoilState } from "recoil";
import { IColumn } from "../../../3organisms/Org_adminTable2/interface_column";
import { dateSmall } from "/home/app/components/3organisms/Org_adminTable/fn_DateSmall";

const nowDate = dateSmall(new Date());
export const campaignColumnsDefault: IColumn[] = [
  {
    Header: "생성일",
    accessor: "createdAt",
    width: 130,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "detailDate",
    formType_create: "hidden",
    formType_edit: "hidden",
    mutationType_create: "hidden",
    mutationType_edit: "hidden",
    editable: false,
  },
  {
    Header: "매출일",
    accessor: "salesDate",
    width: 150,
    sortDescFirst: true,
    value: nowDate,
    selected: false,
    tableType: "date",
    formType_create: "date",
    formType_edit: "date",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "목표일",
    accessor: "targetDate",
    width: 150,
    sortDescFirst: true,
    value: nowDate,
    selected: false,
    tableType: "date",
    formType_create: "date",
    formType_edit: "date",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "브랜드명(R)",
    accessor: "brandName_partner",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: true,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "누적차수",
    accessor: "cumulativeOrder",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "number",
    formType_edit: "number",
    mutationType_create: "number",
    mutationType_edit: "number",
    editable: true,
  },
  {
    Header: "아이템명",
    accessor: "itemName",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "키워드",
    accessor: "keyword",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "매체",
    accessor: "media",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "서비스명",
    accessor: "service",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "형태",
    accessor: "form",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "플랜",
    accessor: "plan",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "가격",
    accessor: "price",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "won",
    formType_create: "won",
    formType_edit: "won",
    mutationType_create: "number",
    mutationType_edit: "number",
    editable: true,
  },
  {
    Header: "수량",
    accessor: "amount",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "number",
    formType_edit: "number",
    mutationType_create: "number",
    mutationType_edit: "number",
    editable: true,
  },
  {
    Header: "할인률",
    accessor: "discountRate",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "number",
    formType_edit: "number",
    mutationType_create: "number",
    mutationType_edit: "number",
    editable: true,
  },
  {
    Header: "수수료",
    accessor: "commisstion",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "won",
    formType_create: "won",
    formType_edit: "won",
    mutationType_create: "number",
    mutationType_edit: "number",
    editable: true,
  },
  {
    Header: "광고비",
    accessor: "advertisingCost",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "won",
    formType_create: "won",
    formType_edit: "won",
    mutationType_create: "number",
    mutationType_edit: "number",
    editable: true,
  },
  {
    Header: "캠페인 담당자",
    accessor: "campaignManagers",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "판매 담당자",
    accessor: "salesManager",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "태그",
    accessor: "tags",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "string",
    formType_create: "string",
    formType_edit: "string",
    mutationType_create: "string",
    mutationType_edit: "string",
    editable: true,
  },
  {
    Header: "dataId",
    accessor: "id",
    width: 0,
    sortDescFirst: true,
    value: "",
    selected: false,
    tableType: "hidden",
    formType_create: "hidden",
    formType_edit: "hidden",
    mutationType_create: "hidden",
    mutationType_edit: "number",
    editable: false,
  },
];

export const rawCampaignColumnsData = atom({
  key: "rawCampaignColumnsData",
  default: campaignColumnsDefault,
});
