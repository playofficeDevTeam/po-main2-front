import useIsMobile from "../../../hooks/useIsMobile";

const data1_mo = [
  {
    title: <>아무 회사와 함께하지 않습니다.</>,
    subTitle: (
      <>
        ✔ 온라인 배송이 가능한 브랜드만 진행합니다. 포케팅의 전문 분야입니다.
        <br />
        <br />
        ✔ 콘텐츠를 적극 활용 할 브랜드만 진행합니다. 비주얼 인플루언서 마케팅의
        본질은 ‘성과를 높이는 콘텐츠’입니다. 쓰지 않을 콘텐츠는 만들지도
        않습니다.
        <br />
        <br />✔ 아무리 많은 비용을 준다해도 무례한 회사와는 하지 않습니다.
      </>
    ),
  },
  {
    title: <>다 해준다는 말을 하지 않습니다.</>,
    subTitle: (
      <>
        ‘이것도 해준다.’ ‘저것도 해준다.’ 하지 않습니다. 포케팅은 전략 콘텐츠
        마케팅 에이전시입니다.{" "}
        <b>“브랜드가 고객의 꿈에 나오게 할만한 콘텐츠” 를 만드는데에 집중</b> 할
        것입니다.
      </>
    ),
  },
  {
    title: <>파트너사 성장만을 목표로 합니다.</>,
    subTitle: (
      <>
        별 것도 아닌 일 때문에 파트너사의 성장이 방치 되는 것을 정말 싫어합니다.{" "}
        <b>문제는 해결하면 될 뿐, 목표는 오직 성장입니다.</b>
      </>
    ),
  },
];

const data1_pc = [
  {
    title: <>아무 회사와 함께하지 않습니다.</>,
    subTitle: (
      <>
        ✔ 온라인 배송이 가능한 브랜드만 진행합니다. 포케팅의 전문 분야입니다.
        <br />
        <br />
        ✔ 콘텐츠를 적극 활용 할 브랜드만 진행합니다. <br /> 비주얼 인플루언서
        마케팅의 본질은 ‘성과를 높이는 콘텐츠’입니다. <br /> 쓰지 않을 콘텐츠는
        만들지도 않습니다.
        <br />
        <br />✔ 아무리 많은 비용을 준다해도 무례한 회사와는 하지 않습니다.
      </>
    ),
  },
  {
    title: <>다 해준다는 말을 하지 않습니다.</>,
    subTitle: (
      <>
        ‘이것도 해준다.’ ‘저것도 해준다.’ 하지 않습니다. <br /> 포케팅은 전략
        콘텐츠 마케팅 에이전시입니다
        <br />
        <b>
          “브랜드가 고객의 꿈에 나오게 할만한 콘텐츠”
          <br /> 를 만드는데에 집중
        </b>{" "}
        할 것입니다.
      </>
    ),
  },
  {
    title: <>파트너사 성장만을 목표로 합니다.</>,
    subTitle: (
      <>
        별 것도 아닌 일 때문에 파트너사의 성장이 방치 되는 것을 정말 싫어합니다.{" "}
        <br />
        <b>문제는 해결하면 될 뿐, 목표는 오직 성장입니다.</b>
      </>
    ),
  },
];

export default function App() {
  const isMobile = useIsMobile();
  const data1 = isMobile ? data1_mo : data1_pc;
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <section className="bg-gray-50">
      <div className="py-20 mo-max ">
        <div className="text-2xl  text-center mb-8">
          🔥 <b>포케팅 성과 원칙</b> 🔥
        </div>
        <ul className="">
          {data1.map((val, idx) => (
            <li
              key={idx}
              className="border-2 rounded-xl px-5 py-7 mb-3 bg-white"
            >
              <div className=" text-xl font-bold mb-6">{val.title}</div>
              <div>{val.subTitle}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className="bg-gray-50">
      <div className="py-20 pc-max ">
        <div className="text-3xl  text-center mb-8">
          🔥 <b>포케팅 성과 원칙</b> 🔥
        </div>
        <ul className="w-8/12 mx-auto ">
          {data1.map((val, idx) => (
            <li
              key={idx}
              className="border-2 rounded-xl px-5 py-7 mb-3  leading-normal bg-white"
            >
              <div className=" text-xl font-bold mb-6">{val.title}</div>
              <div className=" leading-normal">{val.subTitle}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
