/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAdminSuperInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createAdmin
// ====================================================

export interface createAdmin_createAdmin {
  __typename: "CreateAdminOutput";
  ok: boolean;
  error: string | null;
}

export interface createAdmin {
  createAdmin: createAdmin_createAdmin;
}

export interface createAdminVariables {
  input: CreateAdminSuperInput;
}
