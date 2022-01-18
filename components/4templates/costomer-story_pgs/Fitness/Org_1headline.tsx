import AnimatedNumber from "../../../1atoms/AnimatedNumber";
import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Org_headLine_R_ from "../ExerciseAids/Org_headLine_R_";
import useIsMobile from "../../../hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  const data = {
    src: isMobile
      ? "/assets/고객반응/고객반응_운동기구/0_mobile.png"
      : "/assets/고객반응/고객반응_운동기구/0_pc.png",
    height: isMobile ? "92vh" : "28rem",
    title: (
      <>
        Y사, 상세페이지 강화
        <Br_mo />
        하고
        <Br_pc /> 고객 체류시간
        <Br_mo />
        늘려 억대 월매출 달성
      </>
    ),
    contents: [
      {
        title: <>평균 체류시간</>,
        content: (
          <>
            <AnimatedNumber
              trigger={true}
              value={7}
              duration={2000}
              fixed={0}
            />
            배 증가
          </>
        ),
      },
      {
        title: <>평균 구매전환율 </>,
        content: (
          <>
            <AnimatedNumber trigger={true} value={25} duration={2000} />% 달성
          </>
        ),
      },
      {
        title: <>매출</>,
        content: (
          <>
            <AnimatedNumber trigger={true} value={27} duration={2000} />배 상승
          </>
        ),
      },
    ],
  };

  return <Org_headLine_R_ data={data} />;
}
