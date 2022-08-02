import { gql } from "@apollo/client";

export const RENEWAL_ADMIN_ACCESS_TOKEN = gql`
  mutation renewalAdminAccessToken($input: RenewalAdminAccessTokenInput!) {
    renewalAdminAccessToken(input: $input) {
      ok
      error
      accessToken
      refreshToken
    }
  }
`;
