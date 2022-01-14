import AnimatedNumber from "../../../1atoms/AnimatedNumber";
import useIsMobile from "../../../hooks/useIsMobile";
import Org_headLine_R_ from "../ExerciseAids/Org_headLine_R_";

export default function App() {
  const isMobile = useIsMobile();

  const data = {
    src: isMobile
      ? "/assets/고객반응/고객반응_건강식품/1_mobile.png"
      : "/assets/고객반응/고객반응_건강식품/1.png",
    height: isMobile ? "44rem" : "28rem",
    title: (
      <>
        상세페이지 강화하고, <br />
        매출 19배 상승한 M사
      </>
    ),
    contents: [
      {
        title: <>평균 구매전환율</>,
        content: (
          <>
            <AnimatedNumber
              trigger={true}
              value={27}
              duration={2000}
              fixed={0}
            />
            % 달성
          </>
        ),
      },
      {
        title: <>최고 구매전환율</>,
        content: (
          <>
            <AnimatedNumber trigger={true} value={45} duration={2000} />% 달성
          </>
        ),
      },
      {
        title: <>매출</>,
        content: (
          <>
            <AnimatedNumber trigger={true} value={19} duration={2000} />배 상승
          </>
        ),
      },
    ],
  };

  return <Org_headLine_R_ data={data} />;
}
