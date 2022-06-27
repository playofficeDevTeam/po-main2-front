/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteQuestionInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteQuestionForAdmin
// ====================================================

export interface deleteQuestionForAdmin_deleteQuestionForAdmin {
  __typename: "DeleteQuestionOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteQuestionForAdmin {
  deleteQuestionForAdmin: deleteQuestionForAdmin_deleteQuestionForAdmin;
}

export interface deleteQuestionForAdminVariables {
  input: DeleteQuestionInput;
}
