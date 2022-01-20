import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Ani_box from "../../../1atoms/Ani_box";
import Br_mo from "../../../1atoms/Br_mo";
import {
  clickedServiceDataClass,
  serviceClickToggle,
  serviceDatasAtom,
  serviceDatasClass,
} from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: <>선택한 플랜</>,
  subtitle: <>비주얼 인플루언서 콘텐츠 마케팅</>,
  notice: (
    <>
      선택한 플랜 1개는
      <Br_mo />
      제품 1개를 기준으로 진행됩니다.
    </>
  ),
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  const [isServiceListOpened, setIsServiceListOpened] = useState(false);
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);
  const clickedServiceData = useRecoilValue(clickedServiceDataClass);

  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <>
      <div className="mo-max pt-10 pb-4">
        <div className=" max-w-xs mx-auto">
          <div className=" font-bold text-xl mb-7">{data.title}</div>
          <div className=" font-semibold text-xl mb-4">{data.subtitle}</div>
          <div className="flex">
            {/* 왼쪽 */}
            <div className="w-8/12 mr-3">
              <div
                className=" bg-gray-50 border-2 border-gray-300 rounded-md px-3 py-1 relative z-10 flex justify-between cursor-pointer "
                onClick={() => {
                  setIsServiceListOpened((val) => !val);
                }}
              >
                <div className="">
                  <span className=" relative bottom-px mr-1">📌</span>
                  <span className=" font-bold">
                    {clickedServiceData?.input.itemName}
                  </span>
                </div>
                <span>
                  {isServiceListOpened ? (
                    <i className="fas fa-angle-up"></i>
                  ) : (
                    <i className="fas fa-angle-down"></i>
                  )}
                </span>
              </div>
              {/* 숨겨진박스 */}
              <Ani_box trigger={isServiceListOpened} className="mx-1">
                <ul className="px-3 pt-3 pb-3">
                  {serviceDataState.map((val, idx) => (
                    <li
                      key={idx}
                      className=" font-bold py-1 center cursor-pointer"
                      onClick={() => {
                        serviceClickToggle(idx, setServiceDataState);
                        setIsServiceListOpened(false);
                      }}
                    >
                      {val.itemName}
                    </li>
                  ))}
                </ul>
              </Ani_box>
            </div>
            {/* 오른쪽 */}
            <div className="w-4/12">
              <div className="bg-gray-50 border-2 border-gray-300 rounded-md px-2 py-1 relative z-10 flex justify-between ">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setServiceDataState((services) =>
                      services.map((service) => ({
                        ...service,
                        amountOfItems:
                          service.amountOfItems > 1
                            ? service.amountOfItems - 1
                            : service.amountOfItems,
                      }))
                    );
                  }}
                >
                  －
                </div>

                <div className=" font-bold">
                  <span>{clickedServiceData?.input.amountOfItems}</span>
                  <span>개</span>
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setServiceDataState((services) =>
                      services.map((service) => ({
                        ...service,
                        amountOfItems:
                          service.amountOfItems < 10
                            ? service.amountOfItems + 1
                            : service.amountOfItems,
                      }))
                    );
                  }}
                >
                  ＋
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 max-w-xs mx-auto text-sm text-gray-500 font-medium">
        {data.notice}
      </div>
      {/* 디테일정보 */}
      <div className=" my-7">
        <div className="mo-max bg-gray-50 rounded-t-xl px-3 pt-4 pb-8 ">
          <div className=" max-w-xs mx-auto">
            <ul>
              {clickedServiceData?.input.detailInfo.map((val, idx) => (
                <li key={idx} className="flex justify-between py-2">
                  <div className=" font-medium text-gray-700 flex items-end pb-px">
                    {val.title}
                  </div>
                  {/* 수량 */}
                  <div className="text-gray-500">
                    <span className="text-lg font-bold ">
                      {val.amountText}{" "}
                    </span>
                    <span>{clickedServiceData.multipleAmountText(idx)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-5"></div>
          <div className="border-b-2 border-dashed border-gray-400"></div>
          <div className="mb-5"></div>

          <div className="max-w-xs mx-auto flex items-end justify-between text-gray-500 py-2">
            <div className="">
              총{" "}
              <span className=" font-bold text-gray-600">
                {clickedServiceData?.input.amountOfItems}개
              </span>{" "}
              서비스 금액
            </div>
            <div className="flex flex-col items-end">
              {clickedServiceData?.input.discount ? (
                <div className=" text-sm">
                  <span>
                    {`(${clickedServiceData?.input.discountRate}% 할인) `}
                  </span>
                  <span className=" line-through">
                    {clickedServiceData?.priceTotal_won}
                  </span>
                </div>
              ) : (
                <></>
              )}
              <div className=" text-lg font-bold text-gray-700">
                {clickedServiceData?.priceDiscounted_won}
              </div>
            </div>
          </div>
        </div>

        <div className="mo-max bg-gradient-to-r from-indigo-400 to-blue-300 rounded-xl px-3 py-5 relative bottom-4 ">
          <div className="  max-w-xs mx-auto flex justify-between">
            <div className=" text-lg text-white text-shadow-sm flex items-end">
              6개월 할부 시
            </div>
            <div className=" text-xl font-bold text-white text-shadow-sm flex items-end">
              월 {clickedServiceData?.priceDivided_won}
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
    <div className="pc-max border-2">
      <div className=" p-10 py-8">
        <div className="">
          <div className="  mx-auto">
            <div className=" font-bold text-xl mb-7">{data.title}</div>
            <div className=" font-semibold text-xl mb-4">{data.subtitle}</div>
            <div className="flex w-7/12">
              {/* 왼쪽 */}
              <div className="w-8/12 mr-3">
                <div
                  className=" bg-gray-50 border-2 border-gray-300 rounded-md px-3 py-1 relative z-10 flex justify-between cursor-pointer "
                  onClick={() => {
                    setIsServiceListOpened((val) => !val);
                  }}
                >
                  <div className="">
                    <span className=" relative bottom-px mr-1">📌</span>
                    <span className=" font-bold">
                      {clickedServiceData?.input.itemName}
                    </span>
                  </div>
                  <span>
                    {isServiceListOpened ? (
                      <i className="fas fa-angle-up"></i>
                    ) : (
                      <i className="fas fa-angle-down"></i>
                    )}
                  </span>
                </div>
                {/* 숨겨진박스 */}
                <Ani_box trigger={isServiceListOpened} className="mx-1">
                  <ul className="px-3 pt-3 pb-3">
                    {serviceDataState.map((val, idx) => (
                      <li
                        key={idx}
                        className=" font-bold py-1 center cursor-pointer"
                        onClick={() => {
                          serviceClickToggle(idx, setServiceDataState);
                          setIsServiceListOpened(false);
                        }}
                      >
                        {val.itemName}
                      </li>
                    ))}
                  </ul>
                </Ani_box>
              </div>
              {/* 오른쪽 */}
              <div className="w-4/12">
                <div className="bg-gray-50 border-2 border-gray-300 rounded-md px-2 py-1 relative z-10 flex justify-between ">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setServiceDataState((services) =>
                        services.map((service) => ({
                          ...service,
                          amountOfItems:
                            service.amountOfItems > 1
                              ? service.amountOfItems - 1
                              : service.amountOfItems,
                        }))
                      );
                    }}
                  >
                    －
                  </div>

                  <div className=" font-bold">
                    <span>{clickedServiceData?.input.amountOfItems}</span>
                    <span>개</span>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setServiceDataState((services) =>
                        services.map((service) => ({
                          ...service,
                          amountOfItems:
                            service.amountOfItems < 10
                              ? service.amountOfItems + 1
                              : service.amountOfItems,
                        }))
                      );
                    }}
                  >
                    ＋
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 디테일정보 */}
        <div className=" mt-7">
          <div className="">
            <div className="">
              <ul>
                {clickedServiceData?.input.detailInfo.map((val, idx) => (
                  <li key={idx} className="flex py-2">
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
          </div>
        </div>
      </div>

      <div className="text-gray-500 py-6 px-10 bg-gray-50 border-t-2">
        {data.notice}
      </div>
    </div>
  );
}
