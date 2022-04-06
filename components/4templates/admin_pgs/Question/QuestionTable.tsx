import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  findQuestionsForAdmin,
  findQuestionsForAdminVariables,
} from "./__generated__/findQuestionsForAdmin";
import styled from "styled-components";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";

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

export const TableStyles = styled.div`
  padding: 1rem;
  width: 100vw;
  overflow-x: scroll;

  table {
    border-spacing: 0;
    border: 1px solid #c2410c;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      text-align: start;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #c2410c;
      border-right: 1px solid #c2410c;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="flex">
      <div className="w-11">검색: </div>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={``}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
        className="w-full"
      />
    </div>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`검색 필터`}
      className="border rounded-sm w-full"
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="border rounded-sm"
    >
      <option value="">All</option>
      {options.map((option: any, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Table({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <div {...column.getSortByToggleProps()} className="mb-1">
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="fas fa-caret-down ml-2"></i>
                      ) : (
                        <i className="fas fa-caret-up ml-2"></i>
                      )
                    ) : (
                      <i className="fas fa-sort ml-2"></i>
                    )}
                  </span>
                </div>
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}

        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: "left",
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
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
      { Header: "budget", accessor: "budget", Filter: SelectColumnFilter },
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
      <TableStyles>
        <Table
          columns={columns}
          data={questionsData?.map((val, idx) => ({
            ...val,
          }))}
        />
      </TableStyles>
    </>
  );
}
