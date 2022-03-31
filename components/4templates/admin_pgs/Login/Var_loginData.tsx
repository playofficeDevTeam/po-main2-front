import { atom, useRecoilState } from "recoil";

export const loginFormDataAtom = atom({
  key: "loginFormDataAtom",
  default: ["", ""],
});

export const loginFormInputSetting = [
  {
    placeholder: "이메일",
    type: "text",
    name: "email",
  },
  {
    placeholder: "패스워드",
    type: "password",
    name: "password",
  },
];

export const loginFormDataValidate = [
  {
    validateFunction: (val) => {
      return val.length > 0;
    },
    validateError: "이메일을 입력해주세요",
  },
  {
    validateFunction: (val) => {
      return val.length > 0;
    },
    validateError: "패스워드를 입력해주세요",
  },
];

export const useLoginFormDataOnChange = () => {
  const [loginFormDataState, setLoginFormDataState] =
    useRecoilState(loginFormDataAtom);

  const onChange = (e, id) =>
    setLoginFormDataState((formData) =>
      formData.map((val, idx) => (idx === id ? e.target.value : val))
    );
  return onChange;
};

export const adminLogedInAtom = atom({
  key: "adminLogedInAtom",
  default: false,
});
