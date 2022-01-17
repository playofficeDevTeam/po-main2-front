import Image from "next/image";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Org_2mainExplanation from "./Org_2mainExplanation";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      선하고 똑똑한 사람들만 <br />
      함께합니다.
    </>
  ),
  content: (
    <>
      <div className="text-gray-900 font-bold mb-1">
        “일만 잘하면 되는 것 아닌가?”
      </div>
      포케팅은 누군가의 진심이 담긴 사업에 기여합니다. <Br_pc />
      우리는 누군가를 크게 성장시키고 <Br_pc />또 나아갈 방향을 설정합니다.{" "}
      <Br_pc />
      우리는 선하기만 해서도, 똑똑하기만 해서도 안됩니다. <Br_pc />
      선하고 똑똑한 사람들만 모여 우리를 믿는 사람들에 <Br_pc />
      대한 책임을 다합니다.
    </>
  ),
  src: "/assets/소개/5번째 섹션_함께가다.gif",
};

export default function App({ data = defaultData, trigger = false }) {
  return <Org_2mainExplanation data={data} trigger={trigger} border={false} />;
}
