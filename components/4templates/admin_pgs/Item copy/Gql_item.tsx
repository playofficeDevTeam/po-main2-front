import { gql } from "@apollo/client";

export const FIND_ALL_ITEM = gql`
  query findAllItems {
    findAllItems {
      ok
      error
      items {
        id
        createdAt
        itemCategory1
        itemName
        detailInfo
        price
        discountRate
        type
      }
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation createItem($input: CreateItemInput!) {
    createItem(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_ITEM = gql`
  mutation editItem($input: EditItemInput!) {
    editItem(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($input: DeleteItemInput!) {
    deleteItem(input: $input) {
      ok
      error
    }
  }
`;
