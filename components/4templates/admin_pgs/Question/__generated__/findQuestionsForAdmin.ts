/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindQuestionsInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findQuestionsForAdmin
// ====================================================

export interface findQuestionsForAdmin_findQuestionsForAdmin_questions_user {
  __typename: "User";
  nameId: string | null;
}

export interface findQuestionsForAdmin_findQuestionsForAdmin_questions_contactPerson {
  __typename: "Admin";
  nickname: string | null;
}

export interface findQuestionsForAdmin_findQuestionsForAdmin_questions {
  __typename: "Question";
  id: number;
  createdAt: any;
  mention: string | null;
  brandName: string | null;
  tags: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  budget: number | null;
  productLink: string | null;
  uniqueness: string | null;
  isAgency: boolean | null;
  user: findQuestionsForAdmin_findQuestionsForAdmin_questions_user | null;
  contactPerson: findQuestionsForAdmin_findQuestionsForAdmin_questions_contactPerson | null;
  paymentDueDate: any | null;
  product: string | null;
  serviceInquired: string | null;
  isAnalyzed: boolean | null;
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
