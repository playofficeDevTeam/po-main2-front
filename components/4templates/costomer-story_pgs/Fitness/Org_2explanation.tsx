import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import useIsMobile from "../../../hooks/useIsMobile";
import Vdo from "../../../1atoms/Vdo";

export default function App() {
  const isMobile = useIsMobile();
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
      <Vdo
        src={
          isMobile
            ? "/assets/고객반응/고객반응_운동기구/1_mobile"
            : "/assets/고객반응/고객반응_운동기구/1_pc"
        }
        className={
          isMobile ? "rounded-md  max-w-xs mx-auto" : "rounded-lg shadow-md"
        }
      />
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
