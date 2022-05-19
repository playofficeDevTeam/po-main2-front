import { atom, useRecoilState } from "recoil";
import { dateSmall } from "../QuestionManagement/fn_DateSmall";

const nowDate = dateSmall(new Date());
export const campaignParticipationFormDefalut = [
  { Header: "생성일", accessor: "createdAt", value: "" },
  { Header: "크리에이터명(R)", accessor: "creatorNameId", value: "" },
  { Header: "브랜드명(R)", accessor: "brandName_Partner", value: "" },
  { Header: "누적차수", accessor: "cumulativeOrder", value: "" },
  { Header: "아이템명", accessor: "itemName", value: "" },
  { Header: "키워드", accessor: "keyword", value: "" },
  { Header: "원고료", accessor: "manuscriptFee", value: "" },
  { Header: "제안", accessor: "proposal", value: "" },
  { Header: "승락", accessor: "consent", value: "" },
  { Header: "가이드", accessor: "guide", value: "" },
  { Header: "플랜", accessor: "plan", value: "" },
  { Header: "세금신고여부", accessor: "isFileTaxes", value: "" },
];

export const campaignParticipationFormData = atom({
  key: "campaignParticipationFormData",
  default: campaignParticipationFormDefalut,
});

export const useCampaignParticipationFormDataOnChange = () => {
  const [
    campaignParticipationFormDataState,
    setCampaignParticipationFormDataState,
  ] = useRecoilState(campaignParticipationFormData);

  const onChange = (e, id) => {
    setCampaignParticipationFormDataState((formData) =>
      formData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
