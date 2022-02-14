/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPaymentFormDataInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditPaymentForm
// ====================================================

export interface EditPaymentForm_editPaymentFormData {
  __typename: "EditPaymentFormDataOutput";
  ok: boolean;
  error: string | null;
}

export interface EditPaymentForm {
  editPaymentFormData: EditPaymentForm_editPaymentFormData;
}

export interface EditPaymentFormVariables {
  input: EditPaymentFormDataInput;
}
