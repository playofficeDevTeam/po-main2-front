import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { serviceDatasAtom } from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { userFormData } from "./Var_userFormData";

export default function App({ trigger = false }) {
  const router = useRouter();
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  return (
    <RoundedOrangeBtn
      trigger={trigger}
      onClick={() => {
        window.localStorage.setItem(
          "serviceDataState",
          JSON.stringify(serviceDataState)
        );
        window.localStorage.setItem(
          "userFormDataState",
          JSON.stringify(userFormDataState)
        );
        router.push("/order-sheet/payment-success-card");
      }}
    >
      <div className="px-14 text-lg">결제하기</div>
    </RoundedOrangeBtn>
  );
}
