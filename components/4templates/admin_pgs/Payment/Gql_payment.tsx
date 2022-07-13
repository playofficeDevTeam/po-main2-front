import { gql } from "@apollo/client";

export const FIND_PAYMENTS = gql`
  query findPayments($input: FindPaymentsInput!) {
    findPayments(input: $input) {
      ok
      error
      payments {
        id
        createdAt
        tags
        brandName
        name
        phoneNumber
        email
        paymentMethod
        amount
        paymentState
        user {
          nameId
        }
        salesPerson {
          nickname
        }
      }
    }
  }
`;

export const CREATE_PAYMENT_FOR_ADMIN = gql`
  mutation createPaymentForAdmin($input: CreatePaymentForAdminInput!) {
    createPaymentForAdmin(input: $input) {
      ok
      error
      createdAt
    }
  }
`;

export const EDIT_PAYMENT = gql`
  mutation editPayment($input: EditPaymentInput!) {
    editPayment(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_PAYMENT = gql`
  mutation deletePayment($input: DeletePaymentInput!) {
    deletePayment(input: $input) {
      ok
      error
    }
  }
`;
