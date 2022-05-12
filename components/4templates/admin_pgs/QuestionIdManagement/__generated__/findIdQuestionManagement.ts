/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindIdQuestionManagementInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findIdQuestionManagement
// ====================================================

export interface findIdQuestionManagement_findIdQuestionManagement_questionManagements_question {
  __typename: "Question";
  id: number;
  brandName: string | null;
  product: string | null;
  serviceInquired: string | null;
}

export interface findIdQuestionManagement_findIdQuestionManagement_questionManagements {
  __typename: "QuestionManagement";
  id: number;
  createdAt: any;
  stateDate: any | null;
  stateName: string | null;
  state: string | null;
  stateTime: string | null;
  note: string | null;
  comment: string | null;
  question: findIdQuestionManagement_findIdQuestionManagement_questionManagements_question | null;
  questionId: number | null;
}

export interface findIdQuestionManagement_findIdQuestionManagement {
  __typename: "FindAllQuestionManagementOutput";
  ok: boolean;
  error: string | null;
  questionManagements: findIdQuestionManagement_findIdQuestionManagement_questionManagements[] | null;
}

export interface findIdQuestionManagement {
  findIdQuestionManagement: findIdQuestionManagement_findIdQuestionManagement;
}

export interface findIdQuestionManagementVariables {
  input: FindIdQuestionManagementInput;
}
