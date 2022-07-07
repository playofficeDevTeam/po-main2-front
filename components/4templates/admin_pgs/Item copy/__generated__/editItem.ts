/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditItemInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editItem
// ====================================================

export interface editItem_editItem {
  __typename: "EditItemOutput";
  ok: boolean;
  error: string | null;
}

export interface editItem {
  editItem: editItem_editItem;
}

export interface editItemVariables {
  input: EditItemInput;
}
