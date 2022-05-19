/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCampaignParticipationInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editCampaignParticipation
// ====================================================

export interface editCampaignParticipation_editCampaignParticipation {
  __typename: "EditCampaignParticipationOutput";
  ok: boolean;
  error: string | null;
}

export interface editCampaignParticipation {
  editCampaignParticipation: editCampaignParticipation_editCampaignParticipation;
}

export interface editCampaignParticipationVariables {
  input: EditCampaignParticipationInput;
}
