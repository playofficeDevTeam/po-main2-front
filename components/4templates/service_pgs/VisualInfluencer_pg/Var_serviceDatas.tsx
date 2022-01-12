import { makeVar } from "@apollo/client";

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
