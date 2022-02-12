import { atom, selector } from "recoil";

interface IItem {
  itemId: number;
  hightlighted: boolean;
  itemCategory1: string;
  itemName: string;
  detailInfo: Array<string>;
  price: number;
  discount: boolean;
  discountRate: number;
  amountOfItems: number;
  isClicked: boolean;
  isAmountFix: boolean;
}

export class ItemClass {
  constructor(public input: IItem) {
    this.input = input;
  }
  public numberToWon(number: number) {
    const won = number.toLocaleString("ko-KR") + "원";
    return won;
  }

  public amountFixCheck = this.input.isAmountFix ? 1 : this.input.amountOfItems;

  public priceTotal = this.input.price * this.amountFixCheck;
  public priceTotal_won = this.numberToWon(this.priceTotal);
  public priceDiscounted = Math.ceil(
    (this.priceTotal * (100 - this.input.discountRate)) / 100
  );
  public priceDiscounted_won = this.numberToWon(this.priceDiscounted);
  public priceDivided_won = this.numberToWon(
    Math.ceil((this.priceTotal * (100 - this.input.discountRate)) / 100 / 6)
  );
  public priceRaw_won = this.numberToWon(this.priceTotal / 1.1);
  public priceTax_won = this.numberToWon(this.priceTotal / 11);
  public discount_won = this.numberToWon(
    Math.ceil((this.priceTotal * this.input.discountRate) / 100)
  );

  public multipleAmountText = (id) =>
    id !== 3 && this.amountFixCheck !== 1 ? `x${this.amountFixCheck}` : "";

  public detailInfoText = this.input.detailInfo.map(
    (val, idx) => val + " " + this.multipleAmountText(idx)
  );

  public detailInfoText_check1 = this.detailInfoText.map((val, idx) => (
    <>
      <i className="fas fa-check text-green-600 opacity-80 mr-2"></i>
      <span>{val}</span>
    </>
  ));

  public fullName = this.input.itemCategory1 + " " + this.input.itemName;
}

const serviceDatas: IItem[] = [
  {
    itemId: 1,
    hightlighted: false,
    itemCategory1: "비주얼 인플루언서 마케팅",
    itemName: "크리에이티브 5",
    detailInfo: [
      "브랜드 제품 소개 영상 5개",
      "브랜드 제품 소개 이미지 10개",
      "인스타그램 브랜드 소개 게시물 5개",
      "콘텐츠 활용 라이센스 포함",
    ],
    price: 1100000,
    discount: false,
    discountRate: 0,
    amountOfItems: 1,
    isClicked: false,
    isAmountFix: false,
  },
  {
    itemId: 2,
    hightlighted: true,
    itemCategory1: "비주얼 인플루언서 마케팅",
    itemName: "크리에이티브 10",
    detailInfo: [
      "브랜드 제품 소개 영상 10개",
      "브랜드 제품 소개 이미지 20개",
      "인스타그램 브랜드 소개 게시물 10개",
      "콘텐츠 활용 라이센스 포함",
    ],
    price: 2200000,
    discount: true,
    discountRate: 5,
    amountOfItems: 1,
    isClicked: true,
    isAmountFix: false,
  },
  {
    itemId: 3,
    hightlighted: false,
    itemCategory1: "비주얼 인플루언서 마케팅",
    itemName: "크리에이티브 20",
    detailInfo: [
      "브랜드 제품 소개 영상 20개",
      "브랜드 제품 소개 이미지 40개",
      "인스타그램 브랜드 소개 게시물 20개",
      "콘텐츠 활용 라이센스 포함",
    ],
    price: 4400000,
    discount: true,
    discountRate: 10,
    amountOfItems: 1,
    isClicked: false,
    isAmountFix: false,
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
