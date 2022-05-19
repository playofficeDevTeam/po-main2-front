/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCampaignParticipationInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteCampaignParticipation
// ====================================================

export interface deleteCampaignParticipation_deleteCampaignParticipation {
  __typename: "DeleteCampaignParticipationOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteCampaignParticipation {
  deleteCampaignParticipation: deleteCampaignParticipation_deleteCampaignParticipation;
}

export interface deleteCampaignParticipationVariables {
  input: DeleteCampaignParticipationInput;
}
