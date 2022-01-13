import { isMobile } from "react-device-detect";
import Org_9more_R_ from "../ExerciseAids/Org_9more_R_";

const defaultData = {
  title: <>고객사례 더보기</>,
  contents: [
    {
      src: require("/home/po-main1-front/src/4pages/ServicePages/Service_visual2/assets/1_2.png")
        .default,
      title: (
        <>
          “상세페이지에 콘텐츠 잘 활용하여 <br />
          매출 27배 상승.”
        </>
      ),
      param: (
        <div className="flex items-center justify-center">
          <img
            src={
              require("/home/po-main1-front/src/assets/Icons/운동기구.png")
                .default
            }
            alt="운동기구"
            className="inline h-5 relative right-2"
          />{" "}
          운동기구 브랜드 Y사
        </div>
      ),
      linkTo: "/costomer-story/visual-influencer/fitness",
    },
    {
      src: require("/home/po-main1-front/src/4pages/ServicePages/Service_visual2/assets/1_3.png")
        .default,
      title: (
        <>
          “상세페이지, 광고 다 뜯어고치니까 <br />
          15차 완판했어요!”
        </>
      ),
      param: (
        <div className="flex items-center justify-center">
          <img
            src={
              require("/home/po-main1-front/src/assets/Icons/유아.png").default
            }
            alt="유아"
            className="inline h-5 relative right-2"
          />{" "}
          유아 브랜드 B사
        </div>
      ),
      linkTo: "/costomer-story/visual-influencer/child",
    },
  ],
};

export default function App({ data = defaultData }) {
  return <Org_9more_R_ data={data} />;
}
