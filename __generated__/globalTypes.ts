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
  email?: string | null;
  nickname?: string | null;
  profilePicture?: string | null;
  socialId?: string | null;
  socialChatId?: string | null;
  socialAccessToken?: string | null;
  socialRefreshToken?: string | null;
  role?: AdminRole | null;
  refreshToken?: string | null;
  questionsInCharge?: questionInputType[] | null;
  paymentsInCharge?: paymentInputType[] | null;
}

export interface CampaignInputType {
  tags?: string | null;
  salesDate?: any | null;
  targetDate?: any | null;
  partner?: UserInputType | null;
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
  campaignParticipations?: CampaignParticipationInput[] | null;
  campaignManagers?: AdminInputType[] | null;
  salesManager?: AdminInputType | null;
}

export interface CampaignParticipationInput {
  CampaignUploadLinks?: CampaignUploadLinkType[] | null;
  user?: UserInputType | null;
  userId?: number | null;
  campaign?: CampaignInputType | null;
  campaignId?: number | null;
  manuscriptFee?: number | null;
  proposal?: string | null;
  consent?: string | null;
  guide?: string | null;
  plan?: string | null;
  isFileTaxes?: boolean | null;
}

export interface CampaignUploadLinkType {
  uploadDate: any;
  uploadLink: string;
  campaignParticipation: CampaignParticipationInput;
}

export interface CreateAdminSuperInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  campaignsToManagement?: CampaignInputType[] | null;
  campaignsSold?: CampaignInputType[] | null;
  email?: string | null;
  nickname?: string | null;
  profilePicture?: string | null;
  socialId?: string | null;
  socialChatId?: string | null;
  socialAccessToken?: string | null;
  socialRefreshToken?: string | null;
  role?: AdminRole | null;
  refreshToken?: string | null;
  questionsInCharge?: questionInputType[] | null;
  paymentsInCharge?: paymentInputType[] | null;
}

export interface CreateCampaignInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  tags?: string | null;
  salesDate?: any | null;
  targetDate?: any | null;
  partner?: UserInputType | null;
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
  campaignParticipations?: CampaignParticipationInput[] | null;
  campaignManagers?: AdminInputType[] | null;
  salesManager?: AdminInputType | null;
  brandName_partner?: string | null;
}

export interface CreateCampaignParticipationInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  CampaignUploadLinks?: CampaignUploadLinkType[] | null;
  user?: UserInputType | null;
  userId?: number | null;
  campaign?: CampaignInputType | null;
  campaignId?: number | null;
  manuscriptFee?: number | null;
  proposal?: string | null;
  consent?: string | null;
  guide?: string | null;
  plan?: string | null;
  isFileTaxes?: boolean | null;
  creatorNameId?: string | null;
  brandName_partner?: string | null;
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

export interface CreatePaymentForAdminInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  tags?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  user?: UserInputType | null;
  salesPerson?: AdminInputType | null;
  carts?: cartInputType[] | null;
  paymentMethod?: string | null;
  paymentKey?: string | null;
  orderId?: string | null;
  amount?: number | null;
  paymentState?: string | null;
  itemInfo?: ItemIdAndAmount[] | null;
  brandName_partner?: string | null;
  salesPerson_nickname?: string | null;
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
  mention?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: number | null;
  productLink?: string | null;
  uniqueness?: string | null;
  isAgency?: boolean | null;
  user?: UserInputType | null;
  product?: string | null;
  serviceInquired?: string | null;
  isAnalyzed?: boolean | null;
  questionManagements?: questionManagementInputType[] | null;
  paymentDueDate?: any | null;
  contactPerson?: AdminInputType | null;
  brandName_partner?: string | null;
  contactPerson_nickname?: string | null;
}

export interface CreateQuestionInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  tags?: string | null;
  mention?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: number | null;
  productLink?: string | null;
  uniqueness?: string | null;
  isAgency?: boolean | null;
  user?: UserInputType | null;
  product?: string | null;
  serviceInquired?: string | null;
  isAnalyzed?: boolean | null;
  questionManagements?: questionManagementInputType[] | null;
  paymentDueDate?: any | null;
  contactPerson?: AdminInputType | null;
}

export interface CreateQuestionManagementInput {
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  mention?: string | null;
  stateDate?: any | null;
  stateName?: string | null;
  state?: string | null;
  stateTime?: string | null;
  note?: string | null;
  comment?: string | null;
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
  campaigns?: CampaignInputType[] | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  payments?: paymentInputType[] | null;
  questions?: questionInputType[] | null;
  mediaTypes?: string[] | null;
  naverBlogerId?: string | null;
  naverAverageNumberOfVisitors?: string | null;
  naverTotalNumberOfVisitors?: string | null;
  naverNumberOfBuddys?: string | null;
  instaNumberOfFollowers?: string | null;
}

export interface DeleteAdminInput {
  ids: number[];
}

export interface DeleteCampaignInput {
  ids: number[];
}

export interface DeleteCampaignParticipationInput {
  ids: number[];
}

export interface DeleteItemInput {
  ids: number[];
}

export interface DeletePaymentInput {
  ids: number[];
}

export interface DeleteQuestionInput {
  ids: number[];
}

export interface DeleteQuestionManagementInput {
  ids: number[];
}

export interface DeleteUserInput {
  ids: number[];
}

export interface EditAdminInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  campaignsToManagement?: CampaignInputType[] | null;
  campaignsSold?: CampaignInputType[] | null;
  email?: string | null;
  nickname?: string | null;
  profilePicture?: string | null;
  socialId?: string | null;
  socialChatId?: string | null;
  socialAccessToken?: string | null;
  socialRefreshToken?: string | null;
  role?: AdminRole | null;
  refreshToken?: string | null;
  questionsInCharge?: questionInputType[] | null;
  paymentsInCharge?: paymentInputType[] | null;
  id: number;
}

export interface EditCampaignInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  tags?: string | null;
  salesDate?: any | null;
  targetDate?: any | null;
  partner?: UserInputType | null;
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
  campaignParticipations?: CampaignParticipationInput[] | null;
  campaignManagers?: AdminInputType[] | null;
  salesManager?: AdminInputType | null;
  id: number;
  brandName_partner?: string | null;
}

export interface EditCampaignParticipationInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  CampaignUploadLinks?: CampaignUploadLinkType[] | null;
  user?: UserInputType | null;
  userId?: number | null;
  campaign?: CampaignInputType | null;
  campaignId?: number | null;
  manuscriptFee?: number | null;
  proposal?: string | null;
  consent?: string | null;
  guide?: string | null;
  plan?: string | null;
  isFileTaxes?: boolean | null;
  id: number;
  creatorNameId?: string | null;
  brandName_partner?: string | null;
}

export interface EditItemInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  itemCategory1?: string | null;
  itemName?: string | null;
  detailInfo?: string[] | null;
  price?: number | null;
  discountRate?: number | null;
  type?: string | null;
  carts?: cartInputType[] | null;
  id: number;
}

export interface EditMeForAdminInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  campaignsToManagement?: CampaignInputType[] | null;
  campaignsSold?: CampaignInputType[] | null;
  nickname?: string | null;
  profilePicture?: string | null;
  socialId?: string | null;
  socialChatId?: string | null;
  socialAccessToken?: string | null;
  socialRefreshToken?: string | null;
  role?: AdminRole | null;
  refreshToken?: string | null;
  questionsInCharge?: questionInputType[] | null;
  paymentsInCharge?: paymentInputType[] | null;
}

export interface EditPaymentFormDataInput {
  id: number;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
}

export interface EditPaymentInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  tags?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  user?: UserInputType | null;
  salesPerson?: AdminInputType | null;
  carts?: cartInputType[] | null;
  paymentMethod?: string | null;
  paymentKey?: string | null;
  orderId?: string | null;
  amount?: number | null;
  paymentState?: string | null;
  id: number;
  itemInfo?: ItemIdAndAmount[] | null;
  brandName_partner?: string | null;
  salesPerson_nickname?: string | null;
}

export interface EditQuestionInput {
  id: number;
  createdAt?: any | null;
  updatedAt?: any | null;
  tags?: string | null;
  mention?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: number | null;
  productLink?: string | null;
  uniqueness?: string | null;
  isAgency?: boolean | null;
  user?: UserInputType | null;
  product?: string | null;
  serviceInquired?: string | null;
  isAnalyzed?: boolean | null;
  questionManagements?: questionManagementInputType[] | null;
  paymentDueDate?: any | null;
  contactPerson?: AdminInputType | null;
  brandName_partner?: string | null;
  contactPerson_nickname?: string | null;
}

export interface EditQuestionManagementInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  mention?: string | null;
  stateDate?: any | null;
  stateName?: string | null;
  state?: string | null;
  stateTime?: string | null;
  note?: string | null;
  comment?: string | null;
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
  campaigns?: CampaignInputType[] | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  payments?: paymentInputType[] | null;
  questions?: questionInputType[] | null;
  mediaTypes?: string[] | null;
  naverBlogerId?: string | null;
  naverAverageNumberOfVisitors?: string | null;
  naverTotalNumberOfVisitors?: string | null;
  naverNumberOfBuddys?: string | null;
  instaNumberOfFollowers?: string | null;
  id: number;
}

export interface FindAllCampaignParticipationsInput {
  fromDate: any;
  toDate: any;
}

export interface FindAllQuestionManagementInput {
  fromDate: any;
  toDate: any;
}

export interface FindCampaignsInput {
  fromDate: any;
  toDate: any;
}

export interface FindIdQuestionManagementInput {
  fromDate: any;
  toDate: any;
  QuestionId: number;
}

export interface FindOneQuestionInput {
  id: number;
}

export interface FindPaymentInput {
  id: number;
}

export interface FindPaymentsInput {
  fromDate: any;
  toDate: any;
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
  email?: string | null;
}

export interface RenewalAdminAccessTokenInput {
  refreshToken?: string | null;
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
  campaigns?: CampaignInputType[] | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  payments?: paymentInputType[] | null;
  questions?: questionInputType[] | null;
  mediaTypes?: string[] | null;
  naverBlogerId?: string | null;
  naverAverageNumberOfVisitors?: string | null;
  naverTotalNumberOfVisitors?: string | null;
  naverNumberOfBuddys?: string | null;
  instaNumberOfFollowers?: string | null;
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
  salesPerson?: AdminInputType | null;
  carts?: cartInputType[] | null;
  paymentMethod?: string | null;
  paymentKey?: string | null;
  orderId?: string | null;
  amount?: number | null;
  paymentState?: string | null;
}

export interface questionInputType {
  tags?: string | null;
  mention?: string | null;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: number | null;
  productLink?: string | null;
  uniqueness?: string | null;
  isAgency?: boolean | null;
  user?: UserInputType | null;
  product?: string | null;
  serviceInquired?: string | null;
  isAnalyzed?: boolean | null;
  questionManagements?: questionManagementInputType[] | null;
  paymentDueDate?: any | null;
  contactPerson?: AdminInputType | null;
}

export interface questionManagementInputType {
  mention?: string | null;
  stateDate?: any | null;
  stateName?: string | null;
  state?: string | null;
  stateTime?: string | null;
  note?: string | null;
  comment?: string | null;
  question?: questionInputType | null;
  questionId?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
