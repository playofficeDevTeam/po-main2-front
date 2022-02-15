import { atom, useRecoilState } from "recoil";

export const userFormData = atom({
  key: "userFormData",
  default: ["", "", "", ""],
});

export const inputSetting = [
  {
    title: (
      <>
        브랜드명 (상호명)
        <span className=" font-bold text-orange-500 ml-1">*</span>
      </>
    ),
    inputProps: {
      placehoder: "ex. 갤럭시 (삼성전자)",
      type: "text",
      name: "brandName",
    },
  },
  {
    title: (
      <>
        담당자명 / 직급
        <span className=" font-bold text-orange-500 ml-1">*</span>
      </>
    ),
    inputProps: {
      placehoder: "ex. 홍길동 대리",
      type: "text",
      name: "name",
    },
  },
  {
    title: (
      <>
        담당자 연락처
        <span className=" font-bold text-orange-500  ml-1">*</span>
      </>
    ),
    inputProps: {
      placehoder: "ex. 010-1234-6789",
      type: "text",
      name: "phoneNumer",
    },
  },
  {
    title: (
      <>
        담당자 이메일
        <span className=" font-bold text-orange-500 ml-1">*</span>
      </>
    ),
    inputProps: {
      placehoder: "ex. abcd@gmail.com",
      type: "email",
      name: "email",
    },
  },
];

export const userFormDataValidate = [
  {
    validateFunction: (val) => {
      return val.length > 0;
    },
    validateError: "브랜드명(상호명)을 정확히 입력해주세요",
  },
  {
    validateFunction: (val) => {
      return val.length > 1;
    },
    validateError: "담당자명/직급을 정확히 입력해주세요",
  },
  {
    validateFunction: (val) => {
      return val.length > 10;
    },
    validateError: "담당자 연락처를 정확히 입력해주세요",
  },
  {
    validateFunction: (val) => {
      return val.match(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      );
    },
    validateError: "담당자 이메일을 정확히 입력해주세요",
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
