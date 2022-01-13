import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import Org_5explanation_link_R_ from "../ExerciseAids/Org_5explanation_link_R_";
import { requ } from "../../../../public/assets/고객반응_유아/func_nameToSrc";
import Org_video from "../../../../public/assets/고객반응_유아/Org_video";

export default function App() {
  const data = {
    title: (
      <>
        아무리 안전하다고 <Br_mo />
        적어놔도
        <Br_pc /> '안전한가요?'
        <Br_mo />
        라는 문의가 <Br_mo />
        끊이질 않았어요.
      </>
    ),
    content: (
      <>
        <div className="max-w-sm mx-auto">
          <img src={requ("2.png")} alt="2" />
        </div>
        <div className="mt-14">
          코로나 때문에 손소독제를 많이 사용하잖아요. 우리 아이가 사용해도
          괜찮나 의구심에 아이가 사용해도 괜찮은 손소독제를 만들어야겠다고
          생각했어요. 그래서 특히 안전에 신경써서 만들었고, 상세페이지 내에서
          안전에 대한 내용을 많이 강조했어요. <br /> 그렇게 해도 안전하냐는
          문의가 많았어요. 판매가 3건이면 문의가 7,8건? 상세페이지 내에 안전과
          관련된 인증서로 도배를 하고 친절히 답변해도 문의와 판매량은 그대로
          였어요.
        </div>
      </>
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
