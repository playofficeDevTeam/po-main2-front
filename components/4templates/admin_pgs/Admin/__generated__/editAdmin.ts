/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditAdminInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editAdmin
// ====================================================

export interface editAdmin_editAdmin {
  __typename: "EditAdminOutput";
  ok: boolean;
  error: string | null;
}

export interface editAdmin {
  editAdmin: editAdmin_editAdmin;
}

export interface editAdminVariables {
  input: EditAdminInput;
}
