/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateQuestionForAdminInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createQuestionForAdmin
// ====================================================

export interface createQuestionForAdmin_createQuestionForAdmin {
  __typename: "CreateQuestionForAdminOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
  createdAt: any | null;
}

export interface createQuestionForAdmin {
  createQuestionForAdmin: createQuestionForAdmin_createQuestionForAdmin;
}

export interface createQuestionForAdminVariables {
  input: CreateQuestionForAdminInput;
}
