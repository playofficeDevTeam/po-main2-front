/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminRole } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findAllAdmin
// ====================================================

export interface findAllAdmin_findAllAdmin_admins {
  __typename: "Admin";
  id: number;
  createdAt: any;
  email: string | null;
  nickname: string | null;
  role: AdminRole | null;
  profilePicture: string | null;
}

export interface findAllAdmin_findAllAdmin {
  __typename: "FindAllAdminsOutput";
  ok: boolean;
  error: string | null;
  admins: findAllAdmin_findAllAdmin_admins[] | null;
}

export interface findAllAdmin {
  findAllAdmin: findAllAdmin_findAllAdmin;
}
