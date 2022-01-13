import AnimatedNumber from "../../../1atoms/AnimatedNumber";
import Br_mo from "../../../1atoms/Br_mo";
import useIsMobile from "../../../hooks/useIsMobile";
import Org_headLine_R_ from "./Org_headLine_R_";

export default function App() {
  const isMobile = useIsMobile();
  const data = {
    src: isMobile
      ? "/assets/고객반응/고객반응_운동보조/0_mobile.png"
      : "/assets/고객반응/고객반응_운동보조/0_pc.png",
    height: isMobile ? "44rem" : "28rem",
    title: (
      <>
        한 달만에 신제품 <Br_mo /> 1억원치 판매한
        <br />
        B사의 광고 비결
      </>
    ),
    contents: [
      {
        title: <>평균 ROAS</>,
        content: (
          <>
            <AnimatedNumber
              trigger={true}
              value={18.05}
              duration={2000}
              fixed={2}
            />{" "}
            <span className="text-lg">
              (
              <AnimatedNumber trigger={true} value={1805} duration={2000} />
              %)
            </span>
          </>
        ),
      },
      {
        title: <>평균 구매 전환당 비용</>,
        content: (
          <>
            <AnimatedNumber trigger={true} value={1} duration={2000} />
            ,
            <AnimatedNumber trigger={true} value={430} duration={2000} />원
          </>
        ),
      },
      {
        title: <>광고 운영 1개월 매출</>,
        content: (
          <>
            <AnimatedNumber trigger={true} value={1} duration={2000} />억{" "}
            <AnimatedNumber trigger={true} value={3} duration={2000} />
            천만원
          </>
        ),
      },
    ],
  };
  return <Org_headLine_R_ data={data} />;
}
