/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditQuestionInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editQuestionForAdmin
// ====================================================

export interface editQuestionForAdmin_editQuestionForAdmin {
  __typename: "EditQuestionOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
  createdAt: any | null;
}

export interface editQuestionForAdmin {
  editQuestionForAdmin: editQuestionForAdmin_editQuestionForAdmin;
}

export interface editQuestionForAdminVariables {
  input: EditQuestionInput;
}
