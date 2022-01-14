import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import useIsMobile from "../../../hooks/useIsMobile";

export default function App({ trigger = true }) {
  const isMobile = useIsMobile();
  const data = {
    title: (
      <>
        체류시간이 증가하니까
        <Br_mo />
        <Br_pc />
        구매전환율이
        <Br_mo />
        4%에서 25%가 되었습니다.
      </>
    ),
    content: isMobile ? (
      // 모바일
      // 모바일
      // 모바일
      <>
        <div className="flex justify-center">
          <div
            className={`relative left-4 transition duration-200 transform ${
              trigger ? "" : " opacity-0 translate-y-4"
            }`}
          >
            <img
              src="/assets/고객반응/고객반응_운동기구/3_1.png"
              alt="3_1"
              className=""
            />
          </div>
          <div
            className={`relative right-6 transition duration-200 transform delay-200 ${
              trigger ? "" : "opacity-0 -translate-x-4"
            }`}
          >
            <img src="/assets/고객반응/고객반응_운동기구/3_2.png" alt="3_2" />
          </div>
        </div>
        <div className="mt-14">
          <b>
            제가 만든 영상보다 비주얼 인플루언서 영상 콘텐츠를 확실히 더 오래
            봤어요.
          </b>{" "}
          대부분 방문해주신 고객님들은 저희 제품을 스쿼트 보조 기구로 알고
          방문하세요. 그런데 영상을 더 오래 자세히 보고나면 팔굽혀펴기나 삼두,
          코어 등 여러 부위를 운동할 수 있다는 것을 알게 되죠. 결국 우리 제품
          하나만 사면 여러 부위 운동이 가능하니까 가성비가 좋다고 생각해서
          구매한다고 하시더라구요. <br />
          <br />
          자랑은 아닌데 사실 경쟁사보다는 가격대가 조금 있는 편인데도 불구하고
          경쟁사를 제치고 카테고리 1등을 했습니다. 결론적으로{" "}
          <b>체류시간이 올라서 구매전환율도 4.1%에서 25%로 확 뛰었습니다.</b>
        </div>
      </>
    ) : (
      // 피씨
      // 피씨
      // 피씨
      <>
        <div className="flex justify-center">
          <div
            className={`relative left-6 transition duration-200 transform ${
              trigger ? "" : " opacity-0 translate-y-4"
            }`}
          >
            <img
              src="/assets/고객반응/고객반응_운동기구/3_1.png"
              alt="3_1"
              className=""
            />
          </div>
          <div
            className={`relative right-8 transition duration-200 transform delay-200 ${
              trigger ? "" : "opacity-0 -translate-x-4"
            }`}
          >
            <img src="/assets/고객반응/고객반응_운동기구/3_2.png" alt="3_2" />
          </div>
        </div>
        <div className="mt-14">
          <b>
            제가 만든 영상보다 비주얼 인플루언서 영상 콘텐츠를 확실히 더 오래
            봤어요.
          </b>{" "}
          대부분 방문해주신 고객님들은 저희 제품을 스쿼트 보조 기구로 알고
          방문하세요. 그런데 영상을 더 오래 자세히 보고나면 팔굽혀펴기나 삼두,
          코어 등 여러 부위를 운동할 수 있다는 것을 알게 되죠. 결국 우리 제품
          하나만 사면 여러 부위 운동이 가능하니까 가성비가 좋다고 생각해서
          구매한다고 하시더라구요. <br />
          <br />
          자랑은 아닌데 사실 경쟁사보다는 가격대가 조금 있는 편인데도 불구하고
          경쟁사를 제치고 카테고리 1등을 했습니다. 결론적으로{" "}
          <b>체류시간이 올라서 구매전환율도 4.1%에서 25%로 확 뛰었습니다.</b>
        </div>
      </>
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
