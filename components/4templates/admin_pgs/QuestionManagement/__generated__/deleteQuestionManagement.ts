/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteQuestionManagementInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteQuestionManagement
// ====================================================

export interface deleteQuestionManagement_deleteQuestionManagement {
  __typename: "DeleteQuestionManagementOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteQuestionManagement {
  deleteQuestionManagement: deleteQuestionManagement_deleteQuestionManagement;
}

export interface deleteQuestionManagementVariables {
  input: DeleteQuestionManagementInput;
}
