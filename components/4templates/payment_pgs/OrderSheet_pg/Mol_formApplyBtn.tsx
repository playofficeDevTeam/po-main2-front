import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { useMailsend } from "../../../hooks/mail/useMailsend";
import { serviceDatasAtom } from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { mailText } from "./const_mailtext";
import { userFormData } from "./Var_userFormData";
const axios = require("axios").default;

export default function App({ trigger = false }) {
  const router = useRouter();
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const mutation = useMailsend();

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
        mutation.mutate({
          from: "poketing_mail_server@poketing.com",
          to: "mass@pokemaster.shop",
          subject: "테스트 메일입니다",
          html: mailText,
        });

        // router.push("/order-sheet/payment-success-withoutBankbook");
      }}
    >
      <div className="px-14 text-lg">결제하기</div>
    </RoundedOrangeBtn>
  );
}
