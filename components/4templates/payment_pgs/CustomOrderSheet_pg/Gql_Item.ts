import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      ok
      error
      itemId
    }
  }
`;
