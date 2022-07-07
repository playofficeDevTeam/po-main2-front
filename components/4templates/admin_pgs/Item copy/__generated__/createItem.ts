/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateItemInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createItem
// ====================================================

export interface createItem_createItem {
  __typename: "CreateItemOutput";
  ok: boolean;
  error: string | null;
}

export interface createItem {
  createItem: createItem_createItem;
}

export interface createItemVariables {
  input: CreateItemInput;
}
