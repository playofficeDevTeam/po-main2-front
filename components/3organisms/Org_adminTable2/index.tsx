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
import Modal_adminCreate, {
  isModal_adminCreateOpenAtom,
} from "../Org_adminTable/Modal_adminCreate";
import Modal_adminEdit, {
  isModal_adminEditOpenAtom,
} from "../Org_adminTable/Modal_adminEdit";
import { useTokenCheck } from "../../hooks/useTokenCheck";
import { columnsMutationType, formFocus } from "./fn_inputControl";
import dayjs from "dayjs";
import { dateToInput } from "../Org_adminTable/fn_dateToInput";
import {
  rawTableFromDate,
  rawTableToDate,
  tableFromDate,
  tableToDate,
} from "../Org_adminTable/Var_tableInputDate";
import { useQuery } from "@apollo/client";
import { FIND_ME_FOR_ADMIN } from "../../4templates/admin_pgs/Admin/Gql_admin";
import { findMeforAdmin } from "../../4templates/admin_pgs/Admin/__generated__/findMeforAdmin";
import { dateTime } from "../Org_adminTable/fn_DateTime";
import Atm_mentionInput from "../Org_adminTable/Atm_mentionInput";
import mentionToArray from "./mentionToArray";
import axios from "axios";
import { useRouter } from "next/router";
import St_label from "../Org_adminTable/St_label";
import Atom_tableLabel from "./Atom_tableLabel";
import { callbackify } from "util";

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
      <option value="">전체</option>
      {options.map((option: any, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function PointRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        // placeholder={`Min (${min})`}
        className="border rounded-sm"
        style={{
          width: "40px",
          marginRight: "0.2rem",
        }}
      />
      ~
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        // placeholder={`Max (${max})`}
        className="border rounded-sm"
        style={{
          width: "40px",
          marginLeft: "0.2rem",
        }}
      />
    </div>
  );
}
export function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        // placeholder={`Min (${min})`}
        className="border rounded-sm"
        style={{
          width: "60px",
          marginRight: "0.2rem",
        }}
      />
      ~
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        // placeholder={`Max (${max})`}
        className="border rounded-sm"
        style={{
          width: "60px",
          marginLeft: "0.2rem",
        }}
      />
    </div>
  );
}

export function DateFilter() {
  const [rawTableFromDateState, setRawTableFromDateState] =
    useRecoilState(rawTableFromDate);
  const [rawTableToDateState, setRawTableToDateState] =
    useRecoilState(rawTableToDate);

  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  return (
    <div className="ml-2 flex  px-4">
      <div className="h-full center mr-2">기한: </div>
      <input
        className="border rounded-sm pl-1"
        type="date"
        value={dateToInput(rawTableFromDateState)}
        onChange={(e) => {
          setRawTableFromDateState((state) => dayjs(e.target.value));
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

// 테이블 컴포넌트
function Table({
  columns,
  data,
  createMutation,
  editMutation,
  deleteMutation,
  rawColumnsAtom,
  options,
}) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // 가상스크롤 설정
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

  // 스테이트 관리
  //수정 모달 열기
  const [isModalOpen_edit, setisModalOpen_edit] = useRecoilState(
    isModal_adminEditOpenAtom
  );
  const [rawColumns, setRawColumns] = useRecoilState(rawColumnsAtom);

  const route = useRouter();

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
        filters: useMemo(
          () => [{ id: "createdAt", value: route.query.createdAt || "" }],
          []
        ),
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

  // 테이블 높이 변경
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

  //테이블 행 스타일
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
                {cell.column.tableType !== "hidden" && (
                  <div
                    {...cell.getCellProps()}
                    className={`thin-scroll overflow-x-auto  td group border-r px-2 border-gray-300
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
                      className={`w-max ${
                        !["selection", "newPage"].includes(cell.column.id)
                          ? "flex items-center h-full "
                          : "center mx-auto h-full"
                      }`}
                    >
                      {/* 커스텀 렌더링 */}
                      {cell.column.tableType === "date" ? (
                        <>
                          <div className="">
                            {cell.value?.split("T")[0].substr(-8)}
                          </div>
                          <div className="hidden">{cell.render("Cell")}</div>
                        </>
                      ) : (
                        <div className="">{cell.render("Cell")}</div>
                      )}

                      {/* 수정버튼 */}
                      {cell.column.editable === true && (
                        <div
                          className="hidden group-hover:block"
                          onClick={() => {
                            const cellValues = cell.row?.allCells?.map(
                              (val, idx) => ({
                                Header: val?.column?.Header,
                                accessor: val?.column?.id,
                                value: val?.value || "",
                                selected: val?.column?.id === cell.column.id,
                                translate: val.column?.translate,
                                formType_create: val.column?.formType_create,
                                formType_edit: val.column?.formType_edit,
                                formSelectList: val.column?.formSelectList,
                                mutationType_create:
                                  val.column?.mutationType_create,
                                mutationType_edit:
                                  val.column?.mutationType_edit,
                                editable: val.column?.editable,
                              })
                            );
                            const filteredCellValues = cellValues.filter(
                              (val) => !["selection"].includes(val.accessor)
                            );

                            setRawColumns(filteredCellValues);
                            setisModalOpen_edit(true);
                          }}
                        >
                          <div className="ml-1">
                            <i className="fas fa-pen cursor-pointer  text-gray-400 hover:text-gray-900  text-xs flex pb-1"></i>
                          </div>
                        </div>
                      )}

                      {/* 새창열기버튼 */}
                      {["newPage"].includes(cell.column.id) && (
                        <div className="">
                          <div
                            className="px-2 py-1 bg-gray-300 rounded-md text-white cursor-pointer hover:bg-orange-400"
                            onClick={() => {
                              window.open(
                                "/admin" +
                                  options.newPageLink +
                                  "/" +
                                  cell.row.values.newPageId
                              );
                            }}
                          >
                            열기
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
      {/* 메뉴 */}
      <Form
        columns={columns}
        createMutation={createMutation}
        editMutation={editMutation}
        deleteMutation={deleteMutation}
        rawColumnsAtom={rawColumnsAtom}
        selectedFlatRows={selectedFlatRows}
        getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        allColumns={allColumns}
        options={options}
      />
      <table {...getTableProps()} className="bg-white">
        <thead>
          <tr>
            <th
              className="flex"
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
                minWidth: `calc(100vw - 13.5rem)`,
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
              {options.dateFilter && <DateFilter />}
            </th>
          </tr>
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map(
                (column, idx) =>
                  column.tableType !== "hidden" && (
                    <th
                      {...column.getHeaderProps()}
                      key={idx}
                      className="overflow-x-auto thin-scroll"
                    >
                      <div
                        {...column.getSortByToggleProps()}
                        className={`mb-1 flex cursor-pointer w-max ${
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

//폼 컴포넌트
function Form({
  columns,
  createMutation,
  editMutation,
  deleteMutation,
  rawColumnsAtom,
  selectedFlatRows,
  getToggleHideAllColumnsProps,
  allColumns,
  options,
}) {
  const tokenCheck = useTokenCheck();

  // 스테이트 관리
  const [columnPopupState, setColumnPopupState] = useState(false);
  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminCreateOpenAtom
  );
  const [isEditModalOpen, setisEditModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );

  const [formDataState, setFormDataState] = useState(columns);
  const onChange = (e, id) => {
    setFormDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  const [rawColumns, setRawColumns]: any = useRecoilState(rawColumnsAtom);

  //멘션정보
  const [mentionState, setMentionState] = useState("");
  const mentionToInput = mentionState;

  //폼 제출 관리
  const isMentionExist = columns.find((val) => val.accessor === "rawMention");
  const createInput = columnsMutationType("create", formDataState);
  const onSubmit_create = () => {
    tokenCheck("mutation", async () => {
      try {
        if (
          formDataState.find((val) => val.accessor === "password")?.value !==
          formDataState.find((val) => val.accessor === "passwordCheck")?.value
        ) {
          throw "비밀번호가 일치하지 않습니다";
        }

        const mentionInputObject = isMentionExist
          ? { mention: mentionToInput }
          : {};

        const mutated = await createMutation[0]({
          variables: {
            input: {
              ...createInput,
              ...mentionInputObject,
              ...options.extraCreateInputObject,
            },
          },
        });

        if (isMentionExist) {
          const dataValue: any = Object.values(mutated.data);
          const createdAt = dataValue[0].createdAt;
          const mentionArray = mentionToArray(mentionState);

          const message = `
          <b>${
            findMeforAdminData?.findMeforAdmin.admin?.nickname
          }</b> 님에게서 온 멘션<br/>
          <a href="${
            window.location.href.split("?")[0]
          }?createdAt=${createdAt}">해당 멘션으로 바로가기</a>`;

          mentionArray.forEach((val) => {
            axios.post(
              process.env.NEXT_PUBLIC_API_HOST + "/auth/ms/send-chat",
              {
                nicknameToReceive: val,
                message,
              }
            );
          });
        }
        if (options.paymentRequest) {
          const dataValue: any = Object.values(mutated.data);
          const createdAt = dataValue[0].createdAt;

          const message = `
          <b>${
            findMeforAdminData?.findMeforAdmin.admin?.nickname
          }</b> 님에게서 온 결제 확인 요청<br/>
          <a href="${
            window.location.href.split("?")[0]
          }?createdAt=${createdAt}">해당 요청으로 바로가기</a>`;

          axios.post(process.env.NEXT_PUBLIC_API_HOST + "/auth/ms/send-chat", {
            nicknameToReceive: "jongjong_종종",
            message,
          });
        }
        setisModalOpen(false);
        setMentionState("");
        setFormDataState(columns);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };
  const editInput = columnsMutationType("edit", formDataState);
  const onSubmit_edit = () => {
    tokenCheck("mutation", async () => {
      try {
        if (
          formDataState.find((val) => val.accessor === "password")?.value !==
          formDataState.find((val) => val.accessor === "passwordCheck")?.value
        ) {
          throw "비밀번호가 일치하지 않습니다";
        }

        const mentionInputObject = isMentionExist
          ? { mention: mentionToInput }
          : {};
        const mutated = await editMutation[0]({
          variables: {
            input: {
              ...editInput,
              ...mentionInputObject,
              ...options.extraEditInputObject,
            },
          },
        });

        if (isMentionExist) {
          const dataValue: any = Object.values(mutated.data);
          const createdAt = dataValue[0].createdAt;
          const mentionArray = mentionToArray(mentionState);

          const message = `
          <b>${
            findMeforAdminData?.findMeforAdmin.admin?.nickname
          }</b> 님에게서 온 멘션<br/>
          <a href="${
            window.location.href.split("?")[0]
          }?createdAt=${createdAt}">해당 멘션으로 바로가기</a>`;

          mentionArray.forEach((val) => {
            axios.post(
              process.env.NEXT_PUBLIC_API_HOST + "/auth/ms/send-chat",
              {
                nicknameToReceive: val,
                message,
              }
            );
          });
        }
        setisEditModalOpen(false);
        setMentionState("");
        setFormDataState(columns);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };

  // 생성시 포커싱
  useEffect(() => {
    if (isModalOpen) {
      setMentionState("");
      setFormDataState(columns);
      formFocus(columns.find((val) => val.selected === true).accessor);
    }
  }, [isModalOpen]);

  //수정시 테이블데이터 반영 및 포커싱
  useEffect(() => {
    setMentionState(
      rawColumns.find((val) => val.accessor === "rawMention")?.value || ""
    );
    setFormDataState(rawColumns);
    setTimeout(() => {
      formFocus(rawColumns.find((val) => val.selected)?.accessor || "");
    }, 0);
  }, [rawColumns]);

  //쿼리
  const {
    loading: findMeforAdminLoading,
    error: findMeforAdminError,
    data: findMeforAdminData,
    refetch: findMeforAdminRefetch,
  } = useQuery<findMeforAdmin>(FIND_ME_FOR_ADMIN);
  useEffect(() => {
    tokenCheck("query", findMeforAdminRefetch);
  }, [findMeforAdminData]);
  useEffect(() => {
    const handler = (e) => {
      try {
        if (e.shiftKey) {
          //시프트 c 누를때 생성
          if (
            [67].includes(e.keyCode) &&
            options.createFunction &&
            !isEditModalOpen
          ) {
            setisModalOpen(true);
          }
          //컨트롤 시프트 s/d누를때 닉네임/데이트 생성
          if (e.ctrlKey) {
            if ([83, 68, 190].includes(e.keyCode) && options.shortCutHotkey) {
              let newContent;
              if ([83].includes(e.keyCode)) {
                newContent = findMeforAdminData?.findMeforAdmin.admin?.nickname;
              } else if ([68].includes(e.keyCode)) {
                const date = new Date();
                const prettyDate = dateTime(date);
                newContent =
                  findMeforAdminData?.findMeforAdmin.admin?.nickname +
                  " " +
                  prettyDate;
              } else if ([190].includes(e.keyCode)) {
                newContent = "◎";
              }
              const focusedElement: any = document.activeElement;
              const selectedValue = focusedElement.value;
              setTimeout(() => {
                setFormDataState((state) =>
                  state.map((val) =>
                    val.accessor === focusedElement.id
                      ? { ...val, value: selectedValue + newContent }
                      : val
                  )
                );
              }, 0);
            }
          }
        }
      } catch (error) {}
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [findMeforAdminData]);

  return (
    <>
      {/* 메뉴 */}
      <div
        className="flex justify-between py-2 "
        style={{ width: `calc(100vw - 14rem)` }}
      >
        <div className="flex">
          {/* 생성 */}
          {options.createFunction && (
            <div className="mr-3 cursor-pointer">
              <Modal_adminCreate
                data={{
                  button: (
                    <>
                      <div className="center px-3 h-8 bg-orange-400 rounded-md text-white hover:bg-orange-500">
                        <i className="fas fa-plus mr-2 text-sm"></i>
                        {options.paymentRequest ? "결제 확인 요청" : "생성"}
                      </div>
                    </>
                  ),
                  modal: (
                    <form
                      onSubmit={(e) => {
                        onSubmit_create();
                        e.preventDefault();
                      }}
                    >
                      <div
                        className="overflow-y-auto middle-scroll"
                        style={{ maxHeight: `calc(100vh - 12rem)` }}
                      >
                        <ul className="">
                          {isMentionExist && (
                            <li>
                              <div className="">멘션</div>
                              <Atm_mentionInput
                                value={mentionState}
                                onChange={(e) => {
                                  setMentionState(e.target.value);
                                }}
                              />
                            </li>
                          )}
                          {formDataState.map(
                            (val, idx) =>
                              val.formType_create !== "hidden" && (
                                <li key={idx} className="flex items-center">
                                  <div className="w-28 flex pl-1">
                                    {val.Header}
                                  </div>
                                  {val.formType_create === "textarea" ? (
                                    <textarea
                                      id={val.accessor}
                                      value={val.value}
                                      onChange={(e) => {
                                        onChange(e, idx);
                                      }}
                                      className="border w-96 p-1 m-1"
                                    ></textarea>
                                  ) : val.formType_create === "date" ? (
                                    <input
                                      id={val.accessor}
                                      value={dateToInput(val.value)}
                                      onChange={(e) => {
                                        onChange(e, idx);
                                      }}
                                      className="border w-96 p-1 m-1"
                                      type={`date`}
                                    />
                                  ) : val.formType_create === "select" ? (
                                    <select
                                      id={val.accessor}
                                      value={val.value}
                                      onChange={(e) => {
                                        onChange(e, idx);
                                      }}
                                      className="border w-96 p-1 m-1"
                                    >
                                      {val.formSelectList.map((val2, idx2) => (
                                        <option key={idx2}>{val2}</option>
                                      ))}
                                    </select>
                                  ) : val.formType_create === "boolean" ? (
                                    <select
                                      id={val.accessor}
                                      value={val.value}
                                      onChange={(e) => {
                                        onChange(e, idx);
                                      }}
                                      className="border w-96 p-1 m-1"
                                    >
                                      <option>O</option>
                                      <option>X</option>
                                    </select>
                                  ) : val.formType_create === "number" ? (
                                    <input
                                      id={val.accessor}
                                      value={val.value}
                                      onChange={(e) => {
                                        onChange(e, idx);
                                      }}
                                      className="border w-96 p-1 m-1"
                                      type={`number`}
                                    />
                                  ) : val.formType_create === "point" ? (
                                    <input
                                      id={val.accessor}
                                      value={val.value}
                                      onChange={(e) => {
                                        onChange(e, idx);
                                      }}
                                      className="border w-96 p-1 m-1"
                                      type={`number`}
                                      min="1"
                                      max="9"
                                    />
                                  ) : (
                                    <input
                                      id={val.accessor}
                                      value={val.value}
                                      onChange={(e) => {
                                        onChange(e, idx);
                                      }}
                                      className="border w-96 p-1 m-1"
                                      type={`text`}
                                    />
                                  )}
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                      <div className="flex justify-end mt-2">
                        <div
                          className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                          onClick={() => {
                            setMentionState("");
                            setFormDataState(columns);
                            formFocus(
                              columns.find((val) => val.selected === true)
                                .accessor
                            );
                          }}
                        >
                          초기화
                        </div>
                        <div
                          className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                          onClick={() => {
                            setisModalOpen(false);
                          }}
                        >
                          취소
                        </div>
                        <button className="p-1 px-3 bg-orange-400 hover:bg-orange-500 rounded-md text-white cursor-pointer">
                          확인
                        </button>
                      </div>
                    </form>
                  ),
                }}
              />
            </div>
          )}
          {/* 수정모달 */}
          <div className="">
            <Modal_adminEdit
              data={{
                button: <></>,
                modal: (
                  <form
                    onSubmit={(e) => {
                      onSubmit_edit();
                      e.preventDefault();
                    }}
                  >
                    <div
                      className="overflow-y-auto middle-scroll"
                      style={{ maxHeight: "70vh" }}
                    >
                      <ul>
                        {isMentionExist && (
                          <li>
                            <div className="">멘션</div>
                            <Atm_mentionInput
                              value={mentionState}
                              onChange={(e) => {
                                setMentionState(e.target.value);
                              }}
                            />
                          </li>
                        )}
                        {formDataState.map(
                          (val, idx) =>
                            val.formType_edit !== "hidden" && (
                              <li key={idx} className="flex items-center">
                                <div className="w-28 flex pl-1">
                                  {val.Header}
                                </div>
                                {val.formType_edit === "textarea" ? (
                                  <textarea
                                    id={val.accessor}
                                    value={val.value}
                                    onChange={(e) => {
                                      onChange(e, idx);
                                    }}
                                    className="border w-96 p-1 m-1"
                                  ></textarea>
                                ) : val.formType_edit === "date" ? (
                                  <input
                                    id={val.accessor}
                                    value={dateToInput(val.value)}
                                    onChange={(e) => {
                                      onChange(e, idx);
                                    }}
                                    className="border w-96 p-1 m-1"
                                    type={`date`}
                                  />
                                ) : val.formType_edit === "select" ? (
                                  <select
                                    id={val.accessor}
                                    value={val.value}
                                    onChange={(e) => {
                                      onChange(e, idx);
                                    }}
                                    className="border w-96 p-1 m-1"
                                  >
                                    {val.formSelectList.map((val2, idx2) => (
                                      <option key={idx2}>{val2}</option>
                                    ))}
                                  </select>
                                ) : val.formType_create === "boolean" ? (
                                  <select
                                    id={val.accessor}
                                    value={val.value}
                                    onChange={(e) => {
                                      onChange(e, idx);
                                    }}
                                    className="border w-96 p-1 m-1"
                                  >
                                    <option>O</option>
                                    <option>X</option>
                                  </select>
                                ) : val.formType_create === "number" ? (
                                  <input
                                    id={val.accessor}
                                    value={val.value}
                                    onChange={(e) => {
                                      onChange(e, idx);
                                    }}
                                    className="border w-96 p-1 m-1"
                                    type={`number`}
                                  />
                                ) : val.formType_create === "point" ? (
                                  <input
                                    id={val.accessor}
                                    value={val.value}
                                    onChange={(e) => {
                                      onChange(e, idx);
                                    }}
                                    className="border w-96 p-1 m-1"
                                    type={`number`}
                                    min="1"
                                    max="9"
                                  />
                                ) : (
                                  <input
                                    id={val.accessor}
                                    value={val.value}
                                    onChange={(e) => {
                                      onChange(e, idx);
                                    }}
                                    className="border w-96 p-1 m-1"
                                    type={`text`}
                                  />
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                    <div className="flex justify-end mt-2">
                      <div
                        className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                        onClick={() => {
                          setisEditModalOpen(false);
                        }}
                      >
                        취소
                      </div>
                      <button className="p-1 px-3 bg-orange-400 hover:bg-orange-500 rounded-md text-white cursor-pointer">
                        확인
                      </button>
                    </div>
                  </form>
                ),
              }}
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
                      !["selection"].includes(column.id) &&
                      column.tableType !== "hidden" && (
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
                    const selectedIds = selectedFlatRows.map(
                      (val) => val.original.id
                    );
                    tokenCheck("mutation", () => {
                      deleteMutation[0]({
                        variables: {
                          input: {
                            ids: selectedIds,
                          },
                        },
                      });
                    });
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
          {options.newPageLink && selectedFlatRows?.length !== 0 ? (
            <div
              className="mr-3 cursor-pointer center px-3 h-8 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300"
              onClick={() => {
                selectedFlatRows.forEach((val) => {
                  window.open(
                    "/admin" + options.newPageLink + "/" + val.values.newPageId
                  );
                });
              }}
            >
              상세정보 열기
            </div>
          ) : (
            <></>
          )}
          {/* 타이틀 */}
          {options.tableTitle && <St_label>{options.tableTitle}</St_label>}
        </div>

        <div className="flex">
          {/* 테이블라벨 */}
          {options.label && (
            <>
              {options.label.map((val, idx) => (
                <Atom_tableLabel input={val} className="mr-1" key={idx}>
                  {val.title}
                </Atom_tableLabel>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function App({
  columns,
  data,
  createMutation,
  editMutation,
  deleteMutation,
  rawColumnsAtom,
  options,
}) {
  return (
    <div className="bg-gray-50 w-full overflow-x-scroll middle-scroll ">
      <TableStyles>
        <Table
          columns={columns}
          data={data}
          createMutation={createMutation}
          editMutation={editMutation}
          deleteMutation={deleteMutation}
          rawColumnsAtom={rawColumnsAtom}
          options={options}
        />
      </TableStyles>
    </div>
  );
}

export default App;
