import Org_2explanation_R_ from "./Org_2explanation_R_";
import useIsMobile from "../../../hooks/useIsMobile";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";

export default function App() {
  const isMobile = useIsMobile();

  return (
    <Org_2explanation_R_
      data={{
        title: (
          <>
            ROAS 18.05, <Br_mo />
            전환당 비용 1,430원,
            <Br_mo />
            제 광고 성과예요.
            <br />
            성과 보고 확신했어요.
            <Br_mo />
            [광고 매출은 세팅을 바꾸면
            <Br_mo />
            2배,
            <Br_pc />
            콘텐츠를 바꾸면 10배]
            <Br_mo />
            라는 것을.
          </>
        ),
        content: (
          <>
            <img
              src="/assets/고객반응/고객반응_운동보조/6.png"
              alt="6.png"
              className={
                isMobile
                  ? "w-full max-w-xs mx-auto mb-10"
                  : "w-6/12 mx-auto mb-10"
              }
            />
            <div className="">
              자세한 지표를 살펴보면 제가 페이스북 광고를{" "}
              <b>
                약 5년간 진행하면서 달성했던 성과 중 가장 좋은 성과인데, 평균
                ROAS 1800%, <Br_pc /> 평균 전환당 비용 1,400원대!
              </b>
              <br />
              즉, 쉽게 보자면 경쟁사의 공격적인 물량 광고를 극도의 효율을 발휘한
              소규모 광고로 이겨낸거죠. 예산 600으로 어림잡아도 예산 6,000정도
              되는 경쟁사를 이긴 것 같아요.
              <br />
              <br />
              페북 광고 성과뿐만 아니라 제가 이겼다고 자신있게 말할 수 있는 또
              다른 이유는 리뷰 수인데,{" "}
              <b>
                저희 제품 리뷰 수가 1개월만에 1,800개 정도가 쌓였고 경쟁 제품의
                리뷰 수가 5개월동안 1,600개 정도
              </b>
              였습니다.
              <br />
              <br />
              경쟁사는 리뷰 이벤트를 하고는 있지만, 흔히 볼 수 있는 포인트 적립
              이벤트였어요.
              <br />
              저희는 비주얼 인플루언서의 영상을 보여주면서 명예리뷰의 전당처럼
              구성하고, 베스트 영상 리뷰를 상세페이지에 넣어주는 혜택과 포인트
              혜택을 함께 제공하는 방식으로 진행했더니 고객들의 반응이 뜨거웠고,
              리뷰 수를 확보하는데 가속도가 많이 붙었던 것 같습니다.
              <br />
              <br />
              <b>
                포케팅의 비주얼 인플루언서 콘텐츠 덕분에 광고 성과와 리뷰 성과
                모두 대박내서 성과금까지 받았어요
              </b>
              🎉😍
              <br />
              제 문제를 잘 해결해주셔서 너무 감사하고 앞으로도 잘 부탁드립니다
              😊
              <br />
              서툰 필력의 후기지만 포케팅에 꼭 도움이 되면 좋겠습니다.
            </div>
          </>
        ),
      }}
    />
  );
}
