/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RenewalAdminAccessTokenInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RenewalAdminAccessToken
// ====================================================

export interface RenewalAdminAccessToken_renewalAdminAccessToken {
  __typename: "RenewalAdminAccessTokenOutput";
  ok: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface RenewalAdminAccessToken {
  renewalAdminAccessToken: RenewalAdminAccessToken_renewalAdminAccessToken;
}

export interface RenewalAdminAccessTokenVariables {
  input: RenewalAdminAccessTokenInput;
}
