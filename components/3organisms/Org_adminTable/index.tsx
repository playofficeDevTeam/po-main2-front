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
import Modal_adminCreate, {
  isModal_adminCreateOpenAtom,
} from "./Modal_adminCreate";
import { throttle } from "throttle-debounce";
import Modal_adminEdit, { isModal_adminEditOpenAtom } from "./Modal_adminEdit";
import { useRecoilState } from "recoil";
import {
  rawTableFromDate,
  rawTableToDate,
  tableFromDate,
  tableToDate,
} from "./Var_tableInputDate";
import { dateToInput } from "./fn_dateToInput";
import dayjs from "dayjs";
import { dateTime } from "./fn_DateTime";
import { FIND_ME_FOR_ADMIN } from "../../4templates/admin_pgs/Admin/Gql_admin";
import { findMeforAdmin } from "../../4templates/admin_pgs/Admin/__generated__/findMeforAdmin";
import { useTokenCheck } from "../../hooks/useTokenCheck";
import { useQuery } from "@apollo/client";
import { nickNameAtom } from "../Org_header/Org_adminSidebar";

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
      placeholder={`검색 필터`}
      className="border rounded-sm w-full text-base px-1"
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

function Table({ columns, data, customOptions }) {
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

  const tokenCheck = useTokenCheck();

  const [nickName, setNickName] = useRecoilState(nickNameAtom);

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
                      <div className="">{cell.render("Cell")}</div>

                      {/* 수정버튼 */}
                      {![
                        "selection",
                        "id",
                        "createdAt",
                        ...(customOptions.removeEditBtn ?? []),
                      ].includes(cell.column.id) && (
                        <div
                          className="hidden group-hover:block"
                          onClick={() => {
                            const cellValues = cell.row.allCells.map(
                              (val, idx) => ({
                                Header: val.column.Header ?? "",
                                accessor: val.column.id ?? "",
                                value: val.value ?? "",
                              })
                            );
                            const filteredCellValues = cellValues.filter(
                              (e) => !["selection"].includes(e.accessor)
                            );
                            customOptions.setEditRecoil(filteredCellValues);
                            customOptions.setEditReset(
                              filteredCellValues.reduce(
                                (pre, cur) => ({
                                  ...pre,
                                  [cur.accessor]: cur.value,
                                }),
                                {}
                              )
                            );

                            setisModalOpen_edit(true);
                            setTimeout(() => {
                              customOptions.setEditFocus(cell.column.id);
                            }, 100);
                          }}
                        >
                          <div className="ml-1">
                            <i className="fas fa-pen cursor-pointer  text-gray-400 hover:text-gray-900  text-xs flex pb-1"></i>
                          </div>
                        </div>
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

  useEffect(() => {
    const handler = (e) => {
      try {
        if (e.shiftKey) {
          //시프트 c 누를때 생성
          if (customOptions.createForm) {
            if ([67].includes(e.keyCode)) {
              setisModalOpen_create(true);
              setTimeout(() => {
                customOptions.setCreateFocus();
              }, 100);
            }
          }
          //시프트 s/d누를때 닉네임/데이트 생성
          if ([83, 68].includes(e.keyCode)) {
            let newContent;

            if ([83].includes(e.keyCode)) {
              newContent = nickName;
            } else if ([68].includes(e.keyCode)) {
              const date = new Date();
              const prettyDate = dateTime(date);
              newContent = nickName + " " + prettyDate;
            }
            const focusedElement: any = document.activeElement;
            const getValue_create = customOptions.getValues_create(
              focusedElement.name
            );
            setTimeout(() => {
              customOptions.setCreateReset({
                [focusedElement.name]: getValue_create + newContent,
              });
            }, 0);
            const getValue_edit = customOptions.getValues_edit(
              focusedElement.name
            );
            setTimeout(() => {
              customOptions.setEditReset({
                [focusedElement.name]: getValue_edit + newContent,
              });
            }, 0);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [nickName]);

  return (
    <>
      {/* 메뉴 */}
      <div className="flex py-2">
        {/* 생성 */}
        {customOptions.createForm ? (
          <>
            <div className="mr-3 cursor-pointer">
              <Modal_adminCreate
                data={{
                  button: (
                    <>
                      <div
                        className="center w-20 h-8 bg-orange-400 rounded-md text-white hover:bg-orange-500"
                        onClick={() => {
                          setTimeout(() => {
                            customOptions.setCreateFocus();
                          }, 100);
                        }}
                      >
                        <i className="fas fa-plus mr-2 text-sm"></i> 생성
                      </div>
                    </>
                  ),
                  modal: customOptions.createForm,
                }}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {/* 수정모달 */}
        <div className="">
          <Modal_adminEdit
            data={{ button: <></>, modal: customOptions.editForm }}
          />
        </div>

        {/* 열선택 */}
        <div className="mr-3">
          <div
            className="center w-20 h-8 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300 cursor-pointer"
            onClick={() => {
              setColumnPopupState((state) => !state);
            }}
          >
            <i className="fas fa-columns mr-2"></i>
            <span className="mr-2">열</span>
            {columnPopupState ? (
              <i className="fas fa-caret-up"></i>
            ) : (
              <i className="fas fa-caret-down"></i>
            )}
          </div>

          {columnPopupState && (
            <div className="h-0 w-0 relative z-50 top-1">
              <div className="w-48 p-3 px-4 bg-white border rounded-md shadow-md">
                <div className="py-1 flex items-center">
                  <ColumnIndeterminateCheckbox
                    {...getToggleHideAllColumnsProps()}
                  />{" "}
                  <span className="ml-2">전체 선택</span>
                </div>
                {allColumns.map(
                  (column) =>
                    !["selection", "id"].includes(column.id) && (
                      <div key={column.id} className="py-1">
                        <label className="flex items-center cursor-pointer">
                          <input
                            className="w-4 h-4 mr-2"
                            type="checkbox"
                            {...column.getToggleHiddenProps()}
                          />{" "}
                          {column.Header}
                        </label>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>

        {/* 삭제 */}
        {selectedFlatRows.length !== 0 && (
          <div
            className="mr-3 cursor-pointer center w-14 h-8 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300 "
            onClick={() => {
              try {
                if (selectedFlatRows.length > 4) {
                  throw "5개 이상의 데이터를 한번에 지울 수 없습니다.";
                }
                const returnValue = confirm("정말로 삭제하시겠습니까?");
                if (returnValue) {
                  selectedFlatRows.forEach((e) =>
                    customOptions.deleteMutation(e.original.id)
                  );
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </div>
        )}

        {/* {새창열기} */}
        {selectedFlatRows.length !== 0 && customOptions.openDetailPage ? (
          <div
            className="mr-3 cursor-pointer center px-3 h-8 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300"
            onClick={() => {
              customOptions.openDetailPage(selectedFlatRows);
              console.log(selectedFlatRows);
            }}
          >
            상세정보 열기
          </div>
        ) : (
          <></>
        )}

        {/* 타이틀 */}
        <div className="center h-8 px-3 text-gray-900 font-medium">
          {customOptions.title}
        </div>
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
              {!customOptions.noDate && (
                <div className="ml-2 flex  px-4">
                  <div className="h-full center mr-2">기한: </div>
                  <input
                    className="border rounded-sm pl-1"
                    type="date"
                    value={dateToInput(rawTableFromDateState)}
                    onChange={(e) => {
                      setRawTableFromDateState((state) =>
                        dayjs(e.target.value)
                      );
                    }}
                  />
                  <div className="mx-2">~</div>
                  <input
                    className="border rounded-sm pl-1"
                    type="date"
                    value={dateToInput(rawTableToDateState)}
                    onChange={(e) => {
                      setRawTableToDateState((state) => dayjs(e.target.value));
                    }}
                  />
                  <div
                    className=""
                    onClick={() => {
                      try {
                        if (
                          dayjs(rawTableFromDateState).get("date") &&
                          dayjs(rawTableToDateState).get("date")
                        ) {
                          setTableFromDateState(rawTableFromDateState);
                          setTableToDateState(rawTableToDateState);
                          customOptions.refetch();
                        } else {
                          throw "날짜를 입력해주세요";
                        }
                      } catch (error) {
                        alert(error);
                      }
                    }}
                  >
                    <div className="ml-2 bg-orange-400 hover:bg-orange-500 h-full center text-white text-sm px-2 rounded-md cursor-pointer">
                      업데이트
                    </div>
                  </div>
                </div>
              )}
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

function App({ columns, data, customOptions }) {
  return (
    <div className="bg-gray-50 w-full  overflow-x-scroll middle-scroll ">
      <TableStyles>
        <Table columns={columns} data={data} customOptions={customOptions} />
      </TableStyles>
    </div>
  );
}

export default App;
