/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RenewalAccessTokenInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: renewalUserAccessToken
// ====================================================

export interface renewalUserAccessToken_renewalUserAccessToken {
  __typename: "RenewalAccessTokenOutput";
  ok: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface renewalUserAccessToken {
  renewalUserAccessToken: renewalUserAccessToken_renewalUserAccessToken;
}

export interface renewalUserAccessTokenVariables {
  input: RenewalAccessTokenInput;
}
