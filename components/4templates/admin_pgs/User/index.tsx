import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ColumnFilter,
  GlobalFilter,
  IndeterminateCheckbox,
} from "../../../3organisms/Org_adminTable/tableOptions";
import { useTokenCheck } from "../../../hooks/useTokenCheck";

import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useBlockLayout,
  useRowSelect,
  useResizeColumns,
} from "react-table";
import { FixedSizeList } from "react-window";

import { throttle } from "throttle-debounce";
import { useRecoilState } from "recoil";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import { dateList } from "../../../3organisms/Org_adminTable/tableViewTypeList";
import TableStyle from "../../../3organisms/Org_adminTable/TableStyle";
import { UserRole } from "../../../../__generated__/globalTypes";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import Atm_UserForm from "./Atm_UserForm";
import { FIND_USERS } from "../Partner/Gql_user";
import {
  findUsers,
  findUsersVariables,
} from "../Partner/__generated__/findUsers";
import {
  userExceptionDataInEditBtn,
  userExceptionDataInTable,
} from "./userControlData";
import { userColumnsDefault, rawUserColumnsData } from "./Var_userColumns";
import { datePrettier } from "../../../3organisms/Org_adminTable/fn_DatePrettier";

export default function App() {
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //토큰체크
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findUsersLoading,
    error: findUsersError,
    data: findUsersData,
    refetch,
  } = useQuery<findUsers, findUsersVariables>(FIND_USERS, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
        userRole: UserRole.Creator,
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findUsersData]);

  //쿼리데이터 가공
  const usersData = useMemo(
    () =>
      findUsersData?.findUsers.users?.map((val, idx) => ({
        ...val,
        createdAt: datePrettier(val.createdAt),
      })),
    [findUsersData]
  );

  //테이블 컬럼 가공
  const columns = useMemo(() => userColumnsDefault, []);

  //테이블 컴포넌트
  function Table({ columns, data }) {
    //디폴트 컬럼옵션
    const defaultColumn = useMemo(
      () => ({
        // Let's set up our default Filter UI
        width: 150,
        Filter: ColumnFilter,
      }),
      []
    );

    //가상 윈도우 스크롤바
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

    //유즈테이블
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
      useResizeColumns,
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

    //윈도우에 따라 테이블 크기 조절
    const [windowHeightState, setWindowHeightState] = useState(
      window.innerHeight - 180
    );
    const heightCheck = () => {
      setWindowHeightState(window.innerHeight - 180);
    };
    const throttleheightCheck = throttle(200, heightCheck);
    useEffect(() => {
      window.addEventListener("resize", throttleheightCheck);
      return () => window.removeEventListener("resize", throttleheightCheck);
    }, [throttleheightCheck]);

    //수정 모달 열기
    const [isModalOpen_edit, setisModalOpen_edit] = useRecoilState(
      isModal_adminEditOpenAtom
    );
    const [rawUserColumns, setRawUserColumns] =
      useRecoilState(rawUserColumnsData);

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
            }`}
          >
            {row.cells.map((cell, idx) => {
              return (
                <>
                  {!userExceptionDataInTable.includes(cell.column.id) && (
                    <div
                      {...cell.getCellProps()}
                      className={`overflow-x-auto thin-scroll  td group border-r px-2 border-gray-300 
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
                            : "h-full mx-auto center"
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

                        {/* 수정버튼 */}
                        {!userExceptionDataInEditBtn.includes(
                          cell.column.id
                        ) && (
                          <div
                            className="hidden group-hover:block"
                            onClick={() => {
                              const cellValues = cell.row?.allCells?.map(
                                (val, idx) => ({
                                  Header: val?.column?.Header,
                                  accessor: val?.column?.id,
                                  value: val?.value || "",
                                  selected: val?.column?.id === cell.column.id,
                                  inputType: val?.column?.inputType,
                                })
                              );
                              const filteredCellValues = cellValues.filter(
                                (e) => !["selection"].includes(e.accessor)
                              );
                              setRawUserColumns(filteredCellValues);
                              setisModalOpen_edit(true);
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

    return (
      <>
        <Atm_UserForm
          getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
          allColumns={allColumns}
          selectedFlatRows={selectedFlatRows}
        />
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
                    !userExceptionDataInTable.includes(column.id) && (
                      <th {...column.getHeaderProps()} key={idx}>
                        <div
                          {...column.getSortByToggleProps()}
                          className={`mb-1 flex cursor-pointer ${
                            !["selection"].includes(column.id)
                              ? ""
                              : "center pt-5"
                          }`}
                        >
                          {column.render("Header")}

                          {/* 리사이징 */}
                          <div
                            {...column.getResizerProps()}
                            className={`resizer ${
                              column.isResizing ? "isResizing" : ""
                            }`}
                          />

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
                          {column.canFilter &&
                          !["selection"].includes(column.id)
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

  if (findUsersError) {
    return (
      <TableStyle>
        권한이 없습니다.
        <div className="">{findUsersError.toString()}</div>
      </TableStyle>
    );
  }
  if (findUsersLoading) {
    return (
      <TableStyle>
        <div className=""></div>
      </TableStyle>
    );
  }

  return (
    <TableStyle>
      <Table columns={columns} data={usersData} />
    </TableStyle>
  );
}
