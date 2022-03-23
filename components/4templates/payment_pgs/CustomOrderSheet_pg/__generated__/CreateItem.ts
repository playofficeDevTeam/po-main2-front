/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateItemInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateItem
// ====================================================

export interface CreateItem_createItem {
  __typename: "CreateItemOutput";
  ok: boolean;
  error: string | null;
  itemId: number | null;
}

export interface CreateItem {
  createItem: CreateItem_createItem;
}

export interface CreateItemVariables {
  input: CreateItemInput;
}
