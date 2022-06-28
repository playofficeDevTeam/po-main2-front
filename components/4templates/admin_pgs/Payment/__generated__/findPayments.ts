/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindPaymentsInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findPayments
// ====================================================

export interface findPayments_findPayments_payments_user {
  __typename: "User";
  nameId: string | null;
}

export interface findPayments_findPayments_payments {
  __typename: "Payment";
  id: number;
  createdAt: any;
  tags: string | null;
  brandName: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  paymentMethod: string | null;
  amount: number | null;
  paymentState: string | null;
  user: findPayments_findPayments_payments_user | null;
}

export interface findPayments_findPayments {
  __typename: "FindPaymentsOutput";
  ok: boolean;
  error: string | null;
  payments: findPayments_findPayments_payments[] | null;
}

export interface findPayments {
  findPayments: findPayments_findPayments;
}

export interface findPaymentsVariables {
  input: FindPaymentsInput;
}
