import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { paymentMethodAtom } from "../OrderSheet_pg/Org_5paymentMethod";
import { usePaymentApproval } from "./usePaymentApproval_Hk";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();

  const [paymentMethod, setPaymentMethod] = useRecoilState(paymentMethodAtom);
  const clickedPaymentMethod = paymentMethod.find((val) => val.selected);

  const router = useRouter();
  const urlParams = router.query;

  const PaymentApprovalMutation = usePaymentApproval();

  useEffect(() => {
    const paymentReqData = JSON.parse(
      window.localStorage.getItem("paymentReqData") ?? ""
    );
    if (urlParams.amount === paymentReqData.amount.toString()) {
      PaymentApprovalMutation.mutate({
        paymentMethod: clickedPaymentMethod?.methodCode ?? "",
        paymentKey: urlParams.paymentKey as string,
        orderId: urlParams.orderId as string,
        amount: urlParams.amount as string,
      });
    }
  }, [urlParams]);

  useEffect(() => {
    console.log(PaymentApprovalMutation.data?.data);
  }, [PaymentApprovalMutation]);

  return <>{PaymentApprovalMutation.isLoading ? <>loading...</> : <></>}</>;
}
