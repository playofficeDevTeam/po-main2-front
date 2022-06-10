import { gql } from "@apollo/client";

export const FIND_ALL_CAMPAIGN_PARTICIPATIONS = gql`
  query findAllCampaignParticipations(
    $input: FindAllCampaignParticipationsInput!
  ) {
    findAllCampaignParticipations(input: $input) {
      ok
      error
      campaignParticipations {
        id
        createdAt
        user {
          nameId
        }
        campaign {
          partner {
            nameId
          }
          cumulativeOrder
          itemName
          keyword
        }
        manuscriptFee
        proposal
        consent
        guide
        plan
        isFileTaxes
      }
    }
  }
`;

export const CREATE_CAMPAIGN_PARTICIPATION = gql`
  mutation createCampaignParticipation(
    $input: CreateCampaignParticipationInput!
  ) {
    createCampaignParticipation(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_CAMPAIGN_PARTICIPATION = gql`
  mutation editCampaignParticipation($input: EditCampaignParticipationInput!) {
    editCampaignParticipation(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_CAMPAIGN_PARTICIPATION = gql`
  mutation deleteCampaignParticipation(
    $input: DeleteCampaignParticipationInput!
  ) {
    deleteCampaignParticipation(input: $input) {
      ok
      error
    }
  }
`;
