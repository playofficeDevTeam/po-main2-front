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
