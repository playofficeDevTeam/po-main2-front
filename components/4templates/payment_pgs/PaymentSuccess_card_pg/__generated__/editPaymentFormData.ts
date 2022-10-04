/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPaymentFormDataInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editPaymentFormData
// ====================================================

export interface editPaymentFormData_editPaymentFormData {
  __typename: "EditPaymentFormDataOutput";
  ok: boolean;
  error: string | null;
}

export interface editPaymentFormData {
  editPaymentFormData: editPaymentFormData_editPaymentFormData;
}

export interface editPaymentFormDataVariables {
  input: EditPaymentFormDataInput;
}
