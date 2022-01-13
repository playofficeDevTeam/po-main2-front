import { isMobile } from "react-device-detect";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import Org_video from "../../../../public/assets/고객반응/고객반응_건강식품/Org_video";

export default function App() {
  const data = {
    title: (
      <>
        상세페이지마다 <Br_mo />이 영상을 사용하고, <br />{" "}
        <Atm_bgBlue>
          평균 구매전환율 <Br_mo /> 27% 달성
        </Atm_bgBlue>
        했어요
      </>
    ),
    content: (
      <div className="w-11/12 mx-auto">
        <Org_video
          data={{
            fileName: isMobile ? "2_mobile" : "2",
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
