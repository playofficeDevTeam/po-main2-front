import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "/home/app/components/common/Layout";

const data1 = [
  <>안내 및 전담팀 배정</>,
  <>캠페인 실행</>,
  <>중간 리포트 전달</>,
  <>최종 리포트 전달</>,
  <>향후 전략 상담</>,
];

export default function App() {
  const isMobile = useReactiveVar(isMobileVar);
  return isMobile ? (
    <section className="py-20 bg-gray-100">
      <div className="mo-max ">
        <h2 className="mo-h1 text-center mb-10">
          브랜드마다 3인의 전문가로 <br /> 구성 된 전담팀이 배정되어 <br />
          처음부터 끝까지 <br /> 성과를 견인합니다.
        </h2>
        <ul>
          {data1.map((val, idx) => (
            <li
              key={idx}
              className="flex bg-white border-2 rounded-lg px-5 py-3 mb-2 last:mb-0"
            >
              <div className="w-2/12">0{idx + 1}</div>
              <div>{val}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ) : (
    <section className="py-20 bg-gray-100">
      <div className="pc-max flex">
        <h2 className="w-1/2 pc-h1 flex items-center ">
          브랜드마다 <br />
          3인의 전문가로 구성 된 <br /> 전담팀이 배정되어 <br />
          처음부터 끝까지 <br /> 성과를 견인합니다.
        </h2>
        <ul className="w-1/2 ml-6">
          {data1.map((val, idx) => (
            <li
              key={idx}
              className="flex bg-white border-2 rounded-lg px-5 py-3 mb-2 last:mb-0"
            >
              <div className="w-2/12">0{idx + 1}</div>
              <div>{val}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
