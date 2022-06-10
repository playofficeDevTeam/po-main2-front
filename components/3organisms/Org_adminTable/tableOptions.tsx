import dayjs from "dayjs";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useAsyncDebounce } from "react-table";
import { useRecoilState } from "recoil";
import { dateToInput } from "./fn_dateToInput";
import {
  rawTableFromDate,
  rawTableToDate,
  tableFromDate,
  tableToDate,
} from "./Var_tableInputDate";

export function GlobalFilter({
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

export function DateFilter({ refetch }) {
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
              setTimeout(() => {
                refetch();
              }, 0);
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

export function ColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
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

export const IndeterminateCheckbox = forwardRef<HTMLInputElement>(
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

export const ColumnIndeterminateCheckbox = forwardRef<HTMLInputElement>(
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
