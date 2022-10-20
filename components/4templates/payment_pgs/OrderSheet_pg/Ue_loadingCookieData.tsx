import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useConversionApi from "../../../hooks/useConversionApi";
import { useGtm } from "../../../hooks/useGtm";
import {
  clickedServiceDataClass,
  serviceDatasAtom,
} from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { userFormData } from "./Var_userFormData";

export default function App() {
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const clickedServiceData = useRecoilValue(clickedServiceDataClass);

  const begin_checkoutGtm = useGtm({
    event: "begin_checkout",
    eventModel: {
      content_category: clickedServiceData?.input.itemCategory1,
      content_name: clickedServiceData?.input.itemName,
      value: clickedServiceData?.priceDiscounted,
      currency: "KRW",
      items: [
        {
          item_id: clickedServiceData?.input.itemId,
          item_name: clickedServiceData?.input.itemName,
        },
      ],
    },
  });

  //데이터 로딩 상태 스테이트
  const [isServiceDataLoad, setIsServiceDataLoad] = useState(false);

  //데이터 로딩
  useEffect(() => {
    const asyncLoad = async () => {
      const serviceData = JSON.parse(
        window.localStorage.getItem("serviceDataState") ||
          JSON.stringify(serviceDataState)
      );
      setServiceDataState(serviceData);

      const userFormData = JSON.parse(
        window.localStorage.getItem("userFormDataState") ||
          JSON.stringify(userFormDataState)
      );
      setUserFormDataState(userFormData);
    };
    asyncLoad().then(() => {
      setIsServiceDataLoad(true);
    });
  }, []);

  //픽셀 이벤트
  const conversionApiMutation = useConversionApi();
  useEffect(() => {
    if (isServiceDataLoad) {
      conversionApiMutation({
        event_name: "InitiateCheckout",
        custom_data_content_category:
          clickedServiceData?.input.itemCategory1 || "",
        custom_data_content_name: clickedServiceData?.input.itemName || "",
        custom_data_value: clickedServiceData?.priceDiscounted || 0,
        contents_id: clickedServiceData?.input.itemId + "" || "",
        contents_quantity: clickedServiceData?.input.amountOfItems || 1,
        contents_item_price: clickedServiceData?.input.price || 0,
      });
    }
  }, [isServiceDataLoad]);

  return <></>;
}
