/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePaymentForAdminInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createPaymentForAdmin
// ====================================================

export interface createPaymentForAdmin_createPaymentForAdmin {
  __typename: "CreatePaymentForAdminOutput";
  ok: boolean;
  error: string | null;
  createdAt: any | null;
}

export interface createPaymentForAdmin {
  createPaymentForAdmin: createPaymentForAdmin_createPaymentForAdmin;
}

export interface createPaymentForAdminVariables {
  input: CreatePaymentForAdminInput;
}
