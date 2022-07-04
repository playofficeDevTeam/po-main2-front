import { atom, useRecoilState } from "recoil";
import { IColumn } from "../../../3organisms/Org_adminTable2/interface_column";

export const questionColumnsDefault: IColumn[] = [
  {
    Header: "생성일",
    accessor: "createdAt",
    value: "",
    selected: false,
    width: 87,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "새창",
    accessor: "newPage",
    value: "",
    selected: false,
    width: 64,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "브랜드명(R)",
    accessor: "brandName_partner",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "브랜드명",
    accessor: "brandName",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "제품",
    accessor: "product",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "문의서비스",
    accessor: "serviceInquired",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "분석유무",
    accessor: "isAnalyzed",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "boolean",
  },
  {
    Header: "이름",
    accessor: "name",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "연락처",
    accessor: "phoneNumber",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "이메일",
    accessor: "email",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "예산",
    accessor: "budget",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "won",
  },
  {
    Header: "제품 링크",
    accessor: "productLink",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "특이사항",
    accessor: "uniqueness",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "대행사",
    accessor: "isAgency",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "boolean",
  },
  {
    Header: "태그",
    accessor: "tags",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "dataId",
    accessor: "id",
    value: "",
    selected: false,
    width: 0,
    sortDescFirst: true,
    inputType: "number",
  },
];

export const rawQuestionColumnsData = atom({
  key: "rawQuestionColumnsData",
  default: questionColumnsDefault,
});
export const questionColumnsData = atom({
  key: "questionColumnsData",
  default: questionColumnsDefault,
});

export const useQuestionColumnsDataOnChange = () => {
  const [questionColumnsDataState, setQuestionColumnsDataState] =
    useRecoilState(questionColumnsData);

  const onChange = (e, id) => {
    setQuestionColumnsDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
