/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeletePaymentInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deletePayment
// ====================================================

export interface deletePayment_deletePayment {
  __typename: "DeletePaymentOutput";
  ok: boolean;
  error: string | null;
}

export interface deletePayment {
  deletePayment: deletePayment_deletePayment;
}

export interface deletePaymentVariables {
  input: DeletePaymentInput;
}
