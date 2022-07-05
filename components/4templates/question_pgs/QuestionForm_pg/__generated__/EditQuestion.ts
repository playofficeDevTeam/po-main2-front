/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditQuestionInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditQuestion
// ====================================================

export interface EditQuestion_editQuestion {
  __typename: "EditQuestionOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface EditQuestion {
  editQuestion: EditQuestion_editQuestion;
}

export interface EditQuestionVariables {
  input: EditQuestionInput;
}
