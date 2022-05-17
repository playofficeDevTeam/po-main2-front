/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCampaignInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteCampaign
// ====================================================

export interface deleteCampaign_deleteCampaign {
  __typename: "DeleteCampaignOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteCampaign {
  deleteCampaign: deleteCampaign_deleteCampaign;
}

export interface deleteCampaignVariables {
  input: DeleteCampaignInput;
}
