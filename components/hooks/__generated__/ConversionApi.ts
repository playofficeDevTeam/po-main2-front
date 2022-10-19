/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConversionApiInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ConversionApi
// ====================================================

export interface ConversionApi_conversionApi {
  __typename: "ConversionApiOutput";
  ok: boolean;
  error: string | null;
}

export interface ConversionApi {
  conversionApi: ConversionApi_conversionApi;
}

export interface ConversionApiVariables {
  input: ConversionApiInput;
}
