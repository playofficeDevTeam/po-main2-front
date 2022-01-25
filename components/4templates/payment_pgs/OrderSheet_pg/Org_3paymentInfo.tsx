import { useRecoilState, useRecoilValue } from "recoil";
import {
  clickedServiceDataClass,
  serviceDatasAtom,
  serviceDatasClass,
} from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);
  const ServiceDataClass = useRecoilValue(serviceDatasClass);
  const clickedServiceData = useRecoilValue(clickedServiceDataClass);
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <>
      <div className=" max-w-xs w-11/12 mx-auto my-10">
        <div className=" text-xl font-bold mb-5">결제 안내</div>
        <div className=" font-medium">
          <div className="flex justify-between">
            <div className=" text-gray-600">공급가액</div>
            <div className="">{clickedServiceData?.priceRaw_won}</div>
          </div>
          <div className="flex justify-between">
            <div className=" text-gray-700">부가세</div>
            <div className="">{clickedServiceData?.priceTax_won}</div>
          </div>
          {clickedServiceData?.input.discount ? (
            <div className="flex justify-between text-orange-500">
              <div className=" ">
                할인액 {`(-${clickedServiceData.input.discountRate}%)`}
              </div>
              <div className="">- {clickedServiceData?.discount_won}</div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="border-b-4 pb-3 mb-3"></div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-end items-end text-lg font-bold">
            총 결제금액
          </div>
          <div className="flex flex-col justify-end items-end">
            <div className=" text-sm font-bold  text-gray-400">
              6개월 할부 시 월 {clickedServiceData?.priceDivided_won}
            </div>
            <div className=" text-2xl font-bold text-blue-700">
              {clickedServiceData?.priceDiscounted_won}
            </div>
          </div>
        </div>
      </div>
      <div className=" border-b-4"></div>
    </>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <>
      <div className=" border-2 px-10 py-8">
        <div className=" text-xl font-bold mb-6">결제 안내</div>
        <div className=" font-medium">
          <div className="flex justify-between items-end mb-2">
            <div className=" text-gray-600">공급가액</div>
            <div className=" font-bold text-lg">
              {clickedServiceData?.priceRaw_won}
            </div>
          </div>
          <div className="flex justify-between items-end mb-2">
            <div className=" text-gray-700">부가세</div>
            <div className="font-bold text-lg">
              {clickedServiceData?.priceTax_won}
            </div>
          </div>
          {clickedServiceData?.input.discount ? (
            <div className="flex justify-between items-end mb-2 text-orange-500">
              <div className=" ">
                할인액 {`(-${clickedServiceData.input.discountRate}%)`}
              </div>
              <div className="font-bold text-lg">
                - {clickedServiceData?.discount_won}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="border-b-4 pb-4 mb-7"></div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col justify-end items-end text-lg font-bold">
            총 결제금액
          </div>
          <div className="flex flex-col justify-end items-end">
            <div className=" text-sm font-bold  text-gray-400">
              6개월 할부 시 월 {clickedServiceData?.priceDivided_won}
            </div>
            <div className=" text-2xl font-bold text-blue-700">
              {clickedServiceData?.priceDiscounted_won}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
