import { atom, useRecoilState } from "recoil";
import { IColumn } from "../../../3organisms/Org_adminTable2/interface_column";

export const partnerColumnsDefault: IColumn[] = [
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
    Header: "이메일(ID)",
    accessor: "email",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "비밀번호",
    accessor: "password",
    value: "",
    selected: false,
    width: 0,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "비밀번호 확인",
    accessor: "passwordCheck",
    value: "",
    selected: false,
    width: 0,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "브랜드명(ID)",
    accessor: "nameId",
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
    selected: false,
    value: "",
    width: 0,
    sortDescFirst: true,
    inputType: "string",
  },
];

export const rawPartnerColumnsData = atom({
  key: "rawPartnerColumnsData",
  default: partnerColumnsDefault,
});
export const partnerColumnsData = atom({
  key: "partnerColumnsData",
  default: partnerColumnsDefault,
});

export const usePartnerColumnsDataOnChange = () => {
  const [partnerColumnsDataState, setPartnerColumnsDataState] =
    useRecoilState(partnerColumnsData);

  const onChange = (e, id) => {
    setPartnerColumnsDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
