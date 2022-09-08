import { useState } from "react";
import Carowsel_ref from "../../../1atoms/Carowsel_ref";
import Vdo from "../../../1atoms/Vdo";
import useIsMobile from "../../../hooks/useIsMobile";

const data1 = {
  h1: <></>,
  contents: [
    {
      h1: <>상세페이지</>,
      src: [
        <Vdo
          key={1}
          src="/assets/서비스_비주얼/7_1"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={2}
          src="/assets/서비스_비주얼/7_2"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={3}
          src="/assets/서비스_비주얼/7_3"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={4}
          src="/assets/서비스_비주얼/7_4"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={5}
          src="/assets/서비스_비주얼/7_5"
          className="rounded-2xl mx-auto"
        />,
      ],
    },
    {
      h1: <>광고소재</>,
      src: [
        <Vdo
          key={1}
          src="/assets/서비스_비주얼/8_1"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={2}
          src="/assets/서비스_비주얼/8_2"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={3}
          src="/assets/서비스_비주얼/8_3"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={4}
          src="/assets/서비스_비주얼/8_4"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={5}
          src="/assets/서비스_비주얼/8_5"
          className="rounded-2xl mx-auto"
        />,
      ],
    },
    {
      h1: <>콘텐츠</>,
      src: [
        <Vdo
          key={1}
          src="/assets/서비스_비주얼/9_1"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={2}
          src="/assets/서비스_비주얼/9_2"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={3}
          src="/assets/서비스_비주얼/9_3"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={4}
          src="/assets/서비스_비주얼/9_4"
          className="rounded-2xl mx-auto"
        />,
        <Vdo
          key={5}
          src="/assets/서비스_비주얼/9_5"
          className="rounded-2xl mx-auto"
        />,
      ],
    },
  ],
};

export default function App() {
  const isMobile = useIsMobile();
  const [data1Tab, setData1Tab] = useState(0);
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <section className="pt-20 pb-20 bg-white">
      <div className="mo-max">
        <div className="mo-h1">
          <h1 className="mb-6">
            포케팅은 비주얼 인플루언서 <br /> 3,700명이 소속된
            <br /> 시장 점유율 80%의 <br /> 1위 에이전시 입니다.
          </h1>
          <h2 className="mb-20">
            “비주얼 인플루언서”는 <br />
            브랜디드·광고 콘텐츠 <br />
            제작 경력이 인증된 <br />
            최상위 콘텐츠 제작자로서
            <br />
            공급이 한정되어 있습니다.
          </h2>
        </div>

        {/* 부제목탭 */}
        <div className="mb-4 relative z-30">
          <ul className="center">
            {data1.contents.map((data1Val, data1Idx) => (
              <li
                key={data1Idx}
                className={`mx-3 text-lg font-bold cursor-pointer pb-1  transition duration-200 border-b-4 border-transparent ${
                  data1Idx === data1Tab
                    ? " text-blue-500 border-b-4 border-blue-500"
                    : ""
                }`}
                onClick={() => {
                  setData1Tab(data1Idx);
                }}
              >
                {data1Val.h1}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 캐로셀 */}
      <div className="">
        <div className="">
          {data1.contents.map((data1Val, data1Idx) =>
            data1Idx === data1Tab ? (
              <Carowsel_ref>
                {data1Val.src.map((data1ValSrc, data1ValIdx) => (
                  <div key={data1ValIdx} className="w-full">
                    <div
                      className="mx-auto"
                      style={{
                        height: "140vw",
                        maxWidth: "366px",
                        maxHeight: "595.838px",
                      }}
                    >
                      {data1ValSrc}
                    </div>
                  </div>
                ))}
              </Carowsel_ref>
            ) : (
              <></>
            )
          )}
        </div>
      </div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className="pt-20 bg-white">
      <div className="pc-max">
        <div className="text-2xl font-bold center-col text-center  leading-normal">
          <div className="mb-6">
            포케팅은 비주얼 인플루언서 3,700명이 소속된
            <br /> 시장 점유율 80%의 1위 에이전시 입니다.
          </div>
          <div className="mb-20">
            “비주얼 인플루언서”는 브랜디드·광고 콘텐츠 <br />
            제작 경력이 인증된 최상위 콘텐츠 제작자로서 <br />
            공급이 한정되어 있습니다
          </div>
        </div>
        {/* 부제목탭 */}
        <div className="mb-10">
          <ul className="flex justify-center">
            {data1.contents.map((data1Val, data1Idx) => (
              <li
                key={data1Idx}
                className={`mx-9 text-xl font-bold cursor-pointer pb-1  transition duration-200 border-b-4 border-transparent ${
                  data1Idx === data1Tab
                    ? " text-blue-500 border-b-4 border-blue-500"
                    : ""
                }`}
                onClick={() => {
                  setData1Tab(data1Idx);
                }}
              >
                {data1Val.h1}
              </li>
            ))}
          </ul>
        </div>

        {/* 캐로셀 */}
        <div className="w-1/2 mx-auto h-96 mb-72">
          {data1.contents.map((data1Val, data1Idx) =>
            data1Idx === data1Tab ? (
              <Carowsel_ref>
                {data1Val.src.map((data1ValSrc, data1Idx) => (
                  <div key={data1Idx} className="flex justify-center w-full">
                    <div
                      className="mo-max"
                      style={{ height: "657.062px", width: "384px" }}
                    >
                      {data1ValSrc}
                    </div>
                  </div>
                ))}
              </Carowsel_ref>
            ) : (
              <></>
            )
          )}
        </div>
      </div>
      <div className="pb-20"></div>
    </section>
  );
}
