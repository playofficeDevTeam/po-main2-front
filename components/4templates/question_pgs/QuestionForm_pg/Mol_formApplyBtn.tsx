import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { userFormData } from "../../payment_pgs/OrderSheet_pg/Var_userFormData";
import { serviceDatasAtom } from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { userDetail1FormData } from "./Var_userDetail1FormData";

export default function App({ trigger = false }) {
  const router = useRouter();
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);
  const [userDetail1FormDataState, setUserDetail1FormDataState] =
    useRecoilState(userDetail1FormData);

  return (
    <RoundedOrangeBtn
      onClick={() => {
        window.localStorage.setItem(
          "serviceDataState",
          JSON.stringify(serviceDataState)
        );
        window.localStorage.setItem(
          "userFormDataState",
          JSON.stringify(userFormDataState)
        );
        window.localStorage.setItem(
          "userDetail1FormDataState",
          JSON.stringify(userDetail1FormDataState)
        );
        router.push("/question/complete");
      }}
    >
      <div className="px-4 text-lg">전문가 컨설팅 신청</div>
    </RoundedOrangeBtn>
  );
}
