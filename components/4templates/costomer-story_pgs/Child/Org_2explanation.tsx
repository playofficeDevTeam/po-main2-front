import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import useIsMobile from "../../../hooks/useIsMobile";
import Vdo from "../../../1atoms/Vdo";

export default function App() {
  const isMobile = useIsMobile();
  const data = {
    title: (
      <>
        상세페이지, 광고 <Br_mo /> 다 뜯어고치니까 <Br_mo /> <Br_pc />
        망설이는 고객 없어지고 <Br_mo />
        15차 완판했어요!
      </>
    ),
    content: (
      <Vdo
        src={
          isMobile
            ? "/assets/고객반응/고객반응_유아/1_mobile"
            : "/assets/고객반응/고객반응_유아/1_pc"
        }
        className={
          isMobile ? " rounded-md  max-w-xs mx-auto" : " rounded-lg shadow-md"
        }
      />
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
