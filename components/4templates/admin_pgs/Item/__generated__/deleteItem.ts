/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteItemInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteItem
// ====================================================

export interface deleteItem_deleteItem {
  __typename: "DeleteItemOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteItem {
  deleteItem: deleteItem_deleteItem;
}

export interface deleteItemVariables {
  input: DeleteItemInput;
}
