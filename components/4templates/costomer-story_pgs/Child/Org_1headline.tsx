import { isMobile } from "react-device-detect";
import AnimatedNumber from "../../../1atoms/AnimatedNumber";
import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Org_headLine_R_ from "../ExerciseAids/Org_headLine_R_";
import { requ } from "../../../../public/assets/고객반응_유아/func_nameToSrc";

export default function App() {
  const data = {
    src: isMobile ? requ("0_mobile.png") : requ("0_pc.png"),
    height: isMobile ? "44rem" : "28rem",
    title: (
      <>
        B사, 상세페이지 강화
        <Br_mo />
        하고 <Br_pc /> 광고 소재 변경해
        <Br_mo />
        매출 5배 증가
      </>
    ),
    contents: [
      {
        title: <>매출</>,
        content: (
          <>
            <AnimatedNumber
              trigger={true}
              value={5}
              duration={2000}
              fixed={0}
            />
            배 증가
          </>
        ),
      },
      {
        title: <>고객 단순 문의량</>,
        content: (
          <>
            <AnimatedNumber trigger={true} value={40} duration={2000} />% 감소
          </>
        ),
      },
      {
        title: <>광고 ROAS</>,
        content: (
          <>
            <AnimatedNumber trigger={true} value={3} duration={2000} />배 상승
          </>
        ),
      },
    ],
  };

  return <Org_headLine_R_ data={data} />;
}
