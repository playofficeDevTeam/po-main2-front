import { atom, useRecoilState } from "recoil";

export const partnerFormDefault = [
  { Header: "생성일", accessor: "createdAt", value: "" },
  { Header: "이메일(ID)", accessor: "email", value: "" },
  { Header: "브랜드명(ID)", accessor: "nameId", value: "" },
  { Header: "브랜드명", accessor: "brandName", value: "" },
  { Header: "이름", accessor: "name", value: "" },
  { Header: "연락처", accessor: "phoneNumber", value: "" },
  { Header: "주민등록번호", accessor: "residentRegistrationNumber", value: "" },
  { Header: "태그", accessor: "tags", value: "" },
  { Header: "dataId", accessor: "id", value: "" },
];

export const partnerFormData = atom({
  key: "partnerFormData",
  default: partnerFormDefault,
});

export const usePartnerFormDataOnChange = () => {
  const [questionFormDataState, setPartnerFormDataState] =
    useRecoilState(partnerFormData);

  const onChange = (e, id) => {
    setPartnerFormDataState((formData) =>
      formData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
