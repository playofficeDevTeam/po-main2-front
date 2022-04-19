import { atom, useRecoilState } from "recoil";

export const questionFormData = atom({
  key: "questionFormData",
  default: [
    { Header: "생성일", accessor: "createdAt", value: "" },
    { Header: "브랜드명", accessor: "brandName", value: "" },
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
  ],
});

export const useQuestionFormDataOnChange = () => {
  const [questionFormDataState, setQuestionFormDataState] =
    useRecoilState(questionFormData);

  const onChange = (e, id) => {
    setQuestionFormDataState((formData) =>
      formData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
