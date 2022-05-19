/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindCampaignsInput } from "../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findCampaigns
// ====================================================

export interface findCampaigns_findCampaigns_campaigns_partner {
  __typename: "User";
  nameId: string | null;
}

export interface findCampaigns_findCampaigns_campaigns {
  __typename: "Campaign";
  id: number;
  createdAt: any;
  tags: string | null;
  salesDate: any | null;
  targetDate: any | null;
  cumulativeOrder: number | null;
  itemName: string | null;
  keyword: string | null;
  media: string | null;
  service: string | null;
  form: string | null;
  plan: string | null;
  price: number | null;
  amount: number | null;
  discountRate: number | null;
  commisstion: number | null;
  advertisingCost: number | null;
  partner: findCampaigns_findCampaigns_campaigns_partner | null;
}

export interface findCampaigns_findCampaigns {
  __typename: "FindCampaignsOutput";
  ok: boolean;
  error: string | null;
  campaigns: findCampaigns_findCampaigns_campaigns[] | null;
}

export interface findCampaigns {
  findCampaigns: findCampaigns_findCampaigns;
}

export interface findCampaignsVariables {
  input: FindCampaignsInput;
}
