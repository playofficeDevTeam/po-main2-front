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
import { LOCAL_SAVED_MEMVER_ID } from "../../../common/ExternalBoot";
import { getCookie } from "../../../hooks/useConversionApi";

//휴대폰 번호를 숫자만 남기는 정규식
const regExp = /[^0-9]/g;

//휴대폰 번호를 숫자만 남기는 함수
export const removeNonNumber = (phoneNumber: string) => {
  return phoneNumber.trim().replace(regExp, "");
};

//한국 휴대폰 번호를 국제 휴대폰 번호로 변환하는 함수
const convertKoreanPhoneNumberToInternationalPhoneNumber = (
  koreanPhoneNumber: string
) => {
  if (koreanPhoneNumber[0] === "0") {
    return `+82${koreanPhoneNumber.substring(1)}`;
  } else {
    return `+82${koreanPhoneNumber}`;
  }
};

//한국 휴대폰 번호를 숫자만 남기고 국제 휴대폰 번호로 변환하는 함수
export const convertKoreanPhoneNumberToInternationalPhoneNumberAndRemoveNonNumber =
  (koreanPhoneNumber: string) => {
    return convertKoreanPhoneNumberToInternationalPhoneNumber(
      removeNonNumber(koreanPhoneNumber)
    );
  };

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

        //orderId 초기화
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

              // memberId 가져오기
              const memberId = window.localStorage.getItem(
                LOCAL_SAVED_MEMVER_ID
              );

              const fbp = getCookie("_fbp");
              const fbc = getCookie("_fbc");

              createPayment({
                variables: {
                  input: {
                    clientUserFbc: fbc,
                    clientUserFbp: fbp,
                    memberId,
                    brandName: userFormDataState[0].trim(),
                    name: userFormDataState[1].trim(),
                    phoneNumber:
                      convertKoreanPhoneNumberToInternationalPhoneNumberAndRemoveNonNumber(
                        userFormDataState[2].trim()
                      ),
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
