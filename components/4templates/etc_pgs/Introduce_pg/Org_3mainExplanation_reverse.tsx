import Image from "next/image";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Org_2mainExplanation from "./Org_2mainExplanation";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      나보다 동료의 생각이 <br />더 옳을 수 있다는 <br />
      가능성을 믿습니다.
    </>
  ),
  content: (
    <>
      <div className="text-gray-900 font-bold mb-1">
        “내 생각이 항상 정답일까?”
      </div>
      우리가 모인 이유는
      <Br_pc />더 나은 결과를 만들 수 있기 때문입니다. <Br_pc />더 나은 결과는
      서로에 대한 신뢰에서 비롯되고 <Br_pc />
      신뢰는 나부터 먼저 상대방을 존중할 때 만들어집니다. <Br_pc />더 나은
      결과는 ‘내’가 아닌 ‘우리’가 만들 수 있습니다.
    </>
  ),
  src: require("/home/app/public/assets/소개/2번째 섹션_가능성.gif").default,
};
export default function App({
  data = defaultData,
  border = true,
  trigger = false,
}) {
  return (
    <Org_2mainExplanation
      data={data}
      reverse={true}
      border={border}
      trigger={trigger}
    />
  );
}
