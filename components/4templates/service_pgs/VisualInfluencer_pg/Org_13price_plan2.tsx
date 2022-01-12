import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "/home/app/components/common/Layout";
import Org_price_plan2 from "./Org_price_plan2";
import { ItemClass, serviceDatasVar } from "./Var_serviceDatas";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import Mol_goToPaymentPg_Btn from "./Mol_goToPaymentPg_Btn";

const menuClickToggle = (id: number) => {
  const newServiceDatasVar = [...serviceDatasVar()];
  const clickedNewServiceDatasVar = newServiceDatasVar.map((val, idx) =>
    idx === id ? { ...val, isClicked: true } : { ...val, isClicked: false }
  );
  serviceDatasVar(clickedNewServiceDatasVar);
};

export default function App() {
  const isMobile = useReactiveVar(isMobileVar);
  const serviceReactiveVar = useReactiveVar(serviceDatasVar);
  const services = serviceReactiveVar.map((val, idx) => new ItemClass(val));

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
            <Mol_goToPaymentPg_Btn />
          </div>
          <div className="mb-4"></div>
        </section>
      )}
    </>
  );
}
