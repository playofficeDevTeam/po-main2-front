import { atom, useRecoilState } from "recoil";

export const questionManagementFormDefalut = [
  { Header: "생성일", accessor: "createdAt", value: "" },
  { Header: "브랜드명(R)", accessor: "brandName_partner", value: "" },
  { Header: "브랜드명", accessor: "brandName", value: "" },
  { Header: "제품", accessor: "product", value: "" },
  {
    Header: "분석유무",
    accessor: "isAnalyzed",
    value: "",
  },
  { Header: "이름", accessor: "name", value: "" },
  { Header: "연락처", accessor: "phoneNumber", value: "" },
  { Header: "이메일", accessor: "email", value: "" },
  {
    Header: "예산",
    accessor: "budget",
    value: "",
  },
  { Header: "제품 링크", accessor: "productLink", value: "" },
  { Header: "특이사항", accessor: "uniqueness", value: "" },
  {
    Header: "대행사",
    accessor: "isAgency",
    value: "",
  },
  { Header: "태그", accessor: "tags", value: "" },
  { Header: "dataId", accessor: "id", value: "" },
];

export const questionManagementFormData = atom({
  key: "questionFormData",
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
