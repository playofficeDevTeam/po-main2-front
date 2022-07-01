/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCampaignInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createCampaign
// ====================================================

export interface createCampaign_createCampaign {
  __typename: "CreateCampaignOutput";
  ok: boolean;
  error: string | null;
}

export interface createCampaign {
  createCampaign: createCampaign_createCampaign;
}

export interface createCampaignVariables {
  input: CreateCampaignInput;
}
