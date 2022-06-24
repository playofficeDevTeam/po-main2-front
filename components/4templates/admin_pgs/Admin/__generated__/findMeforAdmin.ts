/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminRole } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findMeforAdmin
// ====================================================

export interface findMeforAdmin_findMeforAdmin_admin {
  __typename: "Admin";
  id: number;
  createdAt: any;
  email: string | null;
  nickname: string | null;
  role: AdminRole | null;
  profilePicture: string | null;
}

export interface findMeforAdmin_findMeforAdmin {
  __typename: "FindAdminOutput";
  ok: boolean;
  error: string | null;
  admin: findMeforAdmin_findMeforAdmin_admin | null;
}

export interface findMeforAdmin {
  findMeforAdmin: findMeforAdmin_findMeforAdmin;
}
