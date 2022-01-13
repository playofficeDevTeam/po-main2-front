import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import useIsMobile from "../../../hooks/useIsMobile";
import Modal_payment from "./Modal_payment";
import Mol_goToPaymentPg_Btn from "./Mol_goToPaymentPg_Btn";
import Org_price_plan2 from "./Org_price_plan2";

export default function App() {
  const isMobile = useIsMobile();
  return (
    <>
      <Modal_payment
        data={{
          button: (
            <RoundedOrangeBtn>
              <>
                <img
                  src="assets/서비스_비주얼/아이콘/shuttle 2.png"
                  alt="바로 진행하기"
                  className="mr-3"
                />
                바로 진행하기
              </>
            </RoundedOrangeBtn>
          ),
          modal: (
            <>
              {isMobile ? (
                <></>
              ) : (
                <div className="pc-h1 text-center">캠페인 플랜 선택하기</div>
              )}
              <div className="py-5">
                <Org_price_plan2 />
              </div>
              <div
                className={`center relative ${isMobile ? "-top-16" : "pb-6"}`}
              >
                <Mol_goToPaymentPg_Btn />
              </div>
            </>
          ),
        }}
      />
    </>
  );
}
