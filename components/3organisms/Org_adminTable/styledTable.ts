import styled from "styled-components";

export const FormStyle = styled.div`
  & ul {
    & li {
      display: flex;
      align-items: center;
      & div:nth-child(1) {
        width: 10rem;
        display: flex;
        padding-left: 0.25rem;
      }
      & input:nth-child(2) {
        border-width: 1px;
        width: 24rem;
        padding: 0.25rem;
        margin: 0.25rem;
      }
    }
  }
`;
