import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import Br_mo from "../../../1atoms/Br_mo";
import Carowsel1 from "../../../1atoms/Carowsel1";
import Vdo from "../../../1atoms/Vdo";
import { isMobileVar } from "/home/app/components/common/Layout";

export const XscrollDiv = styled.div`
  overflow-x: scroll;
  margin: 2.5rem 0 4rem 0;
  &::-webkit-scrollbar {
    height: 0.3rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bfbfbfc1; /*스크롤바의 색상*/
    border-radius: 10px;
    background-clip: padding-box;
  }
  &::-webkit-scrollbar-track {
    background-color: #f5f5f5c1; /*스크롤바 트랙 색상*/
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const defaultTitle = (
  <>
    평균 11배 매출 상승시킨
    <br />
    비주얼 인플루언서 콘텐츠로
    <br />
    상세페이지와 광고의 <Br_mo />
    성과를 높이세요.
  </>
);
const defaultvideoData = [
  {
    src: "/assets/서비스_비주얼/0_1",
    title: "비주얼 인플루언서 콘텐츠",
  },
  {
    src: "/assets/서비스_비주얼/0_2",
    title: "광고 활용",
  },
  {
    src: "/assets/서비스_비주얼/0_3",
    title: "상세페이지 활용",
  },
];
export default function App({
  title = defaultTitle,
  videoData = defaultvideoData,
  rightComponent = <></>,
}) {
  const isMobile = useReactiveVar(isMobileVar);
  return (
    <section>
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <>
          <div className="mo-max mt-12 mb-8">
            <h1 className="mo-h1">{title}</h1>
          </div>
          <div className="">
            <XscrollDiv>
              <ul className="grid grid-cols-3 gap-3 px-5 pb-2 min-w-max">
                {videoData.map((val, idx) => (
                  <li key={idx}>
                    <div className="">
                      <Vdo
                        src={val.src}
                        className="mo-max"
                        style={{ width: "80vw" }}
                      />
                    </div>
                    <div className="my-3 font-bold flex ">
                      <div>
                        <img
                          src={"/assets/서비스_비주얼/아이콘/화살표 2 1.png"}
                        ></img>
                      </div>
                      <div className="flex relative right-3 top-1">
                        {val.title}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </XscrollDiv>
          </div>
        </>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <>
          <div className="pc-max mt-12 mb-20 ">
            <h1 className="pc-h1 text-center">{title}</h1>
          </div>
          <div className="pc-max flex">
            <div className="w-7/12 mr-4">
              <div className="w-10/12 mx-auto">
                <Carowsel1>
                  {videoData.map((val, idx) => (
                    <li key={idx} className=" ">
                      <Vdo src={val.src} className="w-full" />
                      <div className=" my-3 font-bold flex  ">
                        <div>
                          <img
                            src={"/assets/서비스_비주얼/아이콘/화살표 2 1.png"}
                          ></img>
                        </div>
                        <div className="flex  relative right-3 top-1">
                          {val.title}
                        </div>
                      </div>
                    </li>
                  ))}
                </Carowsel1>
              </div>
            </div>
            <div className="w-5/12">{rightComponent}</div>
          </div>
        </>
      )}
    </section>
  );
}
