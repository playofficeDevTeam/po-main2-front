import { useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userFormData } from "../OrderSheet_pg/Var_userFormData";
import { EDIT_PAYMENT_FORM } from "./Gql_editPayment";
import {
  EditPaymentForm,
  EditPaymentFormVariables,
} from "./__generated__/EditPaymentForm";

export default function App({ onClick = () => {} }) {
  const paymentId = +(window.localStorage.getItem("paymentId") ?? 0);
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const [editPayment] = useMutation<EditPaymentForm, EditPaymentFormVariables>(
    EDIT_PAYMENT_FORM
  );

  return (
    <div
      className="flex font-medium px-10 py-1 rounded-lg cursor-pointer  w-max  border-2 text-gray-600"
      onClick={() => {
        window.localStorage.setItem(
          "userFormDataState",
          JSON.stringify(userFormDataState)
        );
        editPayment({
          variables: {
            input: {
              id: paymentId,
              brandName: userFormDataState[0],
              name: userFormDataState[1],
              phoneNumber: userFormDataState[2],
              email: userFormDataState[3],
            },
          },
        });
        onClick();
      }}
    >
      수정완료
    </div>
  );
}
