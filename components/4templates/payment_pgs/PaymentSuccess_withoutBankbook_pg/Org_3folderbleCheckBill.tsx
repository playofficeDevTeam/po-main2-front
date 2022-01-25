import { useState } from "react";
import Org_3checkBill from "../PaymentSuccess_card_pg/Org_3checkBill";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      결제 대기 중인 <br />
      항목을 확인하세요
    </>
  ),
  serviceName: <>비주얼 인플루언서 콘텐츠 마케팅</>,
};
export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  const [openState, setOpenState] = useState(false);

  return (
    <>
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <section className=" ">
          <div
            className=" border-t-4 border-b-4 py-2 cursor-pointer"
            onClick={() => {
              setOpenState((state) => !state);
            }}
          >
            <div className="xs-max flex justify-between items-center ">
              <div className="text-lg text-gray-500">의뢰내역 확인</div>
              <div className="mr-1 text-gray-500">
                {openState ? (
                  <i className="fas fa-chevron-up"></i>
                ) : (
                  <i className="fas fa-chevron-down"></i>
                )}
              </div>
            </div>
          </div>
          <div
            className={` overflow-y-hidden transition duration-200  ${
              openState
                ? "h-full translate-y-0 opacity-100"
                : "h-0 -translate-y-4 opacity-30"
            }`}
          >
            <Org_3checkBill data={data} />
          </div>
        </section>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <section className="h-full">
          <Org_3checkBill data={data} />
        </section>
      )}
    </>
  );
}
