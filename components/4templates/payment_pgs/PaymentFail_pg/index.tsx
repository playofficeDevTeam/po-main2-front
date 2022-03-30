import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import ShutdownChanneltalk from "../../../2molecules/ShutdownChanneltalk";
import { isVisibleFooterAtom } from "../../../3organisms/Org_footer";
import { isVisibleHeaderAtom } from "/home/app/components/3organisms/Org_header/Org_header";
import ScrollLock from "../../../effects/ScrollLock";
import OrderSheet_pg from "../OrderSheet_pg";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  const router = useRouter();

  const clickedPaymentMethod =
    window.localStorage.getItem("clickedPaymentMethod") ?? "";

  const paymentResponse = JSON.parse(
    window.localStorage.getItem("paymentResponse") ??
      JSON.stringify({ code: "unknown error", message: "일시적인 오류" })
  );

  const temData = {
    title: (
      <>
        <span className=" text-orange-500">결제처리에 실패하여</span> <br />
        <span>결제를 완료하지 못했습니다.</span>
      </>
    ),
    content1: (
      <>
        <span>결제실패 </span> <span>{clickedPaymentMethod}</span> <br />
        <span>[ 실패사유 : {paymentResponse.message} ]</span>
      </>
    ),
    content2: (
      <>
        재시도를 하시거나 계속해서 오류가 발생할 경우
        <br />
        해당 카드사 또는 은행으로 문의 주시기 바랍니다
      </>
    ),
  };
  return (
    <>
      <ShutdownChanneltalk />
      <ScrollLock />
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <>
          <div className="fixed h-0 w-full" style={{ zIndex: 1100 }}>
            <div className="center " style={{ height: "90vh" }}>
              <div className="mo-max p-2 bg-gray-100 rounded-lg">
                <div className="bg-white p-4 rounded-lg">
                  <div className=" text-center mo-h1">{temData.title}</div>

                  <div className="my-4 border-b-2 border-dashed"></div>

                  <div className=" text-center font-bold text-lg text-orange-500">
                    {temData.content1}
                  </div>

                  <div className="my-4 border-b-2 border-dashed"></div>

                  <div className="text-center text-sm text-gray-400">
                    {temData.content2}
                  </div>
                </div>
                <div className="center mt-3 mb-2">
                  <RoundedOrangeBtn
                    onClick={() => {
                      router.push("/order-sheet");
                    }}
                  >
                    <div className="center text-lg">앗, 다시 진행해보기</div>
                  </RoundedOrangeBtn>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <>
          <div className="fixed h-0 w-full" style={{ zIndex: 1100 }}>
            <div className="center " style={{ height: "90vh" }}>
              <div className="mo-max p-2 bg-gray-100 rounded-lg">
                <div className="bg-white p-4 rounded-lg">
                  <div className=" text-center mo-h1">{temData.title}</div>

                  <div className="my-4 border-b-2 border-dashed"></div>

                  <div className=" text-center font-bold text-lg text-orange-500">
                    {temData.content1}
                  </div>

                  <div className="my-4 border-b-2 border-dashed"></div>

                  <div className="text-center text-sm text-gray-400">
                    {temData.content2}
                  </div>
                </div>
                <div className="center mt-3 mb-2">
                  <RoundedOrangeBtn
                    onClick={() => {
                      router.push("/order-sheet");
                    }}
                  >
                    <div className="center text-lg">앗, 다시 진행해보기</div>
                  </RoundedOrangeBtn>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className="fixed -top-20 bg-gray-800 opacity-30"
        style={{ width: "100vw", height: "200vh", zIndex: 1000 }}
      ></div>

      <OrderSheet_pg />
    </>
  );
}
