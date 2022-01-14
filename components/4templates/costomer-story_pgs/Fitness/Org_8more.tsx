import Org_9more_R_ from "../ExerciseAids/Org_9more_R_";

const defaultData = {
  title: <>고객사례 더보기</>,
  contents: [
    {
      src: "/assets/서비스_비주얼/1_1.png",
      title: (
        <>
          “상세페이지마다 이 영상 사용하고,
          <br />
          평균 구매전환율 27% 달성했어요”
        </>
      ),
      param: (
        <div className="center">
          <img
            src="/assets/service_Icons/건강 기능 식품.png"
            alt="건강 기능 식품"
            className="inline h-5 relative right-2"
          />{" "}
          건강 기능 식품 브랜드 M사
        </div>
      ),
      url: "/costomer-story/health-food",
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
