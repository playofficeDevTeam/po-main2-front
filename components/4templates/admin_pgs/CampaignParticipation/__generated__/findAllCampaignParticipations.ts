/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindAllCampaignParticipationsInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findAllCampaignParticipations
// ====================================================

export interface findAllCampaignParticipations_findAllCampaignParticipations_campaignParticipations_user {
  __typename: "User";
  nameId: string | null;
}

export interface findAllCampaignParticipations_findAllCampaignParticipations_campaignParticipations_campaign_partner {
  __typename: "User";
  nameId: string | null;
}

export interface findAllCampaignParticipations_findAllCampaignParticipations_campaignParticipations_campaign {
  __typename: "Campaign";
  partner: findAllCampaignParticipations_findAllCampaignParticipations_campaignParticipations_campaign_partner | null;
  cumulativeOrder: number | null;
  itemName: string | null;
  keyword: string | null;
}

export interface findAllCampaignParticipations_findAllCampaignParticipations_campaignParticipations {
  __typename: "CampaignParticipation";
  id: number;
  createdAt: any;
  user: findAllCampaignParticipations_findAllCampaignParticipations_campaignParticipations_user | null;
  campaign: findAllCampaignParticipations_findAllCampaignParticipations_campaignParticipations_campaign | null;
  manuscriptFee: number | null;
  proposal: string | null;
  consent: string | null;
  guide: string | null;
  plan: string | null;
  isFileTaxes: boolean | null;
}

export interface findAllCampaignParticipations_findAllCampaignParticipations {
  __typename: "FindAllCampaignParticipationsOutput";
  ok: boolean;
  error: string | null;
  campaignParticipations: findAllCampaignParticipations_findAllCampaignParticipations_campaignParticipations[] | null;
}

export interface findAllCampaignParticipations {
  findAllCampaignParticipations: findAllCampaignParticipations_findAllCampaignParticipations;
}

export interface findAllCampaignParticipationsVariables {
  input: FindAllCampaignParticipationsInput;
}
