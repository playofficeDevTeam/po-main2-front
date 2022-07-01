/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCampaignInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editCampaign
// ====================================================

export interface editCampaign_editCampaign {
  __typename: "EditCampaignOutput";
  ok: boolean;
  error: string | null;
}

export interface editCampaign {
  editCampaign: editCampaign_editCampaign;
}

export interface editCampaignVariables {
  input: EditCampaignInput;
}
