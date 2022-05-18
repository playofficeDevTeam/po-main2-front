import { atom, useRecoilState } from "recoil";

export const paymentFormDefalut = [
  { Header: "생성일", accessor: "createdAt", value: "" },
  { Header: "브랜드명(R)", accessor: "brandName_partner", value: "" },
  { Header: "브랜드명", accessor: "brandName", value: "" },
  { Header: "이름", accessor: "name", value: "" },
  { Header: "연락처", accessor: "phoneNumber", value: "" },
  { Header: "이메일", accessor: "email", value: "" },
  { Header: "결제수단", accessor: "paymentMethod", value: "" },
  { Header: "금액", accessor: "amount", value: "" },
  { Header: "결제상태", accessor: "paymentState", value: "" },
  { Header: "태그", accessor: "tags", value: "" },
  { Header: "dataId", accessor: "id", value: "" },
];

export const paymentFormData = atom({
  key: "paymentFormData",
  default: paymentFormDefalut,
});

export const usePaymentFormDataOnChange = () => {
  const [paymentFormDataState, setPaymentFormDataState] =
    useRecoilState(paymentFormData);

  const onChange = (e, id) => {
    setPaymentFormDataState((formData) =>
      formData.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };
  return onChange;
};
