import Br_mo from "../../../1atoms/Br_mo";
import Vdo from "../../../1atoms/Vdo";
import useIsMobile from "../../../hooks/useIsMobile";
import { useRouter } from "next/router";

export default function App() {
  const isMobile = useIsMobile();
  const data = [
    {
      url: "/costomer-story/child",
      video: (
        <Vdo
          src={
            isMobile
              ? "/assets/고객반응/고객반응_메인/유아_mobile"
              : "/assets/고객반응/고객반응_메인/유아_pc"
          }
          className="w-full rounded-md shadow-md"
        />
      ),
      title: (
        <>
          “상세페이지, 광고 다 뜯어고치니까 <br />
          15차 완판했어요!”
        </>
      ),
      hashtag: (
        <>
          #유아 #상세페이지 강화 <br />
          #광고성과 개선
        </>
      ),
    },
    {
      url: "/costomer-story/health-food",
      video: (
        <Vdo
          src={
            isMobile
              ? "/assets/고객반응/고객반응_메인/건강기능식품_mobile"
              : "/assets/고객반응/고객반응_메인/건강기능식품_pc"
          }
          className="w-full rounded-md shadow-md"
        />
      ),
      title: (
        <>
          “상세페이지마다 이 영상 사용하고, <br /> 평균 구매전환율 27%
          달성했어요”
        </>
      ),
      hashtag: <>#건강기능식품 #상세페이지 강화</>,
    },
    {
      url: "/costomer-story/fitness",
      video: (
        <Vdo
          src={
            isMobile
              ? "/assets/고객반응/고객반응_메인/운동기구_mobile"
              : "/assets/고객반응/고객반응_메인/운동기구_pc"
          }
          className="w-full rounded-md shadow-md"
        />
      ),
      title: (
        <>
          “상세페이지 콘텐츠 <Br_mo />
          강화한게 결정적이었어요. <br /> 매출 27배 상승.”
        </>
      ),
      hashtag: <>#운동기구 #상세페이지 강화</>,
    },
    {
      url: "/costomer-story/exercise-aids",
      video: (
        <Vdo
          src={
            isMobile
              ? "/assets/고객반응/고객반응_메인/압박스타킹_mobile"
              : "/assets/고객반응/고객반응_메인/압박스타킹_pc"
          }
          className="w-full rounded-md shadow-md"
        />
      ),
      title: (
        <>
          “광고 시작 한 달만에 매출액 1억 <Br_mo /> 달성했습니다.”
        </>
      ),
      hashtag: <>#압박스타킹 #광고성과 개선</>,
    },
  ];
  return <Main data={data} />;
}

const defaultData = [
  {
    url: "",
    video: <></>,
    title: <></>,
    hashtag: <></>,
  },
];
function Main({ data = defaultData }) {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <section className="">
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <div className="mo-max mb-24">
          {data.map((val, idx) => (
            <div
              key={idx}
              className="my-20 max-w-xs mx-auto cursor-pointer"
              onClick={() => {
                router.push(val.url);
              }}
            >
              <div className="mb-7">{val.video}</div>
              <div className="font-bold text-xl mb-3">{val.title}</div>
              <div className="text-gray-400">{val.hashtag}</div>
            </div>
          ))}
        </div>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <div>
          <div
            className=" max-w-5xl mx-auto mt-32 mb-20"
            style={{ height: "24rem" }}
          >
            <div
              className=" cursor-pointer flex transition duration-200 transform hover:-translate-y-3"
              onClick={() => {
                router.push(data[0].url);
              }}
            >
              <div className=" max-w-xl mr-12">{data[0].video}</div>
              <div className="flex flex-col justify-center">
                <div className="font-bold text-xl mb-3">{data[0].title}</div>
                <div className="text-gray-400">{data[0].hashtag}</div>
              </div>
            </div>
          </div>
          <div className=" max-w-5xl mx-auto grid grid-cols-2 gap-16 my-20">
            {data.map((val, idx) =>
              idx > 0 ? (
                <div key={idx}>
                  <div
                    className="mb-16 w-full mx-auto cursor-pointer  transition duration-200 transform hover:-translate-y-3"
                    onClick={() => {
                      router.push(val.url);
                    }}
                    style={{ height: "24rem" }}
                  >
                    <div className="mb-10">{val.video}</div>
                    <div className=" font-bold text-xl mb-3">{val.title}</div>
                    <div className=" text-gray-400">{val.hashtag}</div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
}
