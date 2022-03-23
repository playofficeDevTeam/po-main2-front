import { useRecoilState, useRecoilValue } from "recoil";
import useIsMobile from "../../../hooks/useIsMobile";
import Mol_goToPaymentPg_Btn from "./Mol_goToPaymentPg_Btn";
import {
  ItemClass,
  serviceClickToggle,
  serviceDatas,
  serviceDatasAtom,
  serviceDatasClass,
} from "./Var_serviceDatas";

export default function App() {
  const isMobile = useIsMobile();

  const [serviceDatasState, setServiceDatasState] =
    useRecoilState(serviceDatasAtom);
  const services = useRecoilValue(serviceDatasClass);
  const indexOfClickedService = services.findIndex(
    (val) => val.input.isClicked
  );

  const rawServices = serviceDatas;
  const rawServicesClass = rawServices.map((val) => new ItemClass(val));

  return (
    <>
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <section className="mo-max my-16" style={{ height: "530px" }}>
          <ul className="">
            {rawServicesClass.map((service, serviceIdx) =>
              serviceIdx >= 0 &&
              serviceIdx < 3 &&
              serviceIdx === indexOfClickedService ? (
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
                  <ul className="mb-6 px-4">
                    {service.detailInfoText_check1.map(
                      (detailInfo, detailInfoIdx) => (
                        <li key={detailInfoIdx}>{detailInfo}</li>
                      )
                    )}
                  </ul>
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
                  className="my-4 ring-2 ring-gray-200 rounded-md px-4 py-6 bg-white cursor-pointer"
                  onClick={() => {
                    serviceClickToggle(serviceIdx, setServiceDatasState);
                  }}
                >
                  <div className="  ">
                    {service.input.hightlighted ? (
                      <div className="mb-1">
                        <span>🔥 </span>
                        <span className=" font-bold text-sm text-orange-500">
                          많은 기업이 가장 좋은 성과를 낸 플랜이에요
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="">
                      <span>📌 </span>
                      <span className=" text-lg font-bold">
                        {service.input.itemName}
                      </span>
                    </div>
                    <div className="text-gray-600 font-bold">
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
        <section className="mo-max">
          <ul className="">
            {rawServicesClass.map((service, serviceIdx) =>
              serviceIdx >= 0 &&
              serviceIdx < 3 &&
              serviceIdx === indexOfClickedService ? (
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
                  <ul className="mb-6 px-4">
                    {service.detailInfoText_check1.map(
                      (detailInfo, detailInfoIdx) => (
                        <li key={detailInfoIdx}>{detailInfo}</li>
                      )
                    )}
                  </ul>
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
                  className="my-4 ring-2 ring-gray-200 rounded-md px-4 py-6 bg-white cursor-pointer"
                  onClick={() => {
                    serviceClickToggle(serviceIdx, setServiceDatasState);
                  }}
                >
                  <div className="  ">
                    {service.input.hightlighted ? (
                      <div className="mb-1">
                        <span>🔥 </span>
                        <span className=" font-bold text-sm text-orange-500">
                          많은 기업이 가장 좋은 성과를 낸 플랜이에요
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="">
                      <span>📌 </span>
                      <span className=" text-lg font-bold">
                        {service.input.itemName}
                      </span>
                    </div>
                    <div className="text-gray-600 font-bold">
                      {"월 " + service.priceDivided_won}
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
          <div className="mb-5"></div>
          <div className="flex justify-end">
            <Mol_goToPaymentPg_Btn />
          </div>
        </section>
      )}
    </>
  );
}
