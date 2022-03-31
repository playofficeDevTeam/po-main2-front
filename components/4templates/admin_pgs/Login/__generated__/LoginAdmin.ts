/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginAdminInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: LoginAdmin
// ====================================================

export interface LoginAdmin_loginAdmin {
  __typename: "LoginAdminOutput";
  ok: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface LoginAdmin {
  loginAdmin: LoginAdmin_loginAdmin;
}

export interface LoginAdminVariables {
  input: LoginAdminInput;
}
