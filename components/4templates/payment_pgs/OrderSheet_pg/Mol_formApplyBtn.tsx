import { useRecoilState, useRecoilValue } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import {
  clickedServiceDataClass,
  serviceDatasAtom,
} from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { userFormData } from "./Var_userFormData";
import { v1 } from "uuid";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { paymentMethodAtom } from "./Org_5paymentMethod";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PAYMENT } from "./Gql_payment";
import {
  CreatePayment,
  CreatePaymentVariables,
} from "./__generated__/CreatePayment";
import { FindPayment, FindPaymentVariables } from "./__generated__/FindPayment";

export default function App({ trigger = false }) {
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const clickedServiceClass = useRecoilValue(clickedServiceDataClass);

  const [paymentMethod, setPaymentMethod] = useRecoilState(paymentMethodAtom);
  const clickedPaymentMethod = paymentMethod.find(
    (val) => val.selected
  )?.methodCode;

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

  const [createPayment, { loading, data, error }] = useMutation<
    CreatePayment,
    CreatePaymentVariables
  >(CREATE_PAYMENT);

  return (
    <>
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
          createPayment({
            variables: {
              input: {
                brandName: "테스트브랜드",
                name: "jongwon",
                phoneNumber: "01027479085",
                email: "leebllue@gmail.com",
                itemId: 3,
                paymentKey: "paymentkey123123",
                orderId: "orderid123132",
                amount: 10000,
                paymentMethod: "카드",
              },
            },
          });

          // makeAPayment();
        }}
      >
        <div className="px-14 text-lg">결제하기</div>
      </RoundedOrangeBtn>
    </>
  );
}
