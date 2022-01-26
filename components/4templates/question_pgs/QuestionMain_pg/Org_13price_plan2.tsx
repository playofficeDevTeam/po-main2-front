import useIsMobile from "../../../hooks/useIsMobile";
import Mol_goToPaymentPg_Btn from "../../service_pgs/VisualInfluencer_pg/Mol_goToPaymentPg_Btn";
import Org_price_plan2 from "../../service_pgs/VisualInfluencer_pg/Org_price_plan2";
import Mol_goToQuestionFormPg_Btn from "./Mol_goToQuestionFormPg_Btn";

export default function App() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <section className="pt-20 pb-5 bg-gray-50">
          <h1 className="mo-max mo-h1 text-center mb-10">
            성장 로켓에 <br />
            올라타고 성과를 높이세요.
          </h1>
          <Org_price_plan2 />
          <div className="mb-20"></div>
        </section>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <section className="pt-20 pb-1 bg-gray-50">
          <h1 className="pc-h1 pc-max text-center mb-6  ">
            성장 로켓에 <br />
            올라타고 성과를 높이세요.
          </h1>
          <Org_price_plan2 />
          <div className="center pt-4 pb-8">
            <Mol_goToQuestionFormPg_Btn />
          </div>
          <div className="mb-4"></div>
        </section>
      )}
    </>
  );
}
