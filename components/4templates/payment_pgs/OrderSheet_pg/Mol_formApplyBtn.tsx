import { useRecoilState, useRecoilValue } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import {
  clickedServiceDataClass,
  serviceDatasAtom,
} from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { userFormData, userFormDataValidate } from "./Var_userFormData";
import { v1 } from "uuid";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { paymentMethodAtom } from "./Org_5paymentMethod";
import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT } from "./Gql_payment";
import {
  CreatePayment,
  CreatePaymentVariables,
} from "./__generated__/CreatePayment";
import { useState } from "react";
import ReactLoading from "react-loading";

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

  const amount = clickedServiceClass?.priceDiscounted ?? 0;
  const [orderId, setOrderId] = useState(v1());

  const tossClientKey = process.env.NEXT_PUBLIC_TOSS_CLIENTKEY + "";
  const makeAPayment = async () => {
    const tossPayments = await loadTossPayments(tossClientKey);

    window.localStorage.setItem(
      "clickedPaymentMethod",
      clickedPaymentMethod ?? ""
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

  const [createPayment] = useMutation<CreatePayment, CreatePaymentVariables>(
    CREATE_PAYMENT,
    {
      onCompleted: (data: CreatePayment) => {
        const paymentId = data.createPayment.paymentId ?? 0;
        window.localStorage.setItem("paymentId", paymentId.toString());
        makeAPayment();
        setOrderId(v1());
      },
    }
  );

  const [paymentClickThrottle, setPaymentClickThrottle] = useState(true);
  const disabledPaymentClick = () => {
    setPaymentClickThrottle(false);
    setTimeout(() => {
      setPaymentClickThrottle(true);
    }, 3000);
  };

  return (
    <>
      {paymentClickThrottle ? (
        <RoundedOrangeBtn
          trigger={trigger}
          onClick={() => {
            try {
              userFormDataValidate.forEach((val, idx) => {
                if (!val.validateFunction(userFormDataState[idx])) {
                  const error = val.validateError;
                  throw error;
                }
              });
              window.localStorage.setItem(
                "serviceDataState",
                JSON.stringify(serviceDataState)
              );
              window.localStorage.setItem(
                "userFormDataState",
                JSON.stringify(userFormDataState)
              );
              disabledPaymentClick();
              createPayment({
                variables: {
                  input: {
                    brandName: userFormDataState[0].trim(),
                    name: userFormDataState[1].trim(),
                    phoneNumber: userFormDataState[2].trim(),
                    email: userFormDataState[3].trim(),
                    paymentMethod: clickedPaymentMethod ?? "오류",
                    amount,
                    orderId,
                    itemInfo: [
                      {
                        itemId: clickedServiceClass?.input.itemId ?? 0,
                        amountOfItem:
                          clickedServiceClass?.input.amountOfItems ?? 0,
                      },
                    ],
                  },
                },
              });
            } catch (error) {
              alert(error);
            }
          }}
        >
          <div className=" w-40 center text-lg">결제하기</div>
        </RoundedOrangeBtn>
      ) : (
        <RoundedOrangeBtn>
          <div className=" w-40 center text-lg">
            결제요청중
            <div className="ml-2">
              <ReactLoading
                type={"spokes"}
                color={"white"}
                height={"1.2rem"}
                width={"1.2rem"}
              />
            </div>
          </div>
        </RoundedOrangeBtn>
      )}
    </>
  );
}
