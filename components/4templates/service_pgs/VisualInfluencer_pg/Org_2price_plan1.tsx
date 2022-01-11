import { makeVar, useReactiveVar } from "@apollo/client";
import { validateSDL } from "graphql/validation/validate";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { isMobileVar } from "/home/app/components/common/Layout";

interface IItem {
  hightlighted: boolean;
  serviceName: string;
  itemName: string;
  detailInfo: Array<object>;
  price: number;
  sale: boolean;
  discountRate: number;
  amountOfItems: number;
  isClicked: boolean;
}

export class ItemClass {
  constructor(public input: IItem) {
    this.input = input;
  }
  public numberToWon(number: number) {
    const won = number.toLocaleString("ko-KR") + "원";
    return won;
  }
  public priceTotal = this.input.price * this.input.amountOfItems;

  public priceTotal_won = this.numberToWon(
    this.input.price * this.input.amountOfItems
  );

  public priceDiscounted_won = this.numberToWon(
    Math.ceil((this.priceTotal * (100 - this.input.discountRate)) / 100)
  );

  public priceDivided_won = this.numberToWon(
    Math.ceil((this.priceTotal * (100 - this.input.discountRate)) / 100 / 6)
  );

  public detailInfoText = this.input.detailInfo.map(
    (val: any) => val.title + " " + val.amountText
  );
}

const serviceDatas = [
  {
    hightlighted: false,
    serviceName: "비주얼 인플루언서 마케팅",
    itemName: "크리에이티브 10",
    detailInfo: [
      { title: "브랜드 제품 소개 영상", amountText: "10개", amount: 10 },
      { title: "브랜드 제품 소개 이미지", amountText: "20개", amount: 20 },
      {
        title: "인스타그램 브랜드 소개 게시물",
        amountText: "10개",
        amount: 10,
      },
      { title: "콘텐츠 활용 라이센스", amountText: "포함", amount: 1 },
    ],
    price: 1100000,
    sale: false,
    discountRate: 0,
    amountOfItems: 1,
    isClicked: false,
  },
  {
    hightlighted: true,
    serviceName: "비주얼 인플루언서 마케팅",
    itemName: "크리에이티브 20",
    detailInfo: [
      { title: "브랜드 제품 소개 영상", amountText: "20개", amount: 20 },
      { title: "브랜드 제품 소개 이미지", amountText: "40개", amount: 40 },
      {
        title: "인스타그램 브랜드 소개 게시물",
        amountText: "20개",
        amount: 20,
      },
      { title: "콘텐츠 활용 라이센스", amountText: "포함", amount: 1 },
    ],
    price: 2200000,
    sale: true,
    discountRate: 5,
    amountOfItems: 1,
    isClicked: true,
  },
  {
    hightlighted: false,
    serviceName: "비주얼 인플루언서 마케팅",
    itemName: "크리에이티브 30",
    detailInfo: [
      { title: "브랜드 제품 소개 영상", amountText: "30개", amount: 30 },
      { title: "브랜드 제품 소개 이미지", amountText: "60개", amount: 60 },
      {
        title: "인스타그램 브랜드 소개 게시물",
        amountText: "30개",
        amount: 30,
      },
      { title: "콘텐츠 활용 라이센스", amountText: "포함", amount: 1 },
    ],
    price: 3300000,
    sale: true,
    discountRate: 10,
    amountOfItems: 1,
    isClicked: false,
  },
];

export const serviceDatasVar = makeVar(serviceDatas);

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
            <RoundedOrangeBtn onClick={() => {}}>
              <div className="flex items-center">
                <img
                  src="/assets/서비스_비주얼/아이콘/shuttle 2.png"
                  alt="바로 진행하기"
                  className="mr-2 h-5/6"
                />
                <span className="">바로 진행하기</span>
              </div>
            </RoundedOrangeBtn>
          </div>
        </section>
      )}
    </>
  );
}
