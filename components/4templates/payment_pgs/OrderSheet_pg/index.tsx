import Org_1orderSheetHeader from "./Org_1orderSheetHeader";
import Org_2selectedPlan from "./Org_2selectedPlan";
import Org_3paymentInfo from "./Org_3paymentInfo";
import Org_4paymentForm from "./Org_4paymentForm";
import Org_5paymentMethod from "./Org_5paymentMethod";
import Org_6paymentApply from "./Org_6paymentApply";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  return (
    <>
      <Org_1orderSheetHeader />
      <Org_2selectedPlan />
      <Org_3paymentInfo />
      <Org_4paymentForm />
      <Org_5paymentMethod />
      <Org_6paymentApply />
    </>
  );
}
