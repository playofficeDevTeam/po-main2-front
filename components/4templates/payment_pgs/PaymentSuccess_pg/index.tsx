import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePaymentApproval } from "./usePaymentApproval_Hk";
import ReactLoading from "react-loading";
import { useRecoilState } from "recoil";
import { isVisibleHeaderAtom } from "../../../3organisms/Org_header";
import { isVisibleFooterAtom } from "../../../3organisms/Org_footer";
import ShutdownChanneltalk from "../../../2molecules/ShutdownChanneltalk";

export default function App() {
  const router = useRouter();
  const urlParams = router.query;

  const PaymentApprovalMutation = usePaymentApproval();

  const [isVisibleHeader, setIsBisibleHeader] =
    useRecoilState(isVisibleHeaderAtom);
  const [isVisibleFooter, setIsBisibleFooter] =
    useRecoilState(isVisibleFooterAtom);

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
    setIsBisibleHeader(false);
    setIsBisibleFooter(false);
    return () => {
      setIsBisibleHeader(true);
      setIsBisibleFooter(true);
    };
  }, [setIsBisibleHeader, setIsBisibleFooter]);

  useEffect(() => {
    if (PaymentApprovalMutation.isSuccess) {
      const paymentResponse = PaymentApprovalMutation.data?.data;

      const clickedPaymentMethod =
        window.localStorage.getItem("clickedPaymentMethod") ?? "";

      window.localStorage.setItem(
        "paymentResponse",
        JSON.stringify(paymentResponse)
      );
      if (paymentResponse?.statusCode === 200) {
        if (clickedPaymentMethod === "카드") {
          router.replace("/order-sheet/payment-success-card");
        } else if (clickedPaymentMethod === "가상계좌") {
          router.replace("/order-sheet/payment-success-without-bankbook");
        }
      } else {
        router.replace("/order-sheet/payment-fail");
      }
    }
  }, [PaymentApprovalMutation]);

  return (
    <>
      <ShutdownChanneltalk />
      <div className="fixed center" style={{ width: "100vw", height: "100vh" }}>
        <ReactLoading
          type={"spokes"}
          color={"black"}
          height={"2.8rem"}
          width={"2.8rem"}
        />
      </div>
    </>
  );
}
