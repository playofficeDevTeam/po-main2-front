import { atom, useRecoilState } from "recoil";
export const itemFormDefalut = [
  { Header: "생성일", accessor: "createdAt", value: "" },
  { Header: "카테고리1", accessor: "itemCategory1", value: "" },
  { Header: "서비스명", accessor: "itemName", value: "" },
  { Header: "상세정보", accessor: "detailInfo", value: "" },
  { Header: "가격", accessor: "price", value: "" },
  { Header: "할인율", accessor: "discountRate", value: "" },
  { Header: "유형", accessor: "type", value: "" },
  { Header: "dataId", accessor: "id", value: "" },
];

export const itemFormData = atom({
  key: "itemFormData",
  default: itemFormDefalut,
});

export const useItemFormDataOnChange = () => {
  const [itemFormDataState, setItemFormDataState] =
    useRecoilState(itemFormData);

  const onChange = (e, id) => {
    setItemFormDataState((formData) =>
      formData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
