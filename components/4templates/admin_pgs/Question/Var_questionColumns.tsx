import { atom, useRecoilState } from "recoil";
import { IColumn } from "../../../3organisms/Org_adminTable2/interface_column";

export const questionExceptionData = {
  table: ["id"],
  createForm: ["id", "createdAt", "newPage"],
  createMutation: ["id", "createdAt", "newPage"],
  editForm: ["id", "createdAt", "newPage"],
  editMutation: ["createdAt", "newPage"],
  editBtn: ["id", "createdAt", "selection", "newPage"],
  focusId: "brandName",
};

export const questionColumnsDefault: IColumn[] = [
  {
    Header: "생성일",
    accessor: "createdAt",
    width: 87,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "새창",
    accessor: "newPage",
    width: 64,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "newPage",
    formType: "string",
  },
  {
    Header: "브랜드명(R)",
    accessor: "brandName_partner",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "브랜드명",
    accessor: "brandName",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "제품",
    accessor: "product",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "문의서비스",
    accessor: "serviceInquired",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "분석유무",
    accessor: "isAnalyzed",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "boolean",
    tableType: "boolean",
    formType: "boolean",
  },
  {
    Header: "이름",
    accessor: "name",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "연락처",
    accessor: "phoneNumber",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "이메일",
    accessor: "email",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "예산",
    accessor: "budget",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "number",
    tableType: "won",
    formType: "won",
  },
  {
    Header: "제품 링크",
    accessor: "productLink",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "특이사항",
    accessor: "uniqueness",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "textarea",
  },
  {
    Header: "대행사",
    accessor: "isAgency",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "boolean",
    tableType: "boolean",
    formType: "boolean",
  },
  {
    Header: "태그",
    accessor: "tags",
    width: 150,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "string",
    tableType: "string",
    formType: "string",
  },
  {
    Header: "dataId",
    accessor: "id",
    width: 0,
    sortDescFirst: true,
    value: "",
    selected: false,
    mutationType: "number",
    tableType: "string",
    formType: "string",
  },
];

export const rawQuestionColumnsAtom = atom({
  key: "rawQuestionColumnsAtom",
  default: questionColumnsDefault,
});

// export const questionColumnsData = atom({
//   key: "questionColumnsData",
//   default: questionColumnsDefault,
// });

// export const useQuestionColumnsDataOnChange = () => {
//   const [questionColumnsDataState, setQuestionColumnsDataState] =
//     useRecoilState(questionColumnsData);

//   const onChange = (e, id) => {
//     setQuestionColumnsDataState((columnsData) =>
//       columnsData.map((val, idx) =>
//         idx === id ? { ...val, value: e.target.value } : val
//       )
//     );
//   };
//   return onChange;
// };
