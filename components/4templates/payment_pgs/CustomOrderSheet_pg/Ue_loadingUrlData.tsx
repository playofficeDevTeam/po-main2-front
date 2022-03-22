import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { serviceDatasAtom } from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { userFormData } from "../OrderSheet_pg/Var_userFormData";

export default function App() {
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  useEffect(() => {
    const serviceData = [
      {
        itemId: 1,
        hightlighted: false,
        itemCategory1: "커스텀 카테고리",
        itemName: "커스텀 아이템 이름",
        detailInfo: ["브랜드 제품 소개 영상 5개"],
        price: 1100000,
        discount: false,
        discountRate: 0,
        amountOfItems: 1,
        isClicked: true,
        isAmountFix: false,
      },
    ];
    setServiceDataState(serviceData);

    const userFormData = JSON.parse(
      window.localStorage.getItem("userFormDataState") ||
        JSON.stringify(userFormDataState)
    );
    setUserFormDataState(userFormData);
  }, []);
  return <></>;
}
