import { atom, useRecoilState } from "recoil";

export const itemColumnsDefault = [
  {
    Header: "생성일",
    accessor: "createdAt",
    value: "",
    selected: false,
    width: 85,
    sortDescFirst: true,
  },
  {
    Header: "카테고리1",
    accessor: "itemCategory1",
    value: "",
    selected: false,
    width: 250,
    sortDescFirst: true,
  },
  {
    Header: "서비스명",
    accessor: "itemName",
    value: "",
    selected: false,
    width: 200,
    sortDescFirst: true,
  },
  {
    Header: "상세정보",
    accessor: "detailInfo",
    value: "",
    selected: false,
    width: 200,
    sortDescFirst: true,
  },
  {
    Header: "가격",
    accessor: "price",
    value: "",
    selected: false,
    width: 130,
    sortDescFirst: true,
  },
  {
    Header: "할인율",
    accessor: "discountRate",
    value: "",
    selected: false,
    width: 80,
    sortDescFirst: true,
  },
  {
    Header: "유형",
    accessor: "type",
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

export const itemColumnsData = atom({
  key: "itemColumnsData",
  default: itemColumnsDefault,
});

export const useItemColumnsDataOnChange = () => {
  const [itemColumnsDataState, setItemColumnsDataState] =
    useRecoilState(itemColumnsData);

  const onChange = (e, id) => {
    setItemColumnsDataState((columnsData) =>
      columnsData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
