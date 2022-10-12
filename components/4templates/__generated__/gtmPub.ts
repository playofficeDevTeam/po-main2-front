/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GtmPubInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: gtmPub
// ====================================================

export interface gtmPub_gtmPub {
  __typename: "GtmPubOutput";
  ok: boolean;
  error: string | null;
}

export interface gtmPub {
  gtmPub: gtmPub_gtmPub;
}

export interface gtmPubVariables {
  input: GtmPubInput;
}
