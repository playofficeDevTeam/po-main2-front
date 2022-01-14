import { useRouter } from "next/router";
import Br_mo from "../../../1atoms/Br_mo";
import useIsMobile from "../../../hooks/useIsMobile";
import Org_lastMessage from "../Main/Org_lastMessage";

const defaultData = {
  title: (
    <>
      B사가 진행한
      <br />
      비주얼 인플루언서 마케팅에 대해
      <br />더 알아보세요!
    </>
  ),
  btn: <>서비스 자세히 보기!</>,
  url: "/service",
};

export default function App({ data = defaultData, trigger = false }) {
  return <Org_lastMessage data={data} trigger={trigger} />;
}
