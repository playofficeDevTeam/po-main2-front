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

export interface EditPaymentFormDataInput {
  id: number;
  brandName: string;
  name: string;
  phoneNumber: string;
  email: string;
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
