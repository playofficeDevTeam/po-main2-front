import Image from "next/image";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      본질만 남기고 처음부터 <br />
      다시 생각해 봅니다
    </>
  ),
  content: (
    <>
      <div className="text-gray-900 font-bold mb-1">“늘 그렇게 해왔으니까”</div>
      <div className="">
        관습, 익숙함은 우리를 그 자리에 머무르게 합니다. <Br_pc />
        포케팅은 모든 일에 당연한 것은 없다고 생각하며 <Br_pc />
        익숙한 것에 대해 경계합니다. <Br_pc />
        “왜”라는 질문을 통해 본질로 돌아가고 <Br_pc />
        익숙한 것을 새롭고 가치있게 만듭니다.
      </div>
    </>
  ),
  src: require("/home/app/public/assets/소개/1번째 섹션_처음부터 다시.gif")
    .default,
};
export default function App({
  data = defaultData,
  reverse = false,
  border = true,
  trigger = false,
}) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <>
      <div className="mo-max mt-14 pt-10">
        <div className={`center-col pb-12 mb-20 last:mb-0  border-b-2  `}>
          <div className="flex items-center">
            <div className="">
              <h1 className="mo-h1 mb-7">{data.title}</h1>
              <p className=" leading-relaxed text-gray-600 mb-7">
                {data.content}
              </p>
            </div>
          </div>
          <div className="center-col">
            <Image src={data.src} alt="기호" width={288} height={288} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="pc-max ">
        <div
          className={`flex mt-14 mb-20 pt-10 pb-16  last:mb-0   ${
            reverse ? "flex-row-reverse" : ""
          } ${border ? "border-b-2" : ""}  `}
        >
          <div className="center w-6/12">
            <div className="w-96">
              <h1
                className={`pc-h1 mb-7 relative transition duration-500  ${
                  trigger
                    ? " opacity-100 translate-y-0"
                    : " opacity-0  translate-y-2"
                }`}
              >
                {data.title}
              </h1>
              <p
                className={`leading-relaxed text-gray-600 mb-7 transition duration-500 ${
                  trigger
                    ? " opacity-100 translate-y-0 delay-200"
                    : " opacity-0  translate-y-2"
                }`}
              >
                {data.content}
              </p>
            </div>
          </div>
          <div
            className={`center-col w-6/12 transition duration-500  ${
              trigger
                ? " opacity-100 translate-y-0 delay-500"
                : " opacity-0  translate-y-2"
            }`}
          >
            <Image src={data.src} alt="기호" width={416} height={416} />
          </div>
        </div>
      </div>
    </>
  );
}
