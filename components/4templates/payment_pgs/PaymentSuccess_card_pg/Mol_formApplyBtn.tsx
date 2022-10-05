import { useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { LOCAL_SAVED_MEMVER_ID } from "../../../common/Layout";
import { convertKoreanPhoneNumberToInternationalPhoneNumberAndRemoveNonNumber } from "../OrderSheet_pg/Mol_formApplyBtn";
import {
  userFormData,
  userFormDataValidate,
} from "../OrderSheet_pg/Var_userFormData";
import { EDIT_PAYMENT_FORM } from "./Gql_editPayment";
import {
  EditPaymentForm,
  EditPaymentFormVariables,
} from "./__generated__/EditPaymentForm";

export default function App({ onClick = () => {} }) {
  const paymentId = +(window.localStorage.getItem("paymentId") ?? 0);
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const [editPaymentFormData] = useMutation<
    EditPaymentForm,
    EditPaymentFormVariables
  >(EDIT_PAYMENT_FORM);

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
          window.localStorage.setItem(
            "userFormDataState",
            JSON.stringify(userFormDataState)
          );

          // memberId 가져오기
          const memberId =
            window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID) ?? "";

          editPaymentFormData({
            variables: {
              input: {
                memberId,
                id: paymentId,
                brandName: userFormDataState[0].trim(),
                name: userFormDataState[1].trim(),
                phoneNumber:
                  convertKoreanPhoneNumberToInternationalPhoneNumberAndRemoveNonNumber(
                    userFormDataState[2].trim()
                  ),
                email: userFormDataState[3].trim(),
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
