import { atom, selector } from "recoil";

interface IItem {
  hightlighted: boolean;
  serviceName: string;
  itemName: string;
  detailInfo: Array<{ title: string; amountText: string; amount: number }>;
  price: number;
  discount: boolean;
  discountRate: number;
  amountOfItems: number;
  isClicked: boolean;
  serviceDefault: boolean;
}

export class ItemClass {
  constructor(public input: IItem) {
    this.input = input;
  }
  public numberToWon(number: number) {
    const won = number.toLocaleString("ko-KR") + "원";
    return won;
  }
  public priceTotal =
    this.input.price *
    (this.input.serviceDefault ? 1 : this.input.amountOfItems);

  public priceTotal_won = this.numberToWon(
    this.input.price * this.input.amountOfItems
  );

  public priceDiscounted_won = this.numberToWon(
    Math.ceil((this.priceTotal * (100 - this.input.discountRate)) / 100)
  );

  public priceDivided_won = this.numberToWon(
    Math.ceil((this.priceTotal * (100 - this.input.discountRate)) / 100 / 6)
  );

  public priceRaw_won = this.numberToWon(
    (this.input.price * this.input.amountOfItems) / 1.1
  );
  public priceTax_won = this.numberToWon(
    (this.input.price * this.input.amountOfItems) / 11
  );
  public discount_won = this.numberToWon(
    Math.ceil((this.priceTotal * this.input.discountRate) / 100)
  );

  public detailInfoText = this.input.detailInfo.map(
    (val) => val.title + " " + val.amountText
  );

  public multipleAmountText = (id) =>
    id !== 3 && this.input.amountOfItems !== 1
      ? `x${this.input.amountOfItems}`
      : "";

  public fullName = this.input.serviceName + " " + this.input.itemName;
}

const serviceDatas: IItem[] = [
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
    discount: false,
    discountRate: 0,
    amountOfItems: 1,
    isClicked: false,
    serviceDefault: false,
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
    discount: true,
    discountRate: 5,
    amountOfItems: 1,
    isClicked: true,
    serviceDefault: false,
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
    discount: true,
    discountRate: 10,
    amountOfItems: 1,
    isClicked: false,
    serviceDefault: false,
  },
];

export function serviceClickToggle(
  id: number,
  setServiceDatasState: (a) => void
) {
  setServiceDatasState((setServiceDatas) =>
    setServiceDatas.map((val, idx) =>
      idx === id ? { ...val, isClicked: true } : { ...val, isClicked: false }
    )
  );
}

export function decreaseServiceAmount(setServiceDataState: (a) => void) {
  setServiceDataState((services) =>
    services.map((service) => ({
      ...service,
      amountOfItems:
        service.amountOfItems > 1
          ? service.amountOfItems - 1
          : service.amountOfItems,
    }))
  );
}

export function increaseServiceAmount(setServiceDataState: (a) => void) {
  setServiceDataState((services) =>
    services.map((service) => ({
      ...service,
      amountOfItems:
        service.amountOfItems < 9
          ? service.amountOfItems + 1
          : service.amountOfItems,
    }))
  );
}

export const serviceDatasAtom = atom({
  key: "serviceDatasAtom",
  default: serviceDatas,
});

export const serviceDatasClass = selector({
  key: "serviceDatasClass",
  get: ({ get }) => {
    const serviceDatas = get(serviceDatasAtom);
    const serviceDatasClass = serviceDatas.map((val) => new ItemClass(val));
    return serviceDatasClass;
  },
});

export const clickedServiceData = selector({
  key: "clickedServiceData",
  get: ({ get }) => {
    const serviceDatas = get(serviceDatasAtom);
    const selectedServiceData = serviceDatas.find(
      (val) => val.isClicked === true
    );
    return selectedServiceData;
  },
});

export const clickedServiceDataClass = selector({
  key: "clickedServiceDataClass",
  get: ({ get }) => {
    const serviceDatas = get(serviceDatasAtom);
    const selectedServiceDatas = serviceDatas.find(
      (val) => val.isClicked === true
    );
    const selectedServiceDatasClass =
      selectedServiceDatas && new ItemClass(selectedServiceDatas);
    return selectedServiceDatasClass;
  },
});
