import { gql } from "@apollo/client";

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
`;

export const FIND_PAYMENT = gql`
  query FindPayment($input: FindPaymentInput!) {
    findPayment(input: $input) {
      ok
      error
      payment {
        brandName
      }
    }
  }
`;
