import { gql } from "@apollo/client";

export const RENEWAL_USER_ACCESS_TOKEN = gql`
  mutation renewalUserAccessToken($input: RenewalAccessTokenInput!) {
    renewalUserAccessToken(input: $input) {
      ok
      error
      accessToken
      refreshToken
    }
  }
`;
