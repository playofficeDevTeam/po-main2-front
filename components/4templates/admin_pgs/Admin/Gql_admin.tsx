import { gql } from "@apollo/client";

export const FIND_ME_FOR_ADMIN = gql`
  query findMeforAdmin {
    findMeforAdmin {
      ok
      error
      admin {
        email
        role
      }
    }
  }
`;

export const EDIT_ADMIN = gql`
  mutation editAdmin($input: EditAdminInput!) {
    editAdmin(input: $input) {
      ok
      error
    }
  }
`;
export const EDIT_ME_FOR_ADMIN = gql`
  mutation editMeForAdmin($input: EditMeForAdminInput!) {
    editMeForAdmin(input: $input) {
      ok
      error
    }
  }
`;
