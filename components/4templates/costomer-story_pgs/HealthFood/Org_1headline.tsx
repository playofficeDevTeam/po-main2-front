import { isMobile } from "react-device-detect";
import AnimatedNumber from "../../../1atoms/AnimatedNumber";
import Br_mo from "../../../1atoms/Br_mo";
import Org_headLine_R_ from "../ExerciseAids/Org_headLine_R_";
import { requ } from "../../../../public/assets/고객반응/고객반응_건강식품/func_nameToSrc";

export default function App() {
  const data = {
    src: isMobile ? requ("1_mobile.png") : requ("1.png"),
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
