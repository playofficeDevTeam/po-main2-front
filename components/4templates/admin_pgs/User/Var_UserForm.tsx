import { atom, useRecoilState } from "recoil";

export const userFormDefault = [
  { Header: "생성일", accessor: "createdAt", value: "" },
  { Header: "이메일(ID)", accessor: "email", value: "" },
  { Header: "이름(ID)", accessor: "nameId", value: "" },
  { Header: "이름", accessor: "name", value: "" },
  { Header: "연락처", accessor: "phoneNumber", value: "" },
  { Header: "주민등록번호", accessor: "residentRegistrationNumber", value: "" },
  { Header: "태그", accessor: "tags", value: "" },
  { Header: "dataId", accessor: "id", value: "" },
];

export const userFormData = atom({
  key: "userFormData",
  default: userFormDefault,
});

export const usePartnerFormDataOnChange = () => {
  const [questionFormDataState, setPartnerFormDataState] =
    useRecoilState(userFormData);

  const onChange = (e, id) => {
    setPartnerFormDataState((formData) =>
      formData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
