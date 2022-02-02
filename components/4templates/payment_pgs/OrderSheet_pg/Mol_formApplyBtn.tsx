import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { useMailsend } from "../../../hooks/mail/useMailsend";
import {
  clickedServiceDataClass,
  serviceDatasAtom,
} from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { mailText } from "./const_mailtext";
import { userFormData } from "./Var_userFormData";
import { v1 } from "uuid";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { paymentMethodAtom } from "./Org_5paymentMethod";

export default function App({ trigger = false }) {
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const clickedServiceClass = useRecoilValue(clickedServiceDataClass);

  const [paymentMethod, setPaymentMethod] = useRecoilState(paymentMethodAtom);

  const mailSendMutation = useMailsend();

  const tossClientKey = process.env.NEXT_PUBLIC_TOSS_CLIENTKEY + "";
  const makeAPayment = async () => {
    const tossPayments = await loadTossPayments(tossClientKey);
    const amount = clickedServiceClass?.priceTotal
      ? clickedServiceClass?.priceTotal
      : 0;
    const orderId = v1();
    const paymentReqData = {
      amount,
      orderId,
    };
    window.localStorage.setItem(
      "paymentReqData",
      JSON.stringify(paymentReqData)
    );

    const clickedPaymentMethod = paymentMethod.find(
      (val) => val.selected
    )?.methodCode;

    switch (clickedPaymentMethod) {
      case "카드":
        tossPayments.requestPayment("카드", {
          amount,
          orderId,
          orderName: clickedServiceClass?.fullName ?? "",
          successUrl: window.location.origin + "/order-sheet/payment-success",
          failUrl: window.location.origin + "/order-sheet/payment-fail",
          customerName: userFormDataState[1],
          customerEmail: userFormDataState[3].trim(),
        });
        break;
      case "가상계좌":
        tossPayments.requestPayment("가상계좌", {
          amount,
          orderId,
          orderName: clickedServiceClass?.fullName ?? "",
          successUrl: window.location.origin + "/order-sheet/payment-success",
          failUrl: window.location.origin + "/order-sheet/payment-fail",
          customerName: userFormDataState[1],
          customerEmail: userFormDataState[3].trim(),
        });
        break;
    }
  };

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
        // mailSendMutation.mutate({
        //   from: "poketing_mail_server@poketing.com",
        //   to: "mass@pokemaster.shop",
        //   subject: "테스트 메일입니다",
        //   html: mailText,
        // });
        makeAPayment();
      }}
    >
      <div className="px-14 text-lg">결제하기</div>
    </RoundedOrangeBtn>
  );
}
