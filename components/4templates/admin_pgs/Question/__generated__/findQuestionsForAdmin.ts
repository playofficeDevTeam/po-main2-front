/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindQuestionsInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findQuestionsForAdmin
// ====================================================

export interface findQuestionsForAdmin_findQuestionsForAdmin_questions {
  __typename: "Question";
  brandName: string | null;
  tags: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  budget: string | null;
  productLink: string | null;
  uniqueness: string | null;
  isAgency: boolean | null;
}

export interface findQuestionsForAdmin_findQuestionsForAdmin {
  __typename: "FindQuestionsOutput";
  ok: boolean;
  error: string | null;
  questions: findQuestionsForAdmin_findQuestionsForAdmin_questions[] | null;
}

export interface findQuestionsForAdmin {
  findQuestionsForAdmin: findQuestionsForAdmin_findQuestionsForAdmin;
}

export interface findQuestionsForAdminVariables {
  input: FindQuestionsInput;
}
