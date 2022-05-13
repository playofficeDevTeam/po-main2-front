/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findAllItems
// ====================================================

export interface findAllItems_findAllItems_items {
  __typename: "Item";
  id: number;
  createdAt: any;
  itemCategory1: string | null;
  itemName: string | null;
  detailInfo: string[] | null;
  price: number | null;
  discountRate: number | null;
  type: string | null;
}

export interface findAllItems_findAllItems {
  __typename: "FindAllItemsOutput";
  ok: boolean;
  error: string | null;
  items: findAllItems_findAllItems_items[] | null;
}

export interface findAllItems {
  findAllItems: findAllItems_findAllItems;
}
