import Link from "next/link";
import { useState } from "react";
import Br_pc from "../../../1atoms/Br_pc";
import useIsMobile from "../../../hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  const data1_raw = [
    {
      question: <>Q. 다른 브랜드 사례를 볼 수 있나요?</>,
      answer: (
        <>
          A. 네, 어떻게 성과를 냈는지 직접 확인하실 수 있습니다.
          <Link href="/costomer-story/visual-influencer">
            <span className="ml-2 text-blue-600">확인하러 가기 →</span>
          </Link>
        </>
      ),
      clicked: false,
    },
    {
      question: <>Q. 영상/이미지는 따로 받을 수 있나요?</>,
      answer: (
        <>
          A. 캠페인이 종료되면 최종리포트와 함께 바로 사용하실 수 있도록
          제공됩니다.
        </>
      ),
      clicked: false,
    },
    {
      question: <>Q. 매장홍보도 가능한가요?</>,
      answer: (
        <>
          A. 매장홍보는 불가능하며, 온라인 주문을 통해 택배 배송이 가능한 제품을{" "}
          <Br_pc />
          전문적으로 진행 해드립니다.
        </>
      ),
      clicked: false,
    },
    {
      question: <>Q. 제품을 회수 할 수도 있나요?</>,
      answer: (
        <>
          A. 회수는 불가능합니다. 크리에이터가 직접 사용하고 제품의 매력을
          콘텐츠로 제작하게 됩니다.
        </>
      ),
      clicked: false,
    },
  ];
  const [data1, setdata1] = useState(data1_raw);
  const data1ClickToggle = (id: number) => {
    const newData1 = data1.map((val, idx) =>
      idx === id
        ? { ...val, clicked: !val.clicked }
        : { ...val, clicked: false }
    );
    setdata1(newData1);
  };
  return (
    <section className="py-20">
      <div className={` ${isMobile ? "mo-max " : "pc-max"}`}>
        <div className={`text-center mb-10 ${isMobile ? "mo-h1" : "pc-h1"}`}>
          FAQ
        </div>
        <ul className={` ${isMobile ? " " : "w-10/12 mx-auto"}`}>
          {data1.map((val, idx) => (
            <li
              key={idx}
              className="bg-white border-2 rounded-lg mb-2 last:mb-0 px-4 py-6 cursor-pointer "
              onClick={() => {
                data1ClickToggle(idx);
              }}
            >
              <div className="h-0">
                <div className="flex justify-end relative -top-3">
                  {val.clicked ? (
                    <i className="fas fa-chevron-up"></i>
                  ) : (
                    <i className="fas fa-chevron-down"></i>
                  )}
                </div>
              </div>
              <div className={`font-bold  ${isMobile ? "" : "text-lg "}`}>
                {val.question}
              </div>
              {val.clicked ? (
                <div className={`pl-px ${isMobile ? "mt-4" : "text-lg mt-3"}`}>
                  {val.answer}
                </div>
              ) : (
                <div className=""></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
