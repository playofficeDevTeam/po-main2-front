/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateQuestionManagementInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createQuestionManagement
// ====================================================

export interface createQuestionManagement_createQuestionManagement {
  __typename: "CreateQuestionManagementOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
  createdAt: any | null;
}

export interface createQuestionManagement {
  createQuestionManagement: createQuestionManagement_createQuestionManagement;
}

export interface createQuestionManagementVariables {
  input: CreateQuestionManagementInput;
}
