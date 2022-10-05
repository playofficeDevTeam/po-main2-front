import { useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { LOCAL_SAVED_MEMVER_ID } from "../../../common/Layout";
import { convertKoreanPhoneNumberToInternationalPhoneNumberAndRemoveNonNumber } from "../../payment_pgs/OrderSheet_pg/Mol_formApplyBtn";
import {
  userFormData,
  userFormDataValidate,
} from "../../payment_pgs/OrderSheet_pg/Var_userFormData";
import { EDIT_QUESTION } from "../QuestionForm_pg/Gql_question";
import {
  userDetail1FormData,
  userDetail1FormDataValidate,
} from "../QuestionForm_pg/Var_userDetail1FormData";
import {
  EditQuestion,
  EditQuestionVariables,
} from "../QuestionForm_pg/__generated__/EditQuestion";

export default function App({ onClick = () => {} }) {
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);
  const [userDetail1FormDataState, setUserDetail1FormDataState] =
    useRecoilState(userDetail1FormData);

  const questionId = +(window.localStorage.getItem("questionId") ?? -1);
  const [editQuestion] = useMutation<EditQuestion, EditQuestionVariables>(
    EDIT_QUESTION,
    { onCompleted: () => {} }
  );

  return (
    <div
      className="flex font-medium px-10 py-1 rounded-lg cursor-pointer  w-max  border-2 text-gray-600"
      onClick={() => {
        try {
          userFormDataValidate.forEach((val, idx) => {
            if (!val.validateFunction(userFormDataState[idx])) {
              const error = val.validateError;
              throw error;
            }
          });
          userDetail1FormDataValidate.forEach((val, idx) => {
            if (!val.validateFunction(userDetail1FormDataState[idx])) {
              const error = val.validateError;
              throw error;
            }
          });
          window.localStorage.setItem(
            "userFormDataState",
            JSON.stringify(userFormDataState)
          );
          window.localStorage.setItem(
            "userDetail1FormDataState",
            JSON.stringify(userDetail1FormDataState)
          );

          //memberId 가져오기
          const memberId = window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID);

          editQuestion({
            variables: {
              input: {
                memberId,
                id: questionId,
                brandName: userFormDataState[0].trim(),
                name: userFormDataState[1].trim(),
                phoneNumber:
                  convertKoreanPhoneNumberToInternationalPhoneNumberAndRemoveNonNumber(
                    userFormDataState[2].trim()
                  ),
                email: userFormDataState[3].trim(),
                budget: userDetail1FormDataState[0] + "",
                productLink: userDetail1FormDataState[1] + "",
                uniqueness: userDetail1FormDataState[2] + "",
                isAgency: userDetail1FormDataState[3] as boolean,
              },
            },
          });
          onClick();
        } catch (error) {
          alert(error);
        }
      }}
    >
      수정완료
    </div>
  );
}
