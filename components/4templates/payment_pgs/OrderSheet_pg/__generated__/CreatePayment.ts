/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePaymentInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePayment
// ====================================================

export interface CreatePayment_createPayment {
  __typename: "CreatePaymentOutput";
  ok: boolean;
  error: string | null;
  paymentId: number | null;
}

export interface CreatePayment {
  createPayment: CreatePayment_createPayment;
}

export interface CreatePaymentVariables {
  input: CreatePaymentInput;
}
