import { gql } from "@apollo/client";

export const FIND_ALL_QUESTION_MANAGEMENT = gql`
  query findAllQuestionManagement($input: FindAllQuestionManagementInput!) {
    findAllQuestionManagement(input: $input) {
      ok
      error
      questionManagements {
        id
        createdAt
        stateDate
        stateName
        state
        stateTime
        note
        comment
        question {
          id
          brandName
          product
          serviceInquired
        }
        questionId
      }
    }
  }
`;

export const CREATE_QUESTION_MANAGEMENT = gql`
  mutation createQuestionManagement($input: CreateQuestionManagementInput!) {
    createQuestionManagement(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_QUESTION_MANAGEMENT = gql`
  mutation editQuestionManagement($input: EditQuestionManagementInput!) {
    editQuestionManagement(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_QUESTION_MANAGEMENT = gql`
  mutation deleteQuestionManagement($input: DeleteQuestionManagementInput!) {
    deleteQuestionManagement(input: $input) {
      ok
      error
    }
  }
`;
