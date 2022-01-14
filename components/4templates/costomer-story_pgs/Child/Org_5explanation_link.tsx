import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Vdo from "../../../1atoms/Vdo";
import Org_explanation_link from "../ExerciseAids/Org_explanation_link";

export default function App() {
  const data = {
    title: (
      <>
        매출 5배 증가했어요. <Br_mo />
        <Br_pc />
        일은 줄고 매출은 오르고!
      </>
    ),
    content: (
      <>
        <Vdo
          src="/assets/고객반응/고객반응_유아/4"
          className=" max-w-xs mx-auto"
        />
        <div className="mt-14 ">
          처음에는 문의량이 줄어서 사실 겁이 많이 났어요. 우리 제품에 대해
          관심이 떨어졌구나 생각과 함께 매출도 그만큼 줄까봐 걱정 되더라구요.
          그런 걱정을 비웃기라도 하듯 매출은 기존 대비 5배 이상 늘었어요.{" "}
          <b>
            고객님들 입장에선 안전과 관련된 인증서보다 아이가 직접 사용하는
            영상이 훨씬 믿음이 가나봐요 ㅎㅎ{" "}
          </b>
          <br />
          <br />
          문의가 줄고 매출이 올라서 너무 좋고, 무엇보다 콘텐츠의 퀄리티가 너무
          좋아서 "내가 고객이라도 이건 산다" 라고 생각이 들었어요. 말 그대로
          문의는 줄었는데 매출은 배로 올라서 진짜 우리 아이 태어났을 때만큼
          행복했고, 우리 아이에게 자랑스러운 엄마가 된 것 같아서 뿌듯해요.
        </div>
      </>
    ),

    linkData: {
      title: (
        <>
          매출이 5배 증가한 마케팅
          <Br_mo />
          자세히 보기
        </>
      ),
      url: "/service",
    },
  };

  return <Org_explanation_link data={data} />;
}
