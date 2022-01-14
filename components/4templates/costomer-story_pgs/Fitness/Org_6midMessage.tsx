import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_7midMessage_R_ from "../ExerciseAids/Org_7midMessage_R_";

export default function App() {
  const data = {
    title: (
      <>
        “기억에 남는 <Br_mo />
        고객님 후기요? 음.. <Br_pc />
        <Br_mo />
        <Atm_bgBlue>
          얇은 팔뚝으로 팔굽혀펴기
          <Br_mo />
          쉽게 하는 영상보고
          <Br_mo />
          구매
        </Atm_bgBlue>
        했다는 <Br_pc />
        고객님의
        <Br_mo />
        후기가 가장 기억에 남아요”
      </>
    ),
    add: <>-운동기구 브랜드 Y사 대표님 -</>,
  };

  return <Org_7midMessage_R_ data={data} />;
}
