import useIsMobile from "../../../hooks/useIsMobile";
import Org_1orderSheetHeader from "../OrderSheet_pg/Org_1orderSheetHeader";
import Org_2selectedPlan from "../OrderSheet_pg/Org_2selectedPlan";
import Org_3paymentInfo from "../OrderSheet_pg/Org_3paymentInfo";
import Org_4paymentForm from "../OrderSheet_pg/Org_4paymentForm";
import Org_5paymentMethod from "../OrderSheet_pg/Org_5paymentMethod";
import Org_6paymentApply from "../OrderSheet_pg/Org_6paymentApply";
import Ue_loadingUrlData from "./Ue_loadingUrlData";

export default function App() {
  const isMobile = useIsMobile();
  return (
    <>
      <Ue_loadingUrlData />
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
