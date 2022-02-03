import { useRecoilState, useRecoilValue } from "recoil";
import useIsMobile from "../../../hooks/useIsMobile";
import {
  serviceClickToggle,
  serviceDatasAtom,
  serviceDatasClass,
} from "./Var_serviceDatas";

export default function App() {
  const isMobile = useIsMobile();

  const [serviceDatasState, setServiceDatasState] =
    useRecoilState(serviceDatasAtom);
  const services = useRecoilValue(serviceDatasClass);

  return (
    <>
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <section className="">
          <ul className="mo-max">
            {services.map((service, serviceIdx) =>
              service.input.isClicked ? (
                // 선택시
                <li
                  key={serviceIdx}
                  className="my-4 ring-2 ring-indigo-400 rounded-md bg-white cursor-pointer pt-6"
                  onClick={() => {
                    serviceClickToggle(serviceIdx, setServiceDatasState);
                  }}
                >
                  {service.input.hightlighted ? (
                    <div className="mb-1 px-4">
                      <span>🔥 </span>
                      <span className=" font-bold text-sm text-orange-500">
                        많은 기업이 가장 좋은 성과를 낸 플랜이에요
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="mb-6 px-4">
                    <span>📌 </span>
                    <span className=" text-lg font-bold">
                      {service.input.itemName}
                    </span>
                  </div>
                  <div className="mb-6 px-4">
                    {service.detailInfoText_check1.map(
                      (detailInfo, detailInfoIdx) => (
                        <li key={detailInfoIdx}>{detailInfo}</li>
                      )
                    )}
                  </div>
                  <div className="flex  justify-between  text-gray-600 mb-6  px-4">
                    <div className="flex items-end">총 서비스 금액</div>
                    <div className="flex flex-col justify-end items-end">
                      {service.input.discount ? (
                        <div className="text-sm font-bold text-gray-400">
                          <span className=" ">
                            {"(" + service.input.discountRate + "% 할인) "}
                          </span>
                          <span className=" line-through">
                            {service.priceTotal_won}
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className=" font-bold">
                        {service.priceDiscounted_won}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-b-md text-white py-3 flex justify-between text-lg text-shadow-sm">
                    <div className="">6개월 할부시</div>
                    <div className=" font-bold">
                      {"월 " + service.priceDivided_won}
                    </div>
                  </div>
                </li>
              ) : (
                // 비선택시
                <li
                  key={serviceIdx}
                  className="my-4 ring-2 ring-gray-400 rounded-md bg-white cursor-pointer pt-6 opacity-50"
                  onClick={() => {
                    serviceClickToggle(serviceIdx, setServiceDatasState);
                  }}
                >
                  {service.input.hightlighted ? (
                    <div className="mb-1 px-4">
                      <span>🔥 </span>
                      <span className=" font-bold text-sm text-orange-500">
                        많은 기업이 가장 좋은 성과를 낸 플랜이에요
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="mb-6 px-4">
                    <span>📌 </span>
                    <span className=" text-lg font-bold">
                      {service.input.itemName}
                    </span>
                  </div>
                  <div className="mb-6 px-4">
                    {service.detailInfoText_check1.map(
                      (detailInfo, detailInfoIdx) => (
                        <li key={detailInfoIdx}>{detailInfo}</li>
                      )
                    )}
                  </div>
                  <div className="flex  justify-between  text-gray-600 mb-6  px-4">
                    <div className="flex items-end">총 서비스 금액</div>
                    <div className="flex flex-col justify-end items-end">
                      {service.input.discount ? (
                        <div className="text-sm font-bold text-gray-400">
                          <span className=" ">
                            {"(" + service.input.discountRate + "% 할인) "}
                          </span>
                          <span className=" line-through">
                            {service.priceTotal_won}
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className=" font-bold">
                        {service.priceDiscounted_won}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-b-md text-white py-3 flex justify-between text-lg text-shadow-sm">
                    <div className="">6개월 할부시</div>
                    <div className=" font-bold">
                      {"월 " + service.priceDivided_won}
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
          <div className="mb-20"></div>
        </section>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <section className="">
          <ul className="pc-max grid grid-cols-3 gap-4">
            {services.map((service, serviceIdx) => (
              // 선택시
              <li
                key={serviceIdx}
                className={`my-4 ring-2  rounded-md bg-white cursor-pointer pt-6 flex flex-col justify-end ${
                  service.input.isClicked
                    ? "ring-indigo-400"
                    : "ring-gray-400 opacity-50"
                }`}
                onClick={() => {
                  serviceClickToggle(serviceIdx, setServiceDatasState);
                }}
              >
                {service.input.hightlighted ? (
                  <div className="mb-1 px-4">
                    <span>🔥 </span>
                    <span className=" font-bold text-sm text-orange-500">
                      많은 기업이 가장 좋은 성과를 낸 플랜이에요
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                <div className="mb-6 px-4">
                  <span>📌 </span>
                  <span className=" text-lg font-bold">
                    {service.input.itemName}
                  </span>
                </div>
                <div className="mb-6 px-4">
                  {service.detailInfoText_check1.map(
                    (detailInfo, detailInfoIdx) => (
                      <li key={detailInfoIdx}>{detailInfo}</li>
                    )
                  )}
                </div>
                <div className="flex  justify-between  text-gray-600 mb-6  px-4 h-12">
                  <div className="flex items-end">총 서비스 금액</div>
                  <div className="flex flex-col justify-end items-end">
                    {service.input.discount ? (
                      <div className="text-sm font-bold text-gray-400">
                        <span className=" ">
                          {"(" + service.input.discountRate + "% 할인) "}
                        </span>
                        <span className=" line-through">
                          {service.priceTotal_won}
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className=" font-bold">
                      {service.priceDiscounted_won}
                    </div>
                  </div>
                </div>
                <div className="px-4 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-b-md text-white py-3 flex justify-between text-lg text-shadow-sm">
                  <div className="">6개월 할부시</div>
                  <div className=" font-bold">
                    {"월 " + service.priceDivided_won}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
