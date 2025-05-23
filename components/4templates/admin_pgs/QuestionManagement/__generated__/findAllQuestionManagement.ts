/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindAllQuestionManagementInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findAllQuestionManagement
// ====================================================

export interface findAllQuestionManagement_findAllQuestionManagement_questionManagements_question {
  __typename: "Question";
  id: number;
  brandName: string | null;
  product: string | null;
  serviceInquired: string | null;
}

export interface findAllQuestionManagement_findAllQuestionManagement_questionManagements {
  __typename: "QuestionManagement";
  id: number;
  createdAt: any;
  mention: string | null;
  stateDate: any | null;
  stateName: string | null;
  state: string | null;
  stateTime: string | null;
  note: string | null;
  comment: string | null;
  question: findAllQuestionManagement_findAllQuestionManagement_questionManagements_question | null;
  questionId: number | null;
}

export interface findAllQuestionManagement_findAllQuestionManagement {
  __typename: "FindAllQuestionManagementOutput";
  ok: boolean;
  error: string | null;
  questionManagements: findAllQuestionManagement_findAllQuestionManagement_questionManagements[] | null;
}

export interface findAllQuestionManagement {
  findAllQuestionManagement: findAllQuestionManagement_findAllQuestionManagement;
}

export interface findAllQuestionManagementVariables {
  input: FindAllQuestionManagementInput;
}
