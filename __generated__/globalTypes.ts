/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AdminRole {
  General = "General",
  Super = "Super",
}

export enum UserRole {
  Creator = "Creator",
  Partner = "Partner",
}

export interface AdminInputType {
  campaignsToManagement: CampaignInputType[];
  campaignsSold: CampaignInputType[];
  email: string;
  password: string;
  nickName: string;
  role: AdminRole;
  refreshToken: string;
}

export interface CampaignInputType {
  tags?: string | null;
  salesDate?: any | null;
  targetDate?: any | null;
  brandName?: string | null;
  cumulativeOrder?: number | null;
  itemName?: string | null;
  keyword?: string | null;
  media?: string | null;
  service?: string | null;
  form?: string | null;
  plan?: string | null;
  price?: number | null;
  amount?: number | null;
  discountRate?: number | null;
  commisstion?: number | null;
  advertisingCost?: number | null;
  payment?: paymentInputType | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  campaignManagers?: AdminInputType[] | null;
  salesManager?: AdminInputType | null;
}

export interface CampaignParticipationInput {
  CampaignUploadLinks?: CampaignUploadLinkType[] | null;
  user?: UserInputType | null;
  userId?: number | null;
  campaign: CampaignInputType;
  campaignId?: number | null;
  manuscriptFee?: number | null;
  proposal?: boolean | null;
  consent?: boolean | null;
  guide?: string | null;
  plan?: string | null;
  isFileTaxes?: boolean | null;
  paymentDate?: any | null;
}

export interface CampaignUploadLinkType {
  uploadDate: any;
  uploadLink: string;
  campaignParticipation: CampaignParticipationInput;
}

export interface CreateItemInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  itemCategory1?: string | null;
  itemName?: string | null;
  detailInfo?: string[] | null;
  price?: number | null;
  discount?: boolean | null;
  discountRate?: number | null;
  type?: string | null;
  carts?: cartInputType[] | null;
}

export interface CreatePaymentInput {
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  paymentMethod?: string | null;
  paymentKey?: string | null;
  orderId?: string | null;
  amount?: number | null;
  itemInfo?: ItemIdAndAmount[] | null;
}

export interface CreateQuestionInput {
  tags?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: string | null;
  productLink?: string | null;
  uniqueness?: string | null;
  isAgency?: boolean | null;
  user?: UserInputType | null;
}

export interface EditPaymentFormDataInput {
  id: number;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
}

export interface EditQuestionInput {
  tags?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: string | null;
  productLink?: string | null;
  uniqueness?: string | null;
  isAgency?: boolean | null;
  user?: UserInputType | null;
  id: number;
}

export interface FindPaymentInput {
  id: number;
}

export interface ItemIdAndAmount {
  itemId?: number | null;
  amountOfItem?: number | null;
}

export interface UserInputType {
  tags?: string | null;
  email: string;
  password: string;
  refreshToken: string;
  role: UserRole;
  campaignParticipations: CampaignParticipationInput[];
  payments: paymentInputType[];
  questions: questionInputType[];
}

export interface cartInputType {
  item?: itemInputType | null;
  itemId: number;
  amountOfItem: number;
  payment: paymentInputType;
  paymentId: number;
}

export interface itemInputType {
  itemCategory1?: string | null;
  itemName?: string | null;
  detailInfo?: string[] | null;
  price?: number | null;
  discount?: boolean | null;
  discountRate?: number | null;
  type?: string | null;
  carts?: cartInputType[] | null;
}

export interface paymentInputType {
  tags?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  user?: UserInputType | null;
  carts?: cartInputType[] | null;
  paymentMethod: string;
  paymentKey?: string | null;
  orderId?: string | null;
  amount?: number | null;
  paymentState?: string | null;
  campaigns?: CampaignInputType[] | null;
}

export interface questionInputType {
  tags?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: string | null;
  productLink?: string | null;
  uniqueness?: string | null;
  isAgency?: boolean | null;
  user?: UserInputType | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
