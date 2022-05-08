/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindOneQuestionInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findOneQuestion
// ====================================================

export interface findOneQuestion_findOneQuestion_question {
  __typename: "Question";
  id: number;
  brandName: string | null;
}

export interface findOneQuestion_findOneQuestion {
  __typename: "FindOneQuestionOutput";
  ok: boolean;
  error: string | null;
  question: findOneQuestion_findOneQuestion_question | null;
}

export interface findOneQuestion {
  findOneQuestion: findOneQuestion_findOneQuestion;
}

export interface findOneQuestionVariables {
  input: FindOneQuestionInput;
}
