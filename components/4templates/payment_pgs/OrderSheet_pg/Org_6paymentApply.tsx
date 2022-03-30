import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalTemplete, PrivacyTerms, useTerms } from "./const_terms";
import Modal_tems from "./Modal_tems";
import Mol_formApplyBtn from "./Mol_formApplyBtn";
import { paymentMethodAtom } from "./Org_5paymentMethod";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = [
  <div className="flex" key={1}>
    <Modal_tems data={modalTemplete(useTerms)} />
    <div className="ml-1">동의</div>
  </div>,
  <div className="flex" key={2}>
    <Modal_tems data={modalTemplete(PrivacyTerms)} />
    <div className="ml-1">동의</div>
  </div>,
  <div className="flex" key={3}>
    <div>구매확인 동의</div>
  </div>,
];

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  const [paymentAgreement, setPaymentAgreement] = useState(false);
  const paymentAgreementToggle = () => {
    setPaymentAgreement((state) => !state);
  };

  const [paymentMethod, setPaymentMethod] = useRecoilState(paymentMethodAtom);

  return isMobile ? (
    <>
      <div className="w-11/12 max-w-xs mx-auto my-10">
        <div
          className="w-max flex items-center mb-4 cursor-pointer"
          onClick={paymentAgreementToggle}
        >
          <span className="mr-2 text-xl text-orange-500 ">
            {paymentAgreement ? (
              <i className="far fa-check-square"></i>
            ) : (
              <i className="far fa-square"></i>
            )}
          </span>
          <span>주문 내용 확인 및 결제 동의</span>
        </div>
        <ul className=" text-orange-500">
          {data.map((val, idx) => (
            <li key={idx} className="flex ml-px">
              {paymentAgreement ? (
                <div className="w-6 text-sm">
                  <i className="fas fa-check"></i>
                </div>
              ) : (
                <div className="w-6"> </div>
              )}
              {val}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4"></div>

      <div className="center mb-16">
        <Mol_formApplyBtn trigger={paymentAgreement} />
      </div>
    </>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <div className=" border-2 px-10 py-8">
      <div className="mb-10">
        <div
          className="w-max flex items-center mb-4 cursor-pointer"
          onClick={paymentAgreementToggle}
        >
          <span className="mr-2 text-xl text-orange-500 ">
            {paymentAgreement ? (
              <i className="far fa-check-square"></i>
            ) : (
              <i className="far fa-square"></i>
            )}
          </span>
          <span>주문 내용 확인 및 결제 동의</span>
        </div>
        <ul className=" text-orange-500">
          {data.map((val, idx) => (
            <li key={idx} className="flex ml-px">
              {paymentAgreement ? (
                <div className="w-6 text-sm">
                  <i className="fas fa-check"></i>
                </div>
              ) : (
                <div className="w-6"> </div>
              )}
              {val}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4"></div>

      <div className="center mb-4">
        <Mol_formApplyBtn trigger={paymentAgreement} />
      </div>
    </div>
  );
}
