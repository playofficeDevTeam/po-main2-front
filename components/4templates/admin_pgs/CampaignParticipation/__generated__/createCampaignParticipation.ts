/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCampaignParticipationInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createCampaignParticipation
// ====================================================

export interface createCampaignParticipation_createCampaignParticipation {
  __typename: "CreateCampaignParticipationOutput";
  ok: boolean;
  error: string | null;
}

export interface createCampaignParticipation {
  createCampaignParticipation: createCampaignParticipation_createCampaignParticipation;
}

export interface createCampaignParticipationVariables {
  input: CreateCampaignParticipationInput;
}
