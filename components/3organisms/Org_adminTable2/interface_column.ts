export type IColumn = {
  Header: string;
  accessor: string;
  Filter?: any;
  filter?: string;
  value: string | number;
  selected: boolean;
  width: number;
  sortDescFirst: boolean;
  tableType:
    | "hidden"
    | "string"
    | "array"
    | "number"
    | "boolean"
    | "won"
    | "newPage"
    | "date"
    | "detailDate"
    | "translate";
  translate?: {
    key: string;
    value: string;
  }[];
  formType_create:
    | "hidden"
    | "string"
    | "number"
    | "point"
    | "won"
    | "select"
    | "boolean"
    | "textarea"
    | "date"
    | "array"
    | "password";
  formType_edit:
    | "hidden"
    | "string"
    | "number"
    | "point"
    | "won"
    | "select"
    | "boolean"
    | "textarea"
    | "date"
    | "array"
    | "password";
  mutationType_create:
    | "hidden"
    | "string"
    | "number"
    | "boolean"
    | "array"
    | "translate";
  mutationType_edit:
    | "hidden"
    | "string"
    | "number"
    | "boolean"
    | "array"
    | "translate";
  editable: boolean;

  formSelectList?: Array<string>;
};
