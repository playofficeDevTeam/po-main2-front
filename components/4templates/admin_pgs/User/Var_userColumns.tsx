import { atom, useRecoilState } from "recoil";

export const userColumnsDefault = [
  {
    Header: "생성일",
    accessor: "createdAt",
    value: "",
    selected: false,
    width: 87,
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
    Header: "이름(ID)",
    accessor: "nameId",
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
    Header: "주민등록번호",
    accessor: "residentRegistrationNumber",
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
  {
    Header: "dataId",
    accessor: "id",
    value: "",
    selected: false,
    width: 0,
    sortDescFirst: true,
  },
];

export const userColumnsData = atom({
  key: "userColumnsData",
  default: userColumnsDefault,
});

export const useUserColumnsDataOnChange = () => {
  const [userColumnsDataState, setUserColumnsDataState] =
    useRecoilState(userColumnsData);

  const onChange = (e, id) => {
    setUserColumnsDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
