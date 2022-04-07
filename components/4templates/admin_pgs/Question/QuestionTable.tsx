import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  findQuestionsForAdmin,
  findQuestionsForAdminVariables,
} from "./__generated__/findQuestionsForAdmin";
import Org_adminTable, {
  SelectColumnFilter,
} from "../../../3organisms/Org_adminTable";

export const FIND_QUESTIONS_FOR_ADMIN = gql`
  query findQuestionsForAdmin($input: FindQuestionsInput!) {
    findQuestionsForAdmin(input: $input) {
      ok
      error
      questions {
        brandName
        tags
        name
        phoneNumber
        email
        budget
        productLink
        uniqueness
        isAgency
      }
    }
  }
`;

let fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 10);
let toDate = new Date();
export default function App() {
  const columns = useMemo(
    () => [
      { Header: "브랜드명", accessor: "brandName", columnWidth: "10" },
      { Header: "이름", accessor: "name", columnWidth: "6" },
      { Header: "연락처", accessor: "phoneNumber", columnWidth: "10" },
      { Header: "이메일", accessor: "email", columnWidth: "10" },
      {
        Header: "예산",
        accessor: "budget",
        columnWidth: "10",
        Filter: SelectColumnFilter,
      },
      { Header: "제품 링크", accessor: "productLink", columnWidth: "10" },
      { Header: "특이사항", accessor: "uniqueness", columnWidth: "10" },
      {
        Header: "대행사",
        accessor: "isAgency",
        columnWidth: "5",
        Filter: SelectColumnFilter,
      },
      { Header: "태그", accessor: "tags", columnWidth: "10" },
    ],
    []
  );

  const { loading, error, data, refetch } = useQuery<
    findQuestionsForAdmin,
    findQuestionsForAdminVariables
  >(FIND_QUESTIONS_FOR_ADMIN, {
    variables: {
      input: {
        fromDate,
        toDate,
      },
    },
  });

  const tokenCheck = useTokenCheck();
  useEffect(() => {
    tokenCheck(refetch);
  }, [loading]);

  const questionsData = useMemo(
    () => data?.findQuestionsForAdmin.questions,
    [loading]
  );

  if (error) {
    return <>권한이 없습니다.</>;
  }
  if (loading) {
    return <>로딩중</>;
  }
  return (
    <>
      <Org_adminTable columns={columns} data={questionsData} />
    </>
  );
}
