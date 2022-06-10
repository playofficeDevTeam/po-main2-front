import { gql } from "@apollo/client";

export const FIND_CAMPAIGNS = gql`
  query findCampaigns($input: FindCampaignsInput!) {
    findCampaigns(input: $input) {
      ok
      error
      campaigns {
        id
        createdAt
        tags
        salesDate
        targetDate
        cumulativeOrder
        itemName
        keyword
        media
        service
        form
        plan
        price
        amount
        discountRate
        commisstion
        advertisingCost
        partner {
          nameId
        }
      }
    }
  }
`;

export const CREATE_CAMPAIGN = gql`
  mutation createCampaign($input: CreateCampaignInput!) {
    createCampaign(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_CAMPAIGN = gql`
  mutation editCampaign($input: EditCampaignInput!) {
    editCampaign(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_CAMPAIGN = gql`
  mutation deleteCampaign($input: DeleteCampaignInput!) {
    deleteCampaign(input: $input) {
      ok
      error
    }
  }
`;
