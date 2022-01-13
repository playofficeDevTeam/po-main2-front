import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Vdo from "../../../1atoms/Vdo";
import useIsMobile from "../../../hooks/useIsMobile";
import Org_2explanation_R_ from "./Org_2explanation_R_";

export default function App() {
  const isMobile = useIsMobile();
  return (
    <Org_2explanation_R_
      data={{
        title: (
          <>
            마케터라면 대부분
            <Br_mo />
            공감할거예요.
            <Br_pc />
            성과 내는
            <Br_mo />
            가장 확실한 방법은 결국
            <br />
            ‘고객을 사로잡는 콘텐츠’다.
          </>
        ),
        content: (
          <>
            <div
              className={isMobile ? "" : "flex justify-center  mx-auto  w-80"}
            >
              <Vdo
                src="/assets/고객반응/고객반응_운동보조/3"
                className={isMobile ? " rounded-md max-w-xs mx-auto mb-4" : " "}
              />
              <Vdo
                src="/assets/고객반응/고객반응_운동보조/4"
                className={
                  isMobile ? " rounded-md max-w-xs mx-auto mb-10" : " "
                }
              />
            </div>
            <div className="mb-16"></div>
            <div className="">
              포케팅이 제작했던 광고 콘텐츠의 레퍼런스를 보는데, 이 정도만 되도
              클릭률은 훨씬 더 높아지겠구나 싶었습니다. <br />
              또 콘텐츠 제작에 특화 된 비주얼 크리에이터가 가장 많이 소속된
              회사라는 점이 제가 제작하는 것보다 결과물이 훨씬 좋겠다 싶었구요.
              저희 회사는 전문 콘텐츠 마케터나 광고 디자이너가 따로 없어서 항상
              제가 직접 이미지나 영상까지 만들고 있었습니다.
              <br />
              <br />
              당일 회의를 통해 바로 포케팅에 의뢰했고, 광고 소스는 다다익선이라
              과감하게 예산의 50%(300정도)를 콘텐츠 제작에 투자했습니다.
              <br />
              <br />
              의뢰 결과로{" "}
              <b>
                영상 33개, 이미지 70여개를 전달 받았고, 인스타그램 인기게시물에
                약 20개 정도 노출
              </b>
              되었습니다.
              <br />
              인기게시물 노출은 기대보다 많은 방문자를 만들어주어서 깜짝
              놀랐어요.
              <br />
              <b>
                쇼핑몰 유입 통계를 보니 방문자가 기존 대비 30%정도 늘었고,
                인스타그램 유입이더라구요.
              </b>
              <br />
              <br />
              더불어, 광고 소재로 사용할 목적을 미리 말씀드려서 그런지 제작 된
              영상을 활용해 광고 콘텐츠도 따로 만들어 주셨어요.
              <br />
              <br />
              개인적으로{" "}
              <b>
                만들어주신 광고 콘텐츠를 보고 많이 놀랐었습니다. 고객 니즈를
                아주 정확하게 꼬집어 매력적인 메시지를 던지는 콘텐츠
              </b>
              였습니다.
              <br />
              <br />
              기대되면서도 급한 마음에 바로 만들어주신 광고 콘텐츠를
              게재했습니다.
            </div>
          </>
        ),
      }}
    />
  );
}
