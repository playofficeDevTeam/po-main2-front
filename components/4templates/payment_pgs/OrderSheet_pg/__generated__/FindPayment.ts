/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindPaymentInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: FindPayment
// ====================================================

export interface FindPayment_findPayment_payment {
  __typename: "Payment";
  brandName: string;
}

export interface FindPayment_findPayment {
  __typename: "FindPaymentOutput";
  ok: boolean;
  error: string | null;
  payment: FindPayment_findPayment_payment | null;
}

export interface FindPayment {
  findPayment: FindPayment_findPayment;
}

export interface FindPaymentVariables {
  input: FindPaymentInput;
}
