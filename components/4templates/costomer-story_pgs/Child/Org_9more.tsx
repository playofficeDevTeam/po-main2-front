import Org_9more_R_ from "../ExerciseAids/Org_9more_R_";

const defaultData = {
  title: <>고객사례 더보기</>,
  contents: [
    {
      src: "/assets/서비스_비주얼/1_2.png",
      title: (
        <>
          “상세페이지에 콘텐츠 잘 활용하여 <br />
          매출 27배 상승.”
        </>
      ),
      param: (
        <div className="center">
          <img
            src="/assets/service_Icons/운동기구.png"
            alt="운동기구"
            className="inline h-5 relative right-2"
          />{" "}
          운동기구 브랜드 Y사
        </div>
      ),
      url: "/costomer-story/fitness",
    },
    {
      src: "/assets/서비스_비주얼/광고개선.png",
      title: (
        <>
          “광고 시작 한 달만에 <br />
          매출액 1억 달성했습니다.”
        </>
      ),
      param: (
        <div className="center">
          <img
            src="/assets/service_Icons/압박스타킹.png"
            alt="압박스타킹"
            className="inline h-5 relative right-2"
          />{" "}
          압박스타킹 브랜드 B사
        </div>
      ),
      url: "/costomer-story/exercise-aids",
    },
  ],
};

export default function App({ data = defaultData }) {
  return <Org_9more_R_ data={data} />;
}
