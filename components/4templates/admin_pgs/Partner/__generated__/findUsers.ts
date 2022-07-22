/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindUsersInput, UserRole } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findUsers
// ====================================================

export interface findUsers_findUsers_users {
  __typename: "User";
  id: number;
  createdAt: any;
  role: UserRole;
  email: string | null;
  additionalEmail: string | null;
  name: string | null;
  nameId: string | null;
  phoneNumber: string | null;
  tags: string | null;
  brandName: string | null;
  brand_item: string | null;
  brand_category: string | null;
  brand_option: string | null;
  brand_region: string | null;
  residentRegistrationNumber: string | null;
  naver_isNaverUser: boolean | null;
  naverIn_isNaverInfluencer: boolean | null;
  insta_isInstaUser: boolean | null;
  youtube_isYoutubeUser: boolean | null;
  gender: string | null;
  job: string | null;
  address: string | null;
  bank: string | null;
  accountNumber: string | null;
  creditPoint: number | null;
  qualitativePoint: number | null;
  economyPoint: number | null;
  isJoinedInPlusBuddy: boolean | null;
  insta_isExisted: boolean | null;
  insta_id: string | null;
  insta_NumberOfFollowers: number | null;
  insta_canMakeVideo: boolean | null;
  insta_category1: string | null;
  insta_category2: string | null;
  insta_style: string | null;
  insta_professionalPoint: number | null;
  insta_heathyPoint: number | null;
  insta_designatedPrice: number | null;
  insta_numberOfProposals: number | null;
  insta_participationRate: number | null;
  naver_isExisted: boolean | null;
  naver_id: string | null;
  naver_averageNumberOfVisitors: number | null;
  naver_totalNumberOfVisitors: number | null;
  naver_numberOfBuddys: number | null;
  naver_category1: string | null;
  naver_category2: string | null;
  naver_heathyPoint: number | null;
  naver_numberOfProposals: number | null;
  naver_participationRate: number | null;
  naverIn_isExisted: boolean | null;
  naverIn_id: string | null;
  naverIn_numberOfFans: number | null;
  naverIn_category1: string | null;
  naverIn_category2: string | null;
  naverIn_numberOfProposals: number | null;
  naverIn_participationRate: number | null;
  youtube_id: string | null;
}

export interface findUsers_findUsers {
  __typename: "FindUsersOutput";
  ok: boolean;
  error: string | null;
  users: findUsers_findUsers_users[] | null;
}

export interface findUsers {
  findUsers: findUsers_findUsers;
}

export interface findUsersVariables {
  input: FindUsersInput;
}
