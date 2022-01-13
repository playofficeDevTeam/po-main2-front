import { isMobile } from "react-device-detect";
import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import Org_video from "../../../../public/assets/고객반응_유아/Org_video";

export default function App() {
  const data = {
    title: (
      <>
        상세페이지, 광고 <Br_mo /> 다 뜯어고치니까 <Br_mo /> <Br_pc />
        망설이는 고객 없어지고 <Br_mo />
        15차 완판했어요!
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
