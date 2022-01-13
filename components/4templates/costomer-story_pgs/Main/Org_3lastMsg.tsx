import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Org_lastMessage from "./Org_lastMessage";

export default function App({ trigger = false }) {
  const data = {
    title: (
      <>
        고객사 매출을
        <Br_mo />
        평균 11배 성장시킨 <Br_pc />
        <Br_mo />
        비주얼 인플루언서 마케팅
        <Br_pc />
        <Br_mo />더 알아보세요!
      </>
    ),
    btn: <>서비스 자세히 보기</>,
    url: "/service",
  };

  return <Org_lastMessage data={data} trigger={trigger} />;
}
