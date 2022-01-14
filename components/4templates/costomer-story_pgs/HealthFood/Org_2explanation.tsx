import Br_mo from "../../../1atoms/Br_mo";
import Vdo from "../../../1atoms/Vdo";
import useIsMobile from "../../../hooks/useIsMobile";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";

export default function App() {
  const isMobile = useIsMobile();

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
      <Vdo
        src={
          isMobile
            ? "/assets/고객반응/고객반응_건강식품/2_mobile"
            : "/assets/고객반응/고객반응_건강식품/2"
        }
        className={
          isMobile ? " rounded-md  max-w-xs mx-auto" : "rounded-lg shadow-md"
        }
      />
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
