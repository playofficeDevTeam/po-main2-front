import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clickedServiceDataClass,
  serviceDatasAtom,
} from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { userFormData } from "../OrderSheet_pg/Var_userFormData";
export default function App() {
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const clickedServiceData = useRecoilValue(clickedServiceDataClass);
  const [isServiceDataLoad, setIsServiceDataLoad] = useState(false);

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

  return <></>;
}
