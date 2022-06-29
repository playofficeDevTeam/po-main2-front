export type IColumn = {
  Header: string;
  accessor: string;
  value: string;
  selected: boolean;
  width: number;
  sortDescFirst: boolean;
  inputType: "string" | "number" | "boolean" | "won" | "array";
};
