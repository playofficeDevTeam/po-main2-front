/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RenewalAdminAccessTokenInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: renewalAdminAccessToken
// ====================================================

export interface renewalAdminAccessToken_renewalAdminAccessToken {
  __typename: "RenewalAdminAccessTokenOutput";
  ok: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface renewalAdminAccessToken {
  renewalAdminAccessToken: renewalAdminAccessToken_renewalAdminAccessToken;
}

export interface renewalAdminAccessTokenVariables {
  input: RenewalAdminAccessTokenInput;
}
