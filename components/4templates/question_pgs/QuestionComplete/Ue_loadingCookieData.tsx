import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userFormData } from "../../payment_pgs/OrderSheet_pg/Var_userFormData";
import { serviceDatasAtom } from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { userDetail1FormData } from "../QuestionForm_pg/Var_userDetail1FormData";

export default function App() {
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);
  const [userDetail1FormDataState, setUserDetail1FormDataState] =
    useRecoilState(userDetail1FormData);

  useEffect(() => {
    const serviceData = JSON.parse(
      window.localStorage.getItem("serviceDataState") ||
        JSON.stringify(serviceDataState)
    );
    setServiceDataState(() => serviceData);

    const userFormData = JSON.parse(
      window.localStorage.getItem("userFormDataState") ||
        JSON.stringify(userFormDataState)
    );
    setUserFormDataState(() => userFormData);

    const userDetail1FormData = JSON.parse(
      window.localStorage.getItem("userDetail1FormDataState") ||
        JSON.stringify(userDetail1FormDataState)
    );
    setUserDetail1FormDataState(() => userDetail1FormData);
  }, []);
  return <></>;
}
