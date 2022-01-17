import Image from "next/image";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = [
  {
    title: (
      <>
        본질만 남기고 처음부터 <br />
        다시 생각해 봅니다
      </>
    ),
    content: (
      <>
        <div className="text-gray-900 font-bold mb-1">
          “늘 그렇게 해왔으니까”
        </div>
        <div className="">
          관습, 익숙함은 우리를 그 자리에 머무르게 합니다. <Br_pc />
          포케팅은 모든 일에 당연한 것은 없다고 생각하며 <Br_pc />
          익숙한 것에 대해 경계합니다. <Br_pc />
          “왜”라는 질문을 통해 본질로 돌아가고 <Br_pc />
          익숙한 것을 새롭고 가치있게 만듭니다.
        </div>
      </>
    ),
    src: "/assets/소개/1번째 섹션_처음부터 다시.gif",
  },
  {
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
        우리가 모인 이유는 더 나은 결과를 만들 수 있기 때문입니다. <Br_pc />더
        나은 결과는 서로에 대한 신뢰에서 비롯되고 <Br_pc />
        신뢰는 나부터 먼저 상대방을 존중할 때 만들어집니다. <Br_pc />더 나은
        결과는 ‘내’가 아닌 ‘우리’가 만들 수 있습니다.
      </>
    ),
    src: "/assets/소개/2번째 섹션_가능성.gif",
  },
  {
    title: (
      <>
        두려워 하지 않는 <br />
        습관을 가집니다.
      </>
    ),
    content: (
      <>
        <div className="text-gray-900 font-bold mb-1">
          “사실은 별 거 아니야”
        </div>
        처음 보는 일이나 갑작스러운 문제를 만났을 때 <Br_pc />겁 먹을 필요
        없습니다. 본질에 집중하고 도전해보면 <Br_pc />
        생각보다 쉽게 해결됩니다. 만약 실패하더라도
        <Br_pc />
        실패에서 비롯된 유의미한 정보를 얻는게 중요합니다. <Br_pc />
        이는 올바른 방향으로 갈 수 있는 지도를 만드는 과정이며 <Br_pc />
        다른 의미의 특별한 성공입니다.
      </>
    ),
    src: "/assets/소개/3번째 섹션_가능성.gif",
  },
  {
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
  },
  {
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
  },
];
export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <>
      <ul className="mo-max mt-14 pt-10">
        {data.map((val, idx: number) => (
          <li
            key={idx}
            className={`center-col pb-12 mb-20 last:mb-0  border-b-2  `}
          >
            <div className="flex items-center">
              <div className="">
                <h1 className="mo-h1 mb-7">{val.title}</h1>
                <p className=" leading-relaxed text-gray-600 mb-7">
                  {val.content}
                </p>
              </div>
            </div>
            <div className="center-col">
              <Image src={val.src} alt="기호" width={288} height={288} />
            </div>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <>
      <ul className="pc-max mt-14 pt-10">
        {data.map((val, idx: number) => (
          <li key={idx} className={`flex pb-12 mb-20 last:mb-0  border-b-2  `}>
            <div className="center w-6/12">
              <div className="w-96">
                <h1 className=" pc-h1 mb-7">{val.title}</h1>
                <p className=" leading-relaxed text-gray-600 mb-7">
                  {val.content}
                </p>
              </div>
            </div>
            <div className="center-col w-6/12">
              <Image src={val.src} alt="기호" width={416} height={416} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
