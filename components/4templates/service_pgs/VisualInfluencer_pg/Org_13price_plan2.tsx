import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "/home/app/components/common/Layout";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { serviceDatasVar } from "./Org_2price_plan1";
import Org_price_plan2 from "./Org_price_plan2";

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
        <section className="pt-20 pb-5 bg-gray-50">
          <h1 className="mo-max mo-h1 text-center mb-10">
            성장 로켓에 <br />
            올라타고 성과를 높이세요.
          </h1>
          <Org_price_plan2 />
          <div className="mb-20"></div>
        </section>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <section className="pt-10 pb-1 bg-gray-50">
          <h1 className="pc-h1 pc-max text-center mb-14  ">
            성장 로켓에 <br />
            올라타고 성과를 높이세요.
          </h1>
          <Org_price_plan2 />
        </section>
      )}
    </>
  );
}
