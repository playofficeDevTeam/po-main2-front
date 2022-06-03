import { atom, useRecoilState } from "recoil";

export const partnerColumnsDefault = [
  {
    Header: "생성일",
    accessor: "createdAt",
    value: "",
    selected: false,
    width: 90,
    sortDescFirst: true,
  },
  {
    Header: "이메일(ID)",
    accessor: "email",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "브랜드명(ID)",
    accessor: "nameId",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "브랜드명",
    accessor: "brandName",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "이름",
    accessor: "name",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "연락처",
    accessor: "phoneNumber",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  {
    Header: "태그",
    accessor: "tags",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  { Header: "dataId", accessor: "id", selected: false, value: "", width: 0 },
];

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
