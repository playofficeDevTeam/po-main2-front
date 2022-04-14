import {
  forwardRef,
  memo,
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
  initialState,
  useRowSelect,
} from "react-table";
import { FixedSizeList } from "react-window";
import Modal_adminCreate from "./Modal_adminCreate";
import { throttle } from "throttle-debounce";
import Modal_adminEdit, { isModal_adminEditOpenAtom } from "./Modal_adminEdit";
import { useRecoilState } from "recoil";

export const TableStyles = styled.div`
  width: max-content;
  margin: 0 1rem;
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
    <div className="flex items-center">
      <div className="w-max mr-2">전체 검색: </div>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={``}
        className="border rounded-sm"
        style={{
          width: "50rem",
          fontSize: "1.1rem",
        }}
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

export function SelectColumnFilter({
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

const IndeterminateCheckbox = forwardRef(
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

function Table({
  columns,
  data,
  cellHoverOption,
  setEditForm,
  deleteMutation,
  editForm,
  createForm,
}) {
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      width: 150,
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const scrollbarWidth = () => {
    // thanks too https://davidwalsh.name/detect-scrollbar-width
    const scrollDiv = document.createElement("div");
    scrollDiv.setAttribute(
      "style",
      "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;"
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
        // Let's make a column for selection
        {
          id: "selection",
          width: 40,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
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

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell, idx) => {
            return (
              <div {...cell.getCellProps()} className="td group" key={idx}>
                <div
                  className={` ${
                    !["selection"].includes(cell.column.id)
                      ? "flex items-center h-full"
                      : "center h-full"
                  }`}
                >
                  <div className="">{cell.render("Cell")}</div>
                  <div
                    className="hidden group-hover:block"
                    onClick={() => {
                      const cellValues = cell.row.allCells.map((val, idx) => ({
                        Header: val.column.Header,
                        accessor: val.column.id,
                        value: val.value,
                      }));
                      const filteredCellValues = cellValues.filter(
                        (e) => !["selection"].includes(e.accessor)
                      );
                      setEditForm(filteredCellValues);
                      console.log(cell);
                    }}
                  >
                    {!["selection", "id"].includes(cell.column.id) &&
                      cellHoverOption}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows, selectedFlatRows]
  );

  const [windowHeightState, setWindowHeightState] = useState(
    window.innerHeight - 300
  );

  const heightCheck = () => {
    setWindowHeightState(window.innerHeight - 300);
  };
  const throttleheightCheck = throttle(150, heightCheck);
  useEffect(() => {
    window.addEventListener("resize", throttleheightCheck);
    return () => window.removeEventListener("resize", throttleheightCheck);
  }, [throttleheightCheck]);

  return (
    <>
      {/* 메뉴 */}
      <div className="flex p-2">
        <div className="mr-2">
          <Modal_adminCreate data={{ button: <>생성</>, modal: createForm }} />
        </div>
        <div className="">
          <Modal_adminEdit data={{ button: <></>, modal: editForm }} />
        </div>
        <div
          className=""
          onClick={() => {
            selectedFlatRows.forEach((e) => deleteMutation(e.original.id));
          }}
        >
          삭제{" "}
        </div>
      </div>

      <table {...getTableProps()} className="bg-white">
        <thead>
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
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column, idx) => (
                <th
                  {...column.getHeaderProps()}
                  className={`${!["id"].includes(column.id) ? "" : ""} `}
                  key={idx}
                >
                  <div
                    {...column.getSortByToggleProps()}
                    className={`mb-1 flex cursor-pointer ${
                      !["selection"].includes(column.id) ? "" : "center pt-5"
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
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          <FixedSizeList
            height={windowHeightState}
            itemCount={rows.length}
            itemSize={35}
            width={totalColumnsWidth + scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList>
        </tbody>
      </table>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

function App({
  columns,
  data,
  createForm,
  editForm,
  setEditForm,
  deleteMutation,
}) {
  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );
  return (
    <div className="bg-gray-50 w-full  overflow-x-scroll ">
      <TableStyles>
        <Table
          columns={columns}
          data={data}
          createForm={createForm}
          setEditForm={setEditForm}
          editForm={editForm}
          deleteMutation={deleteMutation}
          cellHoverOption={
            <>
              <div
                className="ml-1"
                onClick={() => {
                  setisModalOpen(true);
                }}
              >
                수정
              </div>
            </>
          }
        />
      </TableStyles>
    </div>
  );
}

export default memo(App);
