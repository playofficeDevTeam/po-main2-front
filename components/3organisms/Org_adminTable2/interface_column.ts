export type IColumn = {
  Header: string;
  accessor: string;
  value: string;
  selected: boolean;
  width: number;
  sortDescFirst: boolean;
  mutationType: "string" | "number" | "boolean" | "array";
  tableType: "string" | "boolean" | "won" | "newPage";
  formType: "string" | "won" | "select" | "boolean" | "textarea";
  formSelectList?: Array<string>;
  newPageLink?: string;
};
