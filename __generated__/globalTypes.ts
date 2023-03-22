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
  refreshTokens?: AdminRefreshTokenInputType[] | null;
  questionsInCharge?: questionInputType[] | null;
  paymentsInCharge?: paymentInputType[] | null;
}

export interface AdminRefreshTokenInputType {
  admin?: AdminInputType | null;
  adminId: number;
  refreshToken?: string | null;
  userAgent?: string | null;
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

export interface ConversionApiInput {
  event_name: string;
  event_id?: string | null;
  user_data_email?: string[] | null;
  user_data_phone?: string[] | null;
  user_data_first_name?: string | null;
  user_data_last_name?: string | null;
  user_data_ip?: string | null;
  user_data_user_agent?: string | null;
  user_data_fbc?: string | null;
  user_data_fbp?: string | null;
  custom_data_content_category?: string | null;
  custom_data_content_name?: string | null;
  custom_data_value?: number | null;
  custom_data_order_id?: string | null;
  custom_data_num_items?: number | null;
  contents_id?: string | null;
  contents_quantity?: number | null;
  contents_item_price?: number | null;
  contents_delivery_category?: string | null;
  event_source_url?: string | null;
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
  refreshTokens?: AdminRefreshTokenInputType[] | null;
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
  paymentDate?: any | null;
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
  channelTalkId?: string | null;
  clientIpAddress?: string | null;
  clientUserAgent?: string | null;
  clientUserFbp?: string | null;
  clientUserFbc?: string | null;
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
  clientUserFbp?: string | null;
  clientUserFbc?: string | null;
  itemInfo?: ItemIdAndAmount[] | null;
  memberId?: string | null;
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
  budget?: string | null;
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
  memberId?: string | null;
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
  budget?: string | null;
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
  memberId?: string | null;
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
  role?: UserRole | null;
  refreshTokens?: UserRefreshTokenInputType[] | null;
  email?: string | null;
  additionalEmail?: string | null;
  password?: string | null;
  name?: string | null;
  nameId?: string | null;
  phoneNumber?: string | null;
  tags?: string | null;
  brandName?: string | null;
  questions?: questionInputType[] | null;
  payments?: paymentInputType[] | null;
  campaigns?: CampaignInputType[] | null;
  brand_item?: string | null;
  brand_category?: string | null;
  brand_option?: string | null;
  brand_region?: string | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  residentRegistrationNumber?: string | null;
  gender?: string | null;
  job?: string | null;
  address?: string | null;
  bank?: string | null;
  accountNumber?: string | null;
  creditPoint?: number | null;
  economyPoint?: number | null;
  isJoinedInPlusBuddy?: boolean | null;
  insta_isInstaUser?: boolean | null;
  naver_isNaverUser?: boolean | null;
  naverIn_isNaverInfluencer?: boolean | null;
  youtube_isYoutubeUser?: boolean | null;
  insta_isExisted?: boolean | null;
  insta_id?: string | null;
  insta_NumberOfFollowers?: number | null;
  insta_canMakeVideo?: boolean | null;
  insta_category1?: string | null;
  insta_category2?: string | null;
  insta_style?: string | null;
  insta_professionalPoint?: number | null;
  insta_heathyPoint?: number | null;
  insta_qualitativePoint?: number | null;
  insta_designatedPrice?: number | null;
  insta_numberOfProposals?: number | null;
  insta_participationRate?: number | null;
  naver_isExisted?: boolean | null;
  naver_id?: string | null;
  naver_averageNumberOfVisitors?: number | null;
  naver_totalNumberOfVisitors?: number | null;
  naver_numberOfBuddys?: number | null;
  naver_category1?: string | null;
  naver_category2?: string | null;
  naver_heathyPoint?: number | null;
  naver_qualitativePoint?: number | null;
  naver_numberOfProposals?: number | null;
  naver_participationRate?: number | null;
  naverIn_isExisted?: boolean | null;
  naverIn_id?: string | null;
  naverIn_numberOfFans?: number | null;
  naverIn_category1?: string | null;
  naverIn_category2?: string | null;
  naverIn_numberOfProposals?: number | null;
  naverIn_participationRate?: number | null;
  youtube_id?: string | null;
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
  refreshTokens?: AdminRefreshTokenInputType[] | null;
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
  refreshTokens?: AdminRefreshTokenInputType[] | null;
  questionsInCharge?: questionInputType[] | null;
  paymentsInCharge?: paymentInputType[] | null;
}

export interface EditPaymentFormDataInput {
  id: number;
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  memberId?: string | null;
}

export interface EditPaymentInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  paymentDate?: any | null;
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
  channelTalkId?: string | null;
  clientIpAddress?: string | null;
  clientUserAgent?: string | null;
  clientUserFbp?: string | null;
  clientUserFbc?: string | null;
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
  budget?: string | null;
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
  memberId?: string | null;
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
  role?: UserRole | null;
  refreshTokens?: UserRefreshTokenInputType[] | null;
  email?: string | null;
  additionalEmail?: string | null;
  password?: string | null;
  name?: string | null;
  nameId?: string | null;
  phoneNumber?: string | null;
  tags?: string | null;
  brandName?: string | null;
  questions?: questionInputType[] | null;
  payments?: paymentInputType[] | null;
  campaigns?: CampaignInputType[] | null;
  brand_item?: string | null;
  brand_category?: string | null;
  brand_option?: string | null;
  brand_region?: string | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  residentRegistrationNumber?: string | null;
  gender?: string | null;
  job?: string | null;
  address?: string | null;
  bank?: string | null;
  accountNumber?: string | null;
  creditPoint?: number | null;
  economyPoint?: number | null;
  isJoinedInPlusBuddy?: boolean | null;
  insta_isInstaUser?: boolean | null;
  naver_isNaverUser?: boolean | null;
  naverIn_isNaverInfluencer?: boolean | null;
  youtube_isYoutubeUser?: boolean | null;
  insta_isExisted?: boolean | null;
  insta_id?: string | null;
  insta_NumberOfFollowers?: number | null;
  insta_canMakeVideo?: boolean | null;
  insta_category1?: string | null;
  insta_category2?: string | null;
  insta_style?: string | null;
  insta_professionalPoint?: number | null;
  insta_heathyPoint?: number | null;
  insta_qualitativePoint?: number | null;
  insta_designatedPrice?: number | null;
  insta_numberOfProposals?: number | null;
  insta_participationRate?: number | null;
  naver_isExisted?: boolean | null;
  naver_id?: string | null;
  naver_averageNumberOfVisitors?: number | null;
  naver_totalNumberOfVisitors?: number | null;
  naver_numberOfBuddys?: number | null;
  naver_category1?: string | null;
  naver_category2?: string | null;
  naver_heathyPoint?: number | null;
  naver_qualitativePoint?: number | null;
  naver_numberOfProposals?: number | null;
  naver_participationRate?: number | null;
  naverIn_isExisted?: boolean | null;
  naverIn_id?: string | null;
  naverIn_numberOfFans?: number | null;
  naverIn_category1?: string | null;
  naverIn_category2?: string | null;
  naverIn_numberOfProposals?: number | null;
  naverIn_participationRate?: number | null;
  youtube_id?: string | null;
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

export interface GtmSubInput {
  channelTalkMemberId: string;
}

export interface ItemIdAndAmount {
  itemId?: number | null;
  amountOfItem?: number | null;
}

export interface LoginUserInput {
  email?: string | null;
  password?: string | null;
  userAgent?: string | null;
}

export interface RenewalAccessTokenInput {
  refreshToken?: string | null;
}

export interface RenewalAdminAccessTokenInput {
  refreshToken?: string | null;
}

export interface UserInputType {
  role: UserRole;
  refreshTokens?: UserRefreshTokenInputType[] | null;
  email?: string | null;
  additionalEmail?: string | null;
  password?: string | null;
  name?: string | null;
  nameId?: string | null;
  phoneNumber?: string | null;
  tags?: string | null;
  brandName?: string | null;
  questions?: questionInputType[] | null;
  payments?: paymentInputType[] | null;
  campaigns?: CampaignInputType[] | null;
  brand_item?: string | null;
  brand_category?: string | null;
  brand_option?: string | null;
  brand_region?: string | null;
  campaignParticipations?: CampaignParticipationInput[] | null;
  residentRegistrationNumber?: string | null;
  gender?: string | null;
  job?: string | null;
  address?: string | null;
  bank?: string | null;
  accountNumber?: string | null;
  creditPoint?: number | null;
  economyPoint?: number | null;
  isJoinedInPlusBuddy?: boolean | null;
  insta_isInstaUser?: boolean | null;
  naver_isNaverUser?: boolean | null;
  naverIn_isNaverInfluencer?: boolean | null;
  youtube_isYoutubeUser?: boolean | null;
  insta_isExisted?: boolean | null;
  insta_id?: string | null;
  insta_NumberOfFollowers?: number | null;
  insta_canMakeVideo?: boolean | null;
  insta_category1?: string | null;
  insta_category2?: string | null;
  insta_style?: string | null;
  insta_professionalPoint?: number | null;
  insta_heathyPoint?: number | null;
  insta_qualitativePoint?: number | null;
  insta_designatedPrice?: number | null;
  insta_numberOfProposals?: number | null;
  insta_participationRate?: number | null;
  naver_isExisted?: boolean | null;
  naver_id?: string | null;
  naver_averageNumberOfVisitors?: number | null;
  naver_totalNumberOfVisitors?: number | null;
  naver_numberOfBuddys?: number | null;
  naver_category1?: string | null;
  naver_category2?: string | null;
  naver_heathyPoint?: number | null;
  naver_qualitativePoint?: number | null;
  naver_numberOfProposals?: number | null;
  naver_participationRate?: number | null;
  naverIn_isExisted?: boolean | null;
  naverIn_id?: string | null;
  naverIn_numberOfFans?: number | null;
  naverIn_category1?: string | null;
  naverIn_category2?: string | null;
  naverIn_numberOfProposals?: number | null;
  naverIn_participationRate?: number | null;
  youtube_id?: string | null;
}

export interface UserRefreshTokenInputType {
  user?: UserInputType | null;
  userId: number;
  refreshToken?: string | null;
  userAgent?: string | null;
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
  paymentDate?: any | null;
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
  channelTalkId?: string | null;
  clientIpAddress?: string | null;
  clientUserAgent?: string | null;
  clientUserFbp?: string | null;
  clientUserFbc?: string | null;
}

export interface questionInputType {
  tags?: string | null;
  mention?: string | null;
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
