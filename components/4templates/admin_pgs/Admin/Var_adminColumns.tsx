import { atom, useRecoilState } from "recoil";
import { IColumn } from "../adminAtoms/interface_column";

export const adminColumnsDefault: IColumn[] = [
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
    width: 400,
    sortDescFirst: true,
    inputType: "string",
  },
  {
    Header: "닉네임",
    accessor: "nickname",
    value: "",
    selected: false,
    width: 300,
    sortDescFirst: true,
    inputType: "string",
  },

  {
    Header: "역할",
    accessor: "role",
    value: "",
    selected: false,
    width: 100,
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

export const rawAdminColumnsData = atom({
  key: "rawAdminColumnsData",
  default: adminColumnsDefault,
});

export const adminColumnsData = atom({
  key: "adminColumnsData",
  default: adminColumnsDefault,
});

export const useAdminColumnsDataOnChange = () => {
  const [adminColumnsDataState, setAdminColumnsDataState] =
    useRecoilState(adminColumnsData);

  const onChange = (e, id) => {
    setAdminColumnsDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
