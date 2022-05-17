import { atom, useRecoilState } from "recoil";
import { dateSmall } from "../QuestionManagement/fn_DateSmall";

const nowDate = dateSmall(new Date());
export const campaignFormDefalut = [
  { Header: "생성일", accessor: "createdAt", value: "" },
  { Header: "매출일", accessor: "salesDate", value: nowDate },
  { Header: "목표일", accessor: "targetDate", value: nowDate },
  { Header: "브랜드명(R)", accessor: "brandName_partner", value: "" },
  { Header: "누적차수", accessor: "cumulativeOrder", value: "" },
  { Header: "아이템명", accessor: "itemName", value: "" },
  { Header: "키워드", accessor: "keyword", value: "" },
  { Header: "매체", accessor: "media", value: "" },
  { Header: "서비스명", accessor: "service", value: "" },
  { Header: "형태", accessor: "form", value: "" },
  { Header: "플랜", accessor: "plan", value: "" },
  { Header: "가격", accessor: "price", value: "" },
  { Header: "수량", accessor: "amount", value: "" },
  { Header: "할인률", accessor: "discountRate", value: "" },
  { Header: "수수료", accessor: "commisstion", value: "" },
  { Header: "광고비", accessor: "advertisingCost", value: "" },
  { Header: "캠페인 담당자", accessor: "campaignManagers", value: "" },
  { Header: "판매 담당자", accessor: "salesManager", value: "" },
  { Header: "태그", accessor: "tags", value: "" },
  { Header: "dataId", accessor: "id", value: "" },
];

export const campaignFormData = atom({
  key: "campaignFormData",
  default: campaignFormDefalut,
});

export const useCampaignFormDataOnChange = () => {
  const [campaignFormDataState, setCampaignFormDataState] =
    useRecoilState(campaignFormData);

  const onChange = (e, id) => {
    setCampaignFormDataState((formData) =>
      formData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
