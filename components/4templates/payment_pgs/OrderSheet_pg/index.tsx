import Org_1orderSheetHeader from "./Org_1orderSheetHeader";
import Org_2selectedPlan from "./Org_2selectedPlan";
import Org_3paymentInfo from "./Org_3paymentInfo";
import Org_4paymentForm from "./Org_4paymentForm";
import Org_5paymentMethod from "./Org_5paymentMethod";
import Org_6paymentApply from "./Org_6paymentApply";
import Ue_loadingCookieData from "./Ue_loadingCookieData";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  return (
    <>
      <Ue_loadingCookieData />
      {isMobile ? (
        <>
          <Org_1orderSheetHeader />
          <Org_2selectedPlan />
          <Org_3paymentInfo />
          <Org_4paymentForm />
          <Org_5paymentMethod />
          <Org_6paymentApply />
        </>
      ) : (
        <div className="pc-max">
          <Org_1orderSheetHeader />
          <div className="flex w-full">
            <div className="w-7/12 mr-3">
              <Org_2selectedPlan />
              <div className="mb-3"></div>
              <Org_4paymentForm />
              <div className="mb-16"></div>
            </div>
            <div className="w-5/12">
              <Org_3paymentInfo />
              <div className="mb-3"></div>
              <Org_5paymentMethod />
              <div className="mb-3"></div>
              <Org_6paymentApply />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
