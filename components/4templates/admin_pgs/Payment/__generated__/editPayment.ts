/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPaymentInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editPayment
// ====================================================

export interface editPayment_editPayment {
  __typename: "EditPaymentOutput";
  ok: boolean;
  error: string | null;
}

export interface editPayment {
  editPayment: editPayment_editPayment;
}

export interface editPaymentVariables {
  input: EditPaymentInput;
}
