import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      ok
      error
      accessToken
      refreshToken
    }
  }
`;
