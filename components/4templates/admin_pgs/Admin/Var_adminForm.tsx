import { atom, useRecoilState } from "recoil";

export const adminFormDefault = [
  {
    Header: "생성일",
    accessor: "createdAt",
    value: "",
  },
  {
    Header: "이메일(ID)",
    accessor: "email",
    value: "",
  },
  {
    Header: "닉네임",
    accessor: "nickName",
    value: "",
  },

  {
    Header: "역할",
    accessor: "role",
    value: "",
  },
  { Header: "dataId", accessor: "id", value: "" },
];

export const adminFormData = atom({
  key: "adminFormData",
  default: adminFormDefault,
});

export const usePartnerFormDataOnChange = () => {
  const [questionFormDataState, setPartnerFormDataState] =
    useRecoilState(adminFormData);

  const onChange = (e, id) => {
    setPartnerFormDataState((formData) =>
      formData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
