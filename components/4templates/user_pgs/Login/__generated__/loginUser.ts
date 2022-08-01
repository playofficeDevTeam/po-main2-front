/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginUserInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: loginUser
// ====================================================

export interface loginUser_loginUser {
  __typename: "LoginUserOutput";
  ok: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface loginUser {
  loginUser: loginUser_loginUser;
}

export interface loginUserVariables {
  input: LoginUserInput;
}
