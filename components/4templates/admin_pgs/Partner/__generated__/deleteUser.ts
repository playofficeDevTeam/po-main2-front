/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteUserInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteUser
// ====================================================

export interface deleteUser_deleteUser {
  __typename: "DeleteUserOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteUser {
  deleteUser: deleteUser_deleteUser;
}

export interface deleteUserVariables {
  input: DeleteUserInput;
}
