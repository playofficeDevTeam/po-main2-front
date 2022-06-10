import { atom, useRecoilState } from "recoil";

export const adminColumnsDefault = [
  {
    Header: "생성일",
    accessor: "createdAt",
    value: "",
    selected: false,
    width: 85,
    sortDescFirst: true,
  },
  {
    Header: "이메일(ID)",
    accessor: "email",
    value: "",
    selected: false,
    width: 400,
    sortDescFirst: true,
  },
  {
    Header: "닉네임",
    accessor: "nickName",
    value: "",
    selected: false,
    width: 300,
    sortDescFirst: true,
  },

  {
    Header: "역할",
    accessor: "role",
    value: "",
    selected: false,
    width: 150,
    sortDescFirst: true,
  },
  { Header: "dataId", accessor: "id", value: "", width: 0 },
];

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
