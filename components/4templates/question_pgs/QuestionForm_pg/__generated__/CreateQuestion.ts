/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateQuestionInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateQuestion
// ====================================================

export interface CreateQuestion_createQuestion {
  __typename: "CreateQuestionOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface CreateQuestion {
  createQuestion: CreateQuestion_createQuestion;
}

export interface CreateQuestionVariables {
  input: CreateQuestionInput;
}
