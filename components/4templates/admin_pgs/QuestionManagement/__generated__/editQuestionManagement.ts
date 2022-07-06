/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditQuestionManagementInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editQuestionManagement
// ====================================================

export interface editQuestionManagement_editQuestionManagement {
  __typename: "EditQuestionManagementOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
  createdAt: any | null;
}

export interface editQuestionManagement {
  editQuestionManagement: editQuestionManagement_editQuestionManagement;
}

export interface editQuestionManagementVariables {
  input: EditQuestionManagementInput;
}
