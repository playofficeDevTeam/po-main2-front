import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_7midMessage_R_ from "../ExerciseAids/Org_7midMessage_R_";

export default function App() {
  const data = {
    title: (
      <>
        “비주얼 인플루언서 마케팅은
        <Br_mo />겁 많은 <Br_pc />
        <Atm_bgBlue>
          고객을 구매 버튼까지
          <Br_mo /> 안전하게 데려오는 <Br_pc />
          <Br_mo />
          최고의 방법인 것 같아요!
        </Atm_bgBlue>
        ”
      </>
    ),
    add: (
      <>
        - 유아 손소독제 생활용품 브랜드
        <Br_mo />
        B사 대표님 -
      </>
    ),
  };

  return <Org_7midMessage_R_ data={data} />;
}
