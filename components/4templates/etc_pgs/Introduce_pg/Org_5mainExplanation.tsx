import Image from "next/image";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Org_3mainExplanation_reverse from "./Org_3mainExplanation_reverse";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      스스로 몰입할 수 있는 이유를 <br />
      찾고, 일을 리드합니다.
    </>
  ),
  content: (
    <>
      <div className="text-gray-900 font-bold mb-1">“왜 이 일을 할까?”</div>
      이유를 아는 것은 내가 그 일의 주인이 되는 것입니다. <Br_pc />
      똑똑한 사람이나 일을 많이 하는 사람보다 <Br_pc />
      하는 이유를 아는 사람이 더 나은 결과를 만듭니다. <Br_pc />
      일에 끌려 다니지 않고 일을 리드하기 위해 <Br_pc />
      이유를 찾고 목적을 정의합니다.
    </>
  ),
  src: "/assets/소개/4번째 섹션_몰입.gif",
};
export default function App({ data = defaultData, trigger = false }) {
  return <Org_3mainExplanation_reverse data={data} trigger={trigger} />;
}
