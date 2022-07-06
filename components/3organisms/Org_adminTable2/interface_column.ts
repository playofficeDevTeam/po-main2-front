export type IColumn = {
  Header: string;
  accessor: string;
  value: string;
  selected: boolean;
  width: number;
  sortDescFirst: boolean;
  tableType: "hidden" | "string" | "boolean" | "won" | "newPage" | "date";
  formType_create:
    | "hidden"
    | "string"
    | "won"
    | "select"
    | "boolean"
    | "textarea"
    | "date";
  formType_edit:
    | "hidden"
    | "string"
    | "won"
    | "select"
    | "boolean"
    | "textarea"
    | "date";
  mutationType_create: "hidden" | "string" | "number" | "boolean" | "array";
  mutationType_edit: "hidden" | "string" | "number" | "boolean" | "array";
  editable: boolean;

  formSelectList?: Array<string>;
};
