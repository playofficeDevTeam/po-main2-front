import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useBlockLayout,
  useRowSelect,
} from "react-table";
import { FixedSizeList } from "react-window";
import { useRecoilState } from "recoil";
import { throttle } from "throttle-debounce";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import { dateList } from "../../../3organisms/Org_adminTable/tableViewTypeList";
import {
  rawTableFromDate,
  rawTableToDate,
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";

export const TableStyles = styled.div`
  width: max-content;
  margin: 0 1rem;
  table {
    border-spacing: 0;
    border: 1px solid #d1d5db;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th {
      text-align: start;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #d1d5db;
      border-right: 1px solid #d1d5db;
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
    <div className="flex items-center">
      <div className="w-max mr-2">전체 검색: </div>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={``}
        className="border rounded-sm px-1"
        style={{
          width: "26rem",
          fontSize: "1.1rem",
        }}
      />
    </div>
  );
}

export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={``}
      className="border rounded-sm w-full text-base px-1"
    />
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="border rounded-sm w-full"
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

const IndeterminateCheckbox = forwardRef<HTMLInputElement>(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef: any = useRef();
    const resolvedRef: any = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          className="w-5 h-5"
          type="checkbox"
          ref={resolvedRef}
          {...rest}
        />
      </>
    );
  }
);
IndeterminateCheckbox.displayName = "IndeterminateCheckbox";

const ColumnIndeterminateCheckbox = forwardRef<HTMLInputElement>(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef: any = useRef();
    const resolvedRef: any = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <input className="w-4 h-4" type="checkbox" ref={resolvedRef} {...rest} />
    );
  }
);
ColumnIndeterminateCheckbox.displayName = "ColumnIndeterminateCheckbox";

function Table({ columns, data, deleteMutation }) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const scrollbarWidth = () => {
    const scrollDiv = document.createElement("div");
    scrollDiv.setAttribute(
      "style",
      "width: 8px; height: 8px; overflow: scroll; position:absolute; top:-9999px;"
    );
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };
  const scrollBarSize = useMemo(() => scrollbarWidth(), []);

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
    totalColumnsWidth,
    selectedFlatRows,
    state: { selectedRowIds },
    getToggleHideAllColumnsProps,
    allColumns,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetGlobalFilter: false,
      autoResetPage: false,
      autoResetExpanded: false,
      autoResetGroupBy: false,
      autoResetSortBy: false,
      autoResetFilters: false,
      autoResetRowState: false,
      initialState: {
        sortBy: useMemo(() => [{ id: "createdAt", desc: true }], []),
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useBlockLayout,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          width: 40,
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div className="center w-full h-full">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const [windowHeightState, setWindowHeightState] = useState(
    window.innerHeight - 200
  );

  const heightCheck = () => {
    setWindowHeightState(window.innerHeight - 200);
  };
  const throttleheightCheck = throttle(150, heightCheck);
  useEffect(() => {
    window.addEventListener("resize", throttleheightCheck);
    return () => window.removeEventListener("resize", throttleheightCheck);
  }, [throttleheightCheck]);

  const [columnPopupState, setColumnPopupState] = useState(false);

  const [rawTableFromDateState, setRawTableFromDateState] =
    useRecoilState(rawTableFromDate);
  const [rawTableToDateState, setRawTableToDateState] =
    useRecoilState(rawTableToDate);

  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  const [isModalOpen_create, setisModalOpen_create] = useRecoilState(
    isModal_adminCreateOpenAtom
  );
  const [isModalOpen_edit, setisModalOpen_edit] = useRecoilState(
    isModal_adminEditOpenAtom
  );

  //테이블 스타일
  //테이블 스타일
  //테이블 스타일
  //테이블 스타일
  //테이블 스타일
  //테이블 스타일
  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className={`tr hover:bg-gray-100 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          } `}
        >
          {row.cells.map((cell, idx) => {
            return (
              <>
                {!["id", "relationId"].includes(cell.column.id) && (
                  <div
                    {...cell.getCellProps()}
                    className={`thin-scroll  td group border-r px-2 border-gray-300  ${
                      !["createdAt"].includes(cell.column.id)
                        ? "overflow-x-auto"
                        : "overflow-x-hidden"
                    }
                       ${
                         selectedFlatRows
                           .map((val) => val.id)
                           .includes(cell.row.id)
                           ? "bg-gray-200"
                           : ""
                       }
                      `}
                    key={idx}
                  >
                    <div
                      className={`w-max  items-center   ${
                        !["selection"].includes(cell.column.id)
                          ? "flex items-center h-full "
                          : "center h-full"
                      }`}
                    >
                      {dateList.includes(cell.column.id) ? (
                        <>
                          <div className="">
                            {cell.value.split(" ")[0].substr(-8)}
                          </div>
                          <div className=" hidden">{cell.render("Cell")}</div>
                        </>
                      ) : (
                        <div className="">{cell.render("Cell")}</div>
                      )}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows, selectedFlatRows]
  );

  return (
    <>
      <div
        className=""
        onClick={() => {
          const selectedIds = selectedFlatRows.map((val) => val.original.id);
          deleteMutation({
            variables: {
              input: {
                ids: selectedIds,
              },
            },
          });
        }}
      >
        삭제
      </div>
      <table {...getTableProps()} className="bg-white">
        <thead>
          <tr>
            <th
              className="flex"
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
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map(
                (column, idx) =>
                  !["id", "relationId"].includes(column.id) && (
                    <th
                      {...column.getHeaderProps()}
                      className={`${!["id"].includes(column.id) ? "" : ""} `}
                      key={idx}
                    >
                      <div
                        {...column.getSortByToggleProps()}
                        className={`mb-1 flex cursor-pointer ${
                          !["selection"].includes(column.id)
                            ? ""
                            : "center pt-5"
                        }`}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <i className="fas fa-caret-down ml-2"></i>
                            ) : (
                              <i className="fas fa-caret-up ml-2"></i>
                            )
                          ) : (
                            <></>
                          )}
                        </span>
                      </div>
                      <div>
                        {column.canFilter && !["selection"].includes(column.id)
                          ? column.render("Filter")
                          : null}
                      </div>
                    </th>
                  )
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="">
          <FixedSizeList
            height={windowHeightState}
            itemCount={rows.length}
            itemSize={40}
            width={totalColumnsWidth + scrollBarSize}
            style={{
              overflowY: "scroll",
            }}
            className="middle-scroll"
          >
            {RenderRow}
          </FixedSizeList>
        </tbody>
      </table>
    </>
  );
}

function App({ columns, data, deleteMutation }) {
  return (
    <div className="bg-gray-50 w-full  overflow-x-scroll middle-scroll ">
      <TableStyles>
        <Table columns={columns} data={data} deleteMutation={deleteMutation} />
      </TableStyles>
    </div>
  );
}

export default App;
