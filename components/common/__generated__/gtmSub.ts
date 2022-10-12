/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GtmSubInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: gtmSub
// ====================================================

export interface gtmSub_gtmSub {
  __typename: "GtmSubOutput";
  ok: boolean;
  error: string | null;
  event: string;
  eventModel: string | null;
}

export interface gtmSub {
  gtmSub: gtmSub_gtmSub;
}

export interface gtmSubVariables {
  input: GtmSubInput;
}
