import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($input: LoginAdminInput!) {
    loginAdmin(input: $input) {
      ok
      error
      accessToken
      refreshToken
    }
  }
`;

export const RENEWAL_ADMIN_ACCESS_TOKEN = gql`
  mutation RenewalAdminAccessToken($input: RenewalAdminAccessTokenInput!) {
    renewalAdminAccessToken(input: $input) {
      ok
      error
      accessToken
    }
  }
`;
