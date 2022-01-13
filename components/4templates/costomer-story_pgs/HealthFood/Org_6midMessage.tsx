import { isMobile } from "react-device-detect";
import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_7midMessage_R_ from "../ExerciseAids/Org_7midMessage_R_";

export default function App() {
  const data = {
    title: (
      <>
        <Atm_bgBlue>
          “상세페이지를 강화해 <Br_mo /> 매출을 올리고 싶은 <Br_mo />
          회사
        </Atm_bgBlue>
        에게 <Br_pc /> 비주얼 <Br_mo />
        인플루언서 마케팅을 <Br_mo />
        적극 추천합니다.”
      </>
    ),
    add: <>- 콜라겐 M사 마케팅팀 권팀장님 -</>,
  };

  return <Org_7midMessage_R_ data={data} />;
}
