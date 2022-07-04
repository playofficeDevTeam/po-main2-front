import { atom, useRecoilState } from "recoil";
import { IColumn } from "../../../3organisms/Org_adminTable2/interface_column";

export const paymentColumnsDefault: IColumn[] = [
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
    Header: "결제수단",
    accessor: "paymentMethod",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "금액",
    accessor: "amount",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "number",
  },
  {
    Header: "결제상태",
    accessor: "paymentState",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
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

export const rawPaymentColumnsData = atom({
  key: "rawPaymentColumnsData",
  default: paymentColumnsDefault,
});

export const paymentColumnsData = atom({
  key: "paymentColumnsData",
  default: paymentColumnsDefault,
});

export const usePaymentColumnsDataOnChange = () => {
  const [paymentColumnsDataState, setPaymentColumnsDataState] =
    useRecoilState(paymentColumnsData);

  const onChange = (e, id) => {
    setPaymentColumnsDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
