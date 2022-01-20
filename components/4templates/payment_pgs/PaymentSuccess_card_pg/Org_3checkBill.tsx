import { useRecoilValue } from "recoil";
import IsMobile from "../../../1atoms/IsMobile";
import { clickedServiceDataClass } from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: <IsMobile mo={<>결제 정보</>} pc={<>결제 정보</>} />,
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  const clickedServiceData = useRecoilValue(clickedServiceDataClass);
  return isMobile ? (
    <>
      <div className="xs-max">
        <div className="mb-10"></div>
        <div className="font-bold text-xl">{data.title}</div>

        <div className="pb-5 mb-6 border-b-2"></div>

        <div className="py-1">
          <div className="font-bold text-lg mb-3">
            비주얼 인플루언서 콘텐츠 마케팅
          </div>
          <div className="font-bold text-lg mb-2">
            <span className=" font-normal">📌</span>
            {clickedServiceData?.input.itemName}{" "}
            <span className="text-base">
              {clickedServiceData?.multipleAmountText(0)}
            </span>
          </div>
          <ul>
            {clickedServiceData?.input.detailInfo.map((val, idx) => (
              <li key={idx} className="flex mb-px">
                <div className="mr-2 text-gray-300">
                  <i className="fas fa-check"></i>
                </div>
                <div className=" font-medium text-gray-600 flex items-end pb-px mr-2">
                  {val.title}
                </div>
                {/* 수량 */}
                <div className="font-medium text-gray-600 ">
                  <span className=" ">{val.amountText} </span>
                  <span>{clickedServiceData.multipleAmountText(idx)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="pb-6 mb-6 border-b-2"></div>

        <div className="my-10">
          <div className=" text-xl font-bold mb-5">결제 금액</div>
          <div className="flex justify-end text-orange-500 text-sm font-medium mb-px">
            결제 완료
          </div>
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
              <div className=" text-2xl font-bold text-blue-700">
                {clickedServiceData?.priceTotal_won}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-b-4 border-dashed"></div>
    </>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <>
      <div className="pc-max border-2 px-10 py-8">
        <div className="font-bold text-xl">{data.title}</div>

        <div className="pb-5 mb-6 border-b-2"></div>

        <div className="py-1">
          <div className="font-bold text-lg mb-3">
            비주얼 인플루언서 콘텐츠 마케팅
          </div>
          <div className="font-bold text-lg mb-2">
            <span className=" font-normal">📌</span>
            {clickedServiceData?.input.itemName}{" "}
            <span className="text-base">
              {clickedServiceData?.multipleAmountText(0)}
            </span>
          </div>
          <ul className="grid grid-cols-2" style={{ width: "39rem" }}>
            {clickedServiceData?.input.detailInfo.map((val, idx) => (
              <li key={idx} className="flex mb-px">
                <div className="mr-2 text-gray-300">
                  <i className="fas fa-check"></i>
                </div>
                <div className=" font-medium text-gray-600 flex items-end pb-px mr-2">
                  {val.title}
                </div>
                {/* 수량 */}
                <div className="font-medium text-gray-600 ">
                  <span className=" ">{val.amountText} </span>
                  <span>{clickedServiceData.multipleAmountText(idx)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="pb-6 mb-6 border-b-2"></div>

        <div className="mt-10 mb-2">
          <div className=" text-xl font-bold ">결제 금액</div>
          <div className="flex justify-between">
            <div className="w-1/2 mr-16 font-medium">
              <div className="flex justify-between mb-1">
                <div className=" text-gray-600">공급가액</div>
                <div className="">{clickedServiceData?.priceRaw_won}</div>
              </div>
              <div className="flex justify-between">
                <div className=" text-gray-700 mb-1">부가세</div>
                <div className="">{clickedServiceData?.priceTax_won}</div>
              </div>
              {clickedServiceData?.input.discount ? (
                <div className="flex justify-between text-orange-500">
                  <div className="">
                    할인액 {`(-${clickedServiceData.input.discountRate}%)`}
                  </div>
                  <div className="">- {clickedServiceData?.discount_won}</div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="w-1/2 flex justify-between">
              <div className="flex flex-col justify-end items-end text-lg font-bold">
                총 결제금액
              </div>
              <div className="flex flex-col justify-end items-end">
                <div className=" text-2xl font-bold text-blue-700">
                  {clickedServiceData?.priceTotal_won}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
