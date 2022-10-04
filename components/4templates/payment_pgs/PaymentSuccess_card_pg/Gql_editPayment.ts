import { gql } from "@apollo/client";

export const EDIT_PAYMENT_FORM = gql`
  mutation editPaymentFormData($input: EditPaymentFormDataInput!) {
    editPaymentFormData(input: $input) {
      ok
      error
    }
  }
`;
