import { makeVar, useReactiveVar } from "@apollo/client";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import Mol_goToPaymentPg_Btn from "./Mol_goToPaymentPg_Btn";
import { ItemClass, serviceDatasVar } from "./Var_serviceDatas";
import { isMobileVar } from "/home/app/components/common/Layout";

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
        <section className="mo-max">
          <ul className="">
            {services.map((service, serviceIdx) =>
              service.input.isClicked ? (
                // 선택시
                <li
                  key={serviceIdx}
                  className="my-4 ring-2 ring-indigo-400 rounded-md bg-white cursor-pointer pt-6"
                  onClick={() => {
                    menuClickToggle(serviceIdx);
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
                    {service.detailInfoText.map((detailInfo, detailInfoIdx) => (
                      <li key={detailInfoIdx}>{"✅" + detailInfo}</li>
                    ))}
                  </div>
                  <div className="flex  justify-between  text-gray-600 mb-6  px-4">
                    <div className="flex items-end">총 서비스 금액</div>
                    <div className="flex flex-col justify-end items-end">
                      {service.input.sale ? (
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
                    menuClickToggle(serviceIdx);
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
            {services.map((service, serviceIdx) =>
              service.input.isClicked ? (
                // 선택시
                <li
                  key={serviceIdx}
                  className="my-4 ring-2 ring-indigo-400 rounded-md bg-white cursor-pointer pt-6"
                  onClick={() => {
                    menuClickToggle(serviceIdx);
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
                    {service.detailInfoText.map((detailInfo, detailInfoIdx) => (
                      <li key={detailInfoIdx}>{"✅" + detailInfo}</li>
                    ))}
                  </div>
                  <div className="flex  justify-between  text-gray-600 mb-6  px-4">
                    <div className="flex items-end">총 서비스 금액</div>
                    <div className="flex flex-col justify-end items-end">
                      {service.input.sale ? (
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
                    menuClickToggle(serviceIdx);
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
