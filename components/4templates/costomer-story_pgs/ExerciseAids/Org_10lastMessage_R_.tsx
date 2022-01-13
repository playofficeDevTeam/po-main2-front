import { useRouter } from "next/router";
import Br_mo from "../../../1atoms/Br_mo";
import useIsMobile from "../../../hooks/useIsMobile";

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
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <section className=" bg-gray-900">
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <div className="mo-max py-20">
          <div className="mo-h1 text-center text-white mb-10">{data.title}</div>
          <div
            className={` border-4 border-orange-500 rounded font-bold text-lg text-center p-2 transition duration-200 cursor-pointer ${
              trigger
                ? " text-white text-shadow-md bg-orange-500"
                : "text-orange-500 "
            }`}
            onClick={() => {
              router.push(data.url);
            }}
          >
            {data.btn}
          </div>
        </div>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <div className="pc-max py-20 text-center flex  flex-col  justify-center">
          <div className=" text-3xl leading-snug font-bold text-white mb-10">
            {data.title}
          </div>
          <div
            className={`w-60 mx-auto border-4 border-orange-500 rounded font-bold text-lg text-center p-2 transition duration-200 cursor-pointer ${
              trigger
                ? " text-white text-shadow-md bg-orange-500"
                : "text-orange-500 "
            }`}
            onClick={() => {
              router.push(data.url);
            }}
          >
            {data.btn}
          </div>
        </div>
      )}
    </section>
  );
}
