/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserForAdminInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createUserForAdmin
// ====================================================

export interface createUserForAdmin_createUserForAdmin {
  __typename: "CreateUserOutput";
  ok: boolean;
  error: string | null;
}

export interface createUserForAdmin {
  createUserForAdmin: createUserForAdmin_createUserForAdmin;
}

export interface createUserForAdminVariables {
  input: CreateUserForAdminInput;
}
