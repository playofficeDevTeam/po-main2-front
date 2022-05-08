import { atom, useRecoilState } from "recoil";
import { dateSmall } from "./fn_DateSmall";

const nowDate = dateSmall(new Date());
export const questionManagementFormDefalut = [
  { Header: "생성일", accessor: "createdAt", value: "" },
  { Header: "브랜드명", accessor: "brandName", value: "" },
  { Header: "스케쥴", accessor: "stateDate", value: nowDate },
  { Header: "제목", accessor: "stateName", value: "" },
  { Header: "상태", accessor: "state", value: "" },
  { Header: "시간", accessor: "stateTime", value: "" },
  { Header: "비고", accessor: "note", value: "" },
  { Header: "제품", accessor: "product", value: "" },
  { Header: "문의서비스", accessor: "serviceInquired", value: "" },
  { Header: "dataId", accessor: "id", value: "" },
  { Header: "relationId", accessor: "relationId", value: "" },
];

export const questionManagementFormData = atom({
  key: "questionManagementFormData",
  default: questionManagementFormDefalut,
});

export const useQuestionManagementFormDataOnChange = () => {
  const [questionManagementFormDataState, setQuestionManagementFormDataState] =
    useRecoilState(questionManagementFormData);

  const onChange = (e, id) => {
    setQuestionManagementFormDataState((formData) =>
      formData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
