export type IColumn = {
  Header: string;
  accessor: string;
  value: string;
  selected: boolean;
  width: number;
  sortDescFirst: boolean;
  tableType:
    | "hidden"
    | "string"
    | "boolean"
    | "won"
    | "newPage"
    | "date"
    | "translate";
  translate?: {
    key: string;
    value: string;
  }[];
  formType_create:
    | "hidden"
    | "string"
    | "number"
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
