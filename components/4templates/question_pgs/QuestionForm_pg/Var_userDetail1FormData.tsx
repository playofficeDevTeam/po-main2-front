import { atom, useRecoilState } from "recoil";

export const userDetail1FormData = atom({
  key: "userDetail1FormData",
  default: ["선택", "", "", false],
});

export const inputDetail1Setting = [
  {
    title: (
      <>
        예산
        <span className=" font-bold text-orange-500 ml-1">*</span>
      </>
    ),
    selectList: [
      "100~199만원",
      "200~299만원",
      "300~399만원",
      "400~499만원",
      "500만원~",
    ],
    required: true,
  },
  {
    title: (
      <>
        제품 링크
        <span className=" font-bold text-orange-500 ml-1">*</span>
      </>
    ),
    inputProps: {
      placehoder: "광고하고자 하는 제품의 상세페이지 링크",
      type: "text",
      name: "link",
    },
    required: true,
  },
  {
    title: "특이사항",
    inputProps: {
      placehoder: "상세내용 작성 부탁드립니다.",
      type: "textarea",
      name: "etc",
    },
    required: false,
  },
  {
    title: "대행사여부",
    required: false,
  },
];

export const userDetail1FormDataValidate = [
  // 예산
  {
    validateFunction: (val) => {
      return val !== "선택";
    },
    validateError: "예산을 선택해주세요",
  },
  {
    validateFunction: (val) => {
      return val.length > 0;
    },
    validateError: "링크를 입력해주세요",
  },
  {
    validateFunction: (val) => {
      return true;
    },
    validateError: "",
  },
  {
    validateFunction: (val) => {
      return true;
    },
    validateError: "",
  },
];

export const useUserDetail1FormDataOnChange = () => {
  const [userDetail1FormDataState, setUserDetail1FormDataState] =
    useRecoilState(userDetail1FormData);

  const onChange = (e, id) =>
    setUserDetail1FormDataState((formData) =>
      formData.map((val, idx) => (idx === id ? e.target.value : val))
    );
  return onChange;
};
