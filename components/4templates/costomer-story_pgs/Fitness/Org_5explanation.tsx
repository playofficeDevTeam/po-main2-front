import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import { requ } from "../../../../public/assets/고객반응/고객반응_운동기구/func_nameToSrc";
import Org_video from "../../../../public/assets/고객반응/고객반응_운동기구/Org_video";

export default function App({ trigger = true }) {
  const data = {
    title: (
      <>
        마케팅 후 평균 월매출
        <Br_mo />
        1억 30만원 달성,
        <Br_mo />
        27배 상승 실환가 ㅎㅎ
      </>
    ),
    content: (
      <>
        <div className="mt-14">
          알고 지내는 동종업계 지인이 구매전환율 7% 나온다고 자랑해서 속앓이를
          많이 했었어요.(눈물) 지금 우리 회사는 구매전환율 25%에 매출이 27배
          상승했어요. 진짜 실화인가 싶네요ㅎㅎ <br />
          <br />{" "}
          <b>
            마케팅 전에 월 매출이 370만원, 비주얼 인플루언서 마케팅 진행 후
            6개월동안 평균 월 매출이 1억이 넘습니다.
          </b>{" "}
          다음 신제품도 비주얼 인플루언서 마케팅 계획 중입니다. 또 잘
          부탁드려요.(웃음)
        </div>
      </>
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
