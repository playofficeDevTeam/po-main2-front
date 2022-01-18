import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  const [isServiceListOpened, setIsServiceListOpened] = useState(false);
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);
  const ServiceDataClass = useRecoilValue(serviceDatasClass);
  const clickedServiceData = useRecoilValue(clickedServiceDataClass);

  return isMobile ? (
    <>
      <div className="mo-max py-8">
        <div className=" max-w-xs mx-auto">
          <div className=" font-bold text-xl mb-7">{data.title}</div>
          <div className=" font-bold text-xl mb-5">{data.subtitle}</div>
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
              <div className="h-0">
                <ul
                  className={`bg-white mx-1 px-3 pt-3 pb-3 border-2 relative ${
                    isServiceListOpened ? "" : "-translate-y-3"
                  }`}
                  style={
                    isServiceListOpened
                      ? {
                          opacity: "100%",
                          bottom: "0.2rem",
                          transition:
                            "bottom ease 0s 0s, opacity ease 0.2s, transform ease 0.2s ",
                        }
                      : {
                          opacity: "0%",
                          bottom: "10000rem",
                          transition:
                            " bottom ease 0s 0.2s,  opacity ease 0.2s, transform ease 0.2s ",
                        }
                  }
                >
                  {serviceDataState.map((val, idx) => (
                    <li
                      key={idx}
                      className=" font-bold py-1 center"
                      onClick={() => {
                        serviceClickToggle(idx, setServiceDataState);
                        setIsServiceListOpened(false);
                      }}
                    >
                      {val.itemName}
                    </li>
                  ))}
                </ul>
              </div>
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
                        amountOfItems: service.amountOfItems + 1,
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
    </>
  ) : (
    <></>
  );
}
