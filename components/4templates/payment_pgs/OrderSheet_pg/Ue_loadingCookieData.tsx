import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
  const [isServiceDataLoad, setIsServiceDataLoad] = useState(false);
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

  useEffect(() => {
    const serviceData = JSON.parse(
      window.localStorage.getItem("serviceDataState") ||
        JSON.stringify(serviceDataState)
    );
    setServiceDataState(serviceData);
    setIsServiceDataLoad(true);

    const userFormData = JSON.parse(
      window.localStorage.getItem("userFormDataState") ||
        JSON.stringify(userFormDataState)
    );
    setUserFormDataState(userFormData);
  }, []);

  useEffect(() => {
    if (isServiceDataLoad) {
      setTimeout(() => {
        begin_checkoutGtm();
      }, 0);
    }
  }, [clickedServiceData]);

  return <></>;
}
