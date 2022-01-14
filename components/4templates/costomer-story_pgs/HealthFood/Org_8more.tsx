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
      src: "/assets/서비스_비주얼/1_3.png",
      title: (
        <>
          “상세페이지, 광고 다 뜯어고치니까
          <br />
          15차 완판했어요!”
        </>
      ),
      param: (
        <div className="center">
          <img
            src="/assets/service_Icons/유아.png"
            alt="유아"
            className="inline h-5 relative right-2"
          />{" "}
          유아 브랜드 B사
        </div>
      ),
      url: "/costomer-story/child",
    },
  ],
};

export default function App({ data = defaultData }) {
  return <Org_9more_R_ data={data} />;
}
