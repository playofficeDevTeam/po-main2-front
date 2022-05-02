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

export interface CreateQuestionForAdminInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
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
  product?: string | null;
  isAnalyzed?: string | null;
  questionManagements?: questionManagementInputType[] | null;
  brandName_partner?: string | null;
}

export interface CreateQuestionInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
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
  product?: string | null;
  isAnalyzed?: string | null;
  questionManagements?: questionManagementInputType[] | null;
}

export interface CreateQuestionManagementInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  stateDate?: any | null;
  stateName?: string | null;
  state?: string | null;
  stateTime?: string | null;
  note?: string | null;
  question?: questionInputType | null;
  questionId?: number | null;
}

export interface CreateUserForAdminInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  email?: string | null;
  password?: string | null;
  refreshToken?: string | null;
  role?: UserRole | null;
  name?: string | null;
  nameId?: string | null;
  phoneNumber?: string | null;
  brandName?: string | null;
  residentRegistrationNumber?: string | null;
  tags?: string | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  payments?: paymentInputType[] | null;
  questions?: questionInputType[] | null;
}

export interface DeleteQuestionInput {
  id: number;
}

export interface DeleteQuestionManagementInput {
  id: number;
}

export interface DeleteUserInput {
  id: number;
}

export interface EditPaymentFormDataInput {
  id: number;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
}

export interface EditQuestionInput {
  id: number;
  createdAt?: any | null;
  updatedAt?: any | null;
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
  product?: string | null;
  isAnalyzed?: string | null;
  questionManagements?: questionManagementInputType[] | null;
  brandName_partner?: string | null;
}

export interface EditQuestionManagementInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  stateDate?: any | null;
  stateName?: string | null;
  state?: string | null;
  stateTime?: string | null;
  note?: string | null;
  question?: questionInputType | null;
  questionId?: number | null;
  id: number;
}

export interface EditUserInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  email?: string | null;
  password?: string | null;
  refreshToken?: string | null;
  role?: UserRole | null;
  name?: string | null;
  nameId?: string | null;
  phoneNumber?: string | null;
  brandName?: string | null;
  residentRegistrationNumber?: string | null;
  tags?: string | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  payments?: paymentInputType[] | null;
  questions?: questionInputType[] | null;
  id: number;
}

export interface FindAllQuestionManagementInput {
  fromDate: any;
  toDate: any;
}

export interface FindPaymentInput {
  id: number;
}

export interface FindQuestionsInput {
  fromDate: any;
  toDate: any;
}

export interface FindUsersInput {
  fromDate: any;
  toDate: any;
  userRole: UserRole;
}

export interface ItemIdAndAmount {
  itemId?: number | null;
  amountOfItem?: number | null;
}

export interface LoginAdminInput {
  email: string;
  password: string;
}

export interface RenewalAdminAccessTokenInput {
  refreshToken: string;
}

export interface UserInputType {
  email?: string | null;
  password?: string | null;
  refreshToken: string;
  role: UserRole;
  name?: string | null;
  nameId?: string | null;
  phoneNumber?: string | null;
  brandName?: string | null;
  residentRegistrationNumber?: string | null;
  tags?: string | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  payments?: paymentInputType[] | null;
  questions?: questionInputType[] | null;
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
  product?: string | null;
  isAnalyzed?: string | null;
  questionManagements?: questionManagementInputType[] | null;
}

export interface questionManagementInputType {
  stateDate?: any | null;
  stateName?: string | null;
  state?: string | null;
  stateTime?: string | null;
  note?: string | null;
  question?: questionInputType | null;
  questionId?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
