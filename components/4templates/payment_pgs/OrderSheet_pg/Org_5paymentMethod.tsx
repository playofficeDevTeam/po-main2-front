import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: "결제 방법",
};

export const paymentMethodAtom = atom({
  key: "paymentMethodAtom",
  default: [
    {
      method: "카드 결제",
      selected: true,
    },
    {
      method: "무통장 입금",
      selected: false,
    },
  ],
});

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  const [paymentMethod, setPaymentMethod] = useRecoilState(paymentMethodAtom);
  const paymentMethodToggle = (id: number) => {
    setPaymentMethod((state) =>
      state.map((val, idx) =>
        idx === id ? { ...val, selected: true } : { ...val, selected: false }
      )
    );
  };

  return isMobile ? (
    <>
      <div className="w-11/12 max-w-xs mx-auto my-10">
        <div className=" text-xl font-bold mb-5">{data.title}</div>
        <ul className="flex ">
          {paymentMethod.map((val, idx) => (
            <li
              key={idx}
              className="flex items-center  cursor-pointer w-1/2 mr-5"
              onClick={() => {
                paymentMethodToggle(idx);
              }}
            >
              <span className="mr-2 text-xl text-orange-500 relative bottom-px mt-1">
                {val.selected ? (
                  <i className="far fa-check-square"></i>
                ) : (
                  <i className="far fa-square"></i>
                )}
              </span>
              <span className="text-lg font-medium">{val.method}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-b-4"></div>
    </>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <>
      <div className="border-2 px-10 py-8">
        <div className=" text-xl font-bold mb-5">{data.title}</div>
        <ul className="flex ">
          {paymentMethod.map((val, idx) => (
            <li
              key={idx}
              className="flex items-center  cursor-pointer w-1/2 mr-5"
              onClick={() => {
                paymentMethodToggle(idx);
              }}
            >
              <span className="mr-2 text-xl text-orange-500 relative bottom-px mt-1">
                {val.selected ? (
                  <i className="far fa-check-square"></i>
                ) : (
                  <i className="far fa-square"></i>
                )}
              </span>
              <span className="text-lg font-medium">{val.method}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
