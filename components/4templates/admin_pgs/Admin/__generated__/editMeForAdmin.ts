/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditMeForAdminInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editMeForAdmin
// ====================================================

export interface editMeForAdmin_editMeForAdmin {
  __typename: "EditMeForAdminOutput";
  ok: boolean;
  error: string | null;
}

export interface editMeForAdmin {
  editMeForAdmin: editMeForAdmin_editMeForAdmin;
}

export interface editMeForAdminVariables {
  input: EditMeForAdminInput;
}
