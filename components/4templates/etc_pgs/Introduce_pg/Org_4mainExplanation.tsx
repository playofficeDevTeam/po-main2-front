import Image from "next/image";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Org_2mainExplanation from "./Org_2mainExplanation";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      두려워 하지 않는 <br />
      습관을 가집니다.
    </>
  ),
  content: (
    <>
      <div className="text-gray-900 font-bold mb-1">“사실은 별 거 아니야”</div>
      처음 보는 일이나 갑작스러운 문제를 만났을 때 <Br_pc />겁 먹을 필요
      없습니다. 본질에 집중하고 도전해보면 <Br_pc />
      생각보다 쉽게 해결됩니다. 만약 실패하더라도
      <Br_pc />
      실패에서 비롯된 유의미한 정보를 얻는게 중요합니다. <Br_pc />
      이는 올바른 방향으로 갈 수 있는 지도를 만드는 과정이며 <Br_pc />
      다른 의미의 특별한 성공입니다.
    </>
  ),
  src: require("/home/app/public/assets/소개/3번째 섹션_가능성.gif").default,
};

export default function App({ data = defaultData, trigger = false }) {
  return <Org_2mainExplanation data={data} trigger={trigger} />;
}
