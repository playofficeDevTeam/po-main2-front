import { atom, useRecoilState } from "recoil";
import { dateSmall } from "/home/app/components/3organisms/Org_adminTable/fn_DateSmall";

const nowDate = dateSmall(new Date());
export const campaignColumnsDefault = [
  {
    Header: "생성일",
    accessor: "createdAt",
    value: "",
    selected: false,
    width: 85,
    sortDescFirst: true,
  },
  {
    Header: "매출일",
    accessor: "salesDate",
    value: nowDate,
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "목표일",
    accessor: "targetDate",
    value: nowDate,
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "브랜드명(R)",
    accessor: "brandName_partner",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "누적차수",
    accessor: "cumulativeOrder",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "아이템명",
    accessor: "itemName",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "키워드",
    accessor: "keyword",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "매체",
    accessor: "media",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "서비스명",
    accessor: "service",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "형태",
    accessor: "form",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "플랜",
    accessor: "plan",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "가격",
    accessor: "price",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "수량",
    accessor: "amount",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "할인률",
    accessor: "discountRate",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "수수료",
    accessor: "commisstion",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "광고비",
    accessor: "advertisingCost",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "캠페인 담당자",
    accessor: "campaignManagers",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "판매 담당자",
    accessor: "salesManager",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "태그",
    accessor: "tags",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "dataId",
    accessor: "id",
    value: "",
    selected: false,
    width: 0,
    sortDescFirst: true,
  },
];

export const campaignColumnsData = atom({
  key: "campaignColumnsData",
  default: campaignColumnsDefault,
});

export const useCampaignColumnsDataOnChange = () => {
  const [campaignColumnsDataState, setCampaignColumnsDataState] =
    useRecoilState(campaignColumnsData);

  const onChange = (e, id) => {
    setCampaignColumnsDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
