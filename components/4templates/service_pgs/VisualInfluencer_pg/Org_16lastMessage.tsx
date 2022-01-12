import { useReactiveVar } from "@apollo/client";
import Br_mo from "../../../1atoms/Br_mo";
import { isMobileVar } from "../../../common/Layout";
import Mol_pricePlan_popup_Btn from "./Mol_pricePlan_popup_Btn";

export default function App() {
  const isMobile = useReactiveVar(isMobileVar);
  const data1 = [
    <>
      온라인에서
      <Br_mo />
      인상깊게 본 콘텐츠 10개 중<Br_mo />
      적어도 3개는 포케팅 작품입니다.
      <Br_mo />
      <br />
      매출 평균 11배 상승시킨 콘텐츠,
      <Br_mo />
      지금 성과를 높이세요.
    </>,
  ];
  return (
    <section
      className={` bg-gray-800 text-white ${isMobile ? "py-20" : "py-24"}`}
    >
      <div className="w-11/12 mx-auto text-center flex flex-col items-center">
        <div
          className={`font-bold mb-12 leading-normal ${
            isMobile ? "text-xl " : "text-2xl "
          }`}
        >
          {data1}
        </div>

        <Mol_pricePlan_popup_Btn />
      </div>
    </section>
  );
}
