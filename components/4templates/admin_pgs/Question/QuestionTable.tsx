import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  findQuestionsForAdmin,
  findQuestionsForAdminVariables,
} from "./__generated__/findQuestionsForAdmin";
import { useTable } from "react-table";

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

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="px-4">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="  ">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

let fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 10);
let toDate = new Date();
export default function App() {
  const columns = useMemo(
    () => [
      { Header: "brandName", accessor: "brandName" },
      { Header: "name", accessor: "name" },
      { Header: "phoneNumber", accessor: "phoneNumber" },
      { Header: "email", accessor: "email" },
      { Header: "budget", accessor: "budget" },
      { Header: "productLink", accessor: "productLink" },
      { Header: "uniqueness", accessor: "uniqueness" },
      { Header: "isAgency", accessor: "isAgency" },
      { Header: "tags", accessor: "tags" },
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
      <div className="">
        <Table columns={columns} data={questionsData} />
      </div>
    </>
  );
}
