import { gql } from "@apollo/client";

export const FIND_ID_QUESTION_MANAGEMENT = gql`
  query findIdQuestionManagement($input: FindIdQuestionManagementInput!) {
    findIdQuestionManagement(input: $input) {
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

export const FIND_ONE_QUESTION = gql`
  query findOneQuestion($input: FindOneQuestionInput!) {
    findOneQuestion(input: $input) {
      ok
      error
      question {
        id
        brandName
      }
    }
  }
`;
