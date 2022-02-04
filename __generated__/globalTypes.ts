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
  itemId: number;
  paymentKey: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
}

export interface FindPaymentInput {
  paymentId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
