import { atom, useRecoilState } from "recoil";

export const userFormData = atom({
  key: "userFormData",
  default: ["", "", "", ""],
});

export const inputSetting = atom({
  key: "inputSetting",
  default: [
    {
      title: "브랜드명 (상호명)*",
      inputProps: {
        placehoder: "ex. 갤럭시 (삼성전자)",
        type: "text",
        name: "brandName",
      },
      validateError: "브랜드명(상호명)을 정확히 입력해주세요",
    },
    {
      title: "담당자명 / 직급*",
      inputProps: {
        placehoder: "ex. 홍길동 대리",
        type: "text",
        name: "name",
      },
      validateError: "담당자명/직급을 정확히 입력해주세요",
    },
    {
      title: "담당자 연락처*",
      inputProps: {
        placehoder: "ex. 010-1234-6789",
        type: "text",
        name: "phoneNumer",
      },
      validateError: "담당자 연락처를 정확히 입력해주세요",
    },
    {
      title: "담당자 이메일*",
      inputProps: {
        placehoder: "ex. abcd@gmail.com",
        type: "email",
        name: "email",
      },
      validateError: "담당자 이메일을 정확히 입력해주세요",
    },
  ],
});

export const userFormDataValidate = [
  (val) => {
    return val.length > 0;
  },
  (val) => {
    return val.length > 1;
  },
  (val) => {
    return val.length > 10;
  },
  (val) => {
    return val.match(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    );
  },
];

export const useUserFormDataOnChange = () => {
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const onChange = (e, id) =>
    setUserFormDataState((formData) =>
      formData.map((val, idx) => (idx === id ? e.target.value : val))
    );
  return onChange;
};
