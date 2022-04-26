/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindUsersInput, UserRole } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findUsers
// ====================================================

export interface findUsers_findUsers_users_campaignParticipations {
  __typename: "CampaignParticipation";
  id: number;
}

export interface findUsers_findUsers_users_payments {
  __typename: "Payment";
  id: number;
}

export interface findUsers_findUsers_users_questions {
  __typename: "Question";
  id: number;
}

export interface findUsers_findUsers_users {
  __typename: "User";
  createdAt: any;
  tags: string | null;
  email: string;
  role: UserRole;
  name: string | null;
  phoneNumber: string | null;
  brandName: string | null;
  residentRegistrationNumber: string | null;
  nameId: string | null;
  campaignParticipations: findUsers_findUsers_users_campaignParticipations[] | null;
  payments: findUsers_findUsers_users_payments[] | null;
  questions: findUsers_findUsers_users_questions[] | null;
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
