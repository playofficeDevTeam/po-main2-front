/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteAdminInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteAdmin
// ====================================================

export interface deleteAdmin_deleteAdmin {
  __typename: "DeleteAdminOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteAdmin {
  deleteAdmin: deleteAdmin_deleteAdmin;
}

export interface deleteAdminVariables {
  input: DeleteAdminInput;
}
