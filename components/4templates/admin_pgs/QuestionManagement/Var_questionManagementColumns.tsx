import { atom, useRecoilState } from "recoil";
import { dateSmall } from "../../../3organisms/Org_adminTable/fn_DateSmall";
import { IColumn } from "../adminAtoms/interface_column";

const nowDate = dateSmall(new Date());
export const questionManagementColumnsDefault: IColumn[] = [
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
    Header: "브랜드명",
    accessor: "brandName",
    value: "",
    selected: false,
    width: 200,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "스케쥴",
    accessor: "stateDate",
    value: nowDate,
    selected: false,
    width: 97,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "제목",
    accessor: "stateName",
    value: "",
    selected: false,
    width: 200,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "상태",
    accessor: "state",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "시간",
    accessor: "stateTime",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "비고",
    accessor: "note",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "코멘트",
    accessor: "comment",
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
    Header: "dataId",
    accessor: "id",
    value: "",
    selected: false,
    width: 0,
    sortDescFirst: true,
    inputType: "number",
  },
  {
    Header: "relationId",
    accessor: "relationId",
    value: "",
    selected: false,
    width: 0,
    sortDescFirst: true,
    inputType: "number",
  },
];

export const rawQuestionManagementColumnsData = atom({
  key: "rawQuestionManagementColumnsData",
  default: questionManagementColumnsDefault,
});

export const questionManagementColumnsData = atom({
  key: "questionManagementColumnsData",
  default: questionManagementColumnsDefault,
});

export const useQuestionManagementColumnsDataOnChange = () => {
  const [
    questionManagementColumnsDataState,
    setQuestionManagementColumnsDataState,
  ] = useRecoilState(questionManagementColumnsData);

  const onChange = (e, id) => {
    setQuestionManagementColumnsDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
