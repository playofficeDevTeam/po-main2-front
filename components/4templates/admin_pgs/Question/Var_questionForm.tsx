import { atom, useRecoilState } from "recoil";

export const questionFormData = atom({
  key: "questionFormData",
  default: ["", "", "", "", "", "", "", "", ""],
});

export const useQuestionFormDataOnChange = () => {
  const [questionFormDataState, setQuestionFormDataState] =
    useRecoilState(questionFormData);

  const onChange = (e, id) =>
    setQuestionFormDataState((formData) =>
      formData.map((val, idx) => (idx === id ? e.target.value : val))
    );
  return onChange;
};
