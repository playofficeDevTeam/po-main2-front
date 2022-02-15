/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreatePaymentInput {
  brandName: string;
  name: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
  orderId: string;
  amount: number;
  paymentKey?: string | null;
  itemInfo: ItemIdAndAmount[];
}

export interface CreateQuestionInput {
  brandName: string;
  name: string;
  phoneNumber: string;
  email: string;
  budget: string;
  productLink: string;
  uniqueness?: string | null;
  isAgency: boolean;
}

export interface EditPaymentFormDataInput {
  id: number;
  brandName: string;
  name: string;
  phoneNumber: string;
  email: string;
}

export interface EditQuestionInput {
  brandName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: string | null;
  productLink?: string | null;
  uniqueness?: string | null;
  isAgency?: boolean | null;
  id: number;
}

export interface FindPaymentInput {
  paymentId: number;
}

export interface ItemIdAndAmount {
  itemId: number;
  amountOfItem: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
