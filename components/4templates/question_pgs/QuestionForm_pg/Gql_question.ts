import { gql } from "@apollo/client";

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_QUESTION = gql`
  mutation EditQuestion($input: EditQuestionInput!) {
    editQuestion(input: $input) {
      ok
      error
    }
  }
`;
