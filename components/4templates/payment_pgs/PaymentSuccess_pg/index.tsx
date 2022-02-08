import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { paymentMethodAtom } from "../OrderSheet_pg/Org_5paymentMethod";
import { usePaymentApproval } from "./usePaymentApproval_Hk";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const router = useRouter();
  const urlParams = router.query;

  const PaymentApprovalMutation = usePaymentApproval();

  useEffect(() => {
    const paymentId: number = JSON.parse(
      window.localStorage.getItem("paymentId") ?? ""
    );
    PaymentApprovalMutation.mutate({
      paymentId: paymentId,
      paymentKey: urlParams.paymentKey as string,
      orderId: urlParams.orderId as string,
      amount: urlParams.amount as unknown as number,
    });
  }, [urlParams]);

  useEffect(() => {
    console.log(PaymentApprovalMutation.data?.data);
  }, [PaymentApprovalMutation]);

  return <>{PaymentApprovalMutation.isLoading ? <>loading...</> : <></>}</>;
}
