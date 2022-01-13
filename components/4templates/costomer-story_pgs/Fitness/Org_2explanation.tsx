import { isMobile } from "react-device-detect";
import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import Org_video from "../../../../public/assets/고객반응/고객반응_운동기구/Org_video";

export default function App() {
  const data = {
    title: (
      <>
        <Atm_bgBlue>
          상세페이지에 <Br_mo />
          콘텐츠 강화한게
        </Atm_bgBlue>
        <Br_mo />
        결정적이였어요. <Br_pc />
        <Br_mo />
        매출 27배 상승.
      </>
    ),
    content: (
      <div className="w-11/12 mx-auto">
        <Org_video
          data={{
            fileName: isMobile ? "1_mobile" : "1_pc",
            className: isMobile
              ? " rounded-md  max-w-xs mx-auto"
              : "rounded-lg",
          }}
        />
      </div>
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
