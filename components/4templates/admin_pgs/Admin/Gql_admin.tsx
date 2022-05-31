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

export const FIND_ALL_ADMIN = gql`
  query findAllAdmin {
    findAllAdmin {
      ok
      error
      admins {
        id
        createdAt
        email
        nickName
        role
      }
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation createAdmin($input: CreateAdminSuperInput!) {
    createAdmin(input: $input) {
      ok
      error
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
export const DELETE_ADMIN = gql`
  mutation deleteAdmin($input: DeleteAdminInput!) {
    deleteAdmin(input: $input) {
      ok
      error
    }
  }
`;
