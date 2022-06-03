import { gql } from "@apollo/client";

export const FIND_USERS = gql`
  query findUsers($input: FindUsersInput!) {
    findUsers(input: $input) {
      ok
      error
      users {
        id
        createdAt
        tags
        email
        role
        name
        phoneNumber
        brandName
        residentRegistrationNumber
        nameId
        campaignParticipations {
          id
        }
        payments {
          id
        }
        questions {
          id
        }
      }
    }
  }
`;

export const CREATE_USER_FOR_ADMIN = gql`
  mutation createUserForAdmin($input: CreateUserForAdminInput!) {
    createUserForAdmin(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      ok
      error
    }
  }
`;
