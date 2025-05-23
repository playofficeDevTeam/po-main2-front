import { gql } from "@apollo/client";

export const FIND_USERS = gql`
  query findUsers($input: FindUsersInput!) {
    findUsers(input: $input) {
      ok
      error
      users {
        id
        createdAt
        role
        email
        additionalEmail
        name
        nameId
        phoneNumber
        tags
        brandName
        brand_item
        brand_category
        brand_option
        brand_region
        residentRegistrationNumber

        naver_isNaverUser
        naverIn_isNaverInfluencer
        insta_isInstaUser
        youtube_isYoutubeUser

        gender
        job
        address
        bank
        accountNumber
        creditPoint
        economyPoint
        isJoinedInPlusBuddy

        insta_isExisted
        insta_id
        insta_NumberOfFollowers
        insta_canMakeVideo
        insta_category1
        insta_category2
        insta_style
        insta_professionalPoint
        insta_heathyPoint
        insta_qualitativePoint
        insta_designatedPrice
        insta_numberOfProposals
        insta_participationRate

        naver_isExisted
        naver_id
        naver_averageNumberOfVisitors
        naver_totalNumberOfVisitors
        naver_numberOfBuddys
        naver_category1
        naver_category2
        naver_heathyPoint
        naver_qualitativePoint
        naver_numberOfProposals
        naver_participationRate

        naverIn_isExisted
        naverIn_id
        naverIn_numberOfFans
        naverIn_category1
        naverIn_category2
        naverIn_numberOfProposals
        naverIn_participationRate

        youtube_id
      }
    }
  }
`;

export const CREATE_USER_FOR_ADMIN = gql`
  mutation createUserForAdmin($input: CreateUserForAdminInput!) {
    createUserForAdmin(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      ok
      error
    }
  }
`;
