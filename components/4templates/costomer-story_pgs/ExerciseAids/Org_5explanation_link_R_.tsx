import Link from "next/link";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import useIsMobile from "../../../hooks/useIsMobile";
import Org_2explanation_R_ from "./Org_2explanation_R_";

export default function App() {
  const isMobile = useIsMobile();
  const data = {
    title: (
      <>
        여러가지 콘텐츠 유형 중 <Br_mo />
        비주얼 인플루언서
        <Br_mo />
        콘텐츠는 <Br_pc /> 고객을
        <Br_mo />
        가장 잘 설득하는
        <Br_mo />
        콘텐츠 유형이라는 게<Br_mo />
        증명됐어요.
      </>
    ),
    content: (
      <>
        <img
          src="/assets/고객반응/고객반응_운동보조/5.png"
          alt="5.png"
          className={
            isMobile ? "w-full max-w-xs mx-auto mb-10" : "w-7/11 mx-auto mb-10"
          }
        />
        <div className="">
          남은 예산은 모두 페이스북 광고로 진행했고
          <b>
            세팅은 손대지 않고 소재만 추가했습니다. <br />
            1개월정도 운영하고 매출 1억을 달성
          </b>
          해서 입사 후 이렇게 짧은 기간 단일 제품으로, 그것도 신제품으로는 처음
          보는 매출이였어요.
          <br />
          <br />
          일단 포케팅팀의 전략기획 매니저님이 권장해주신대로 제작 된 콘텐츠를
          내부에서 선별하지 않고 모두 광고로 등록했습니다. 단, 어느정도 테스트가
          될 수 있도록 A/B테스트까지는 아니더라도 동일 타겟에게 콘텐츠 유형별로
          세트를 나누어 집행해봤죠. 신기하게도 비주얼 인플루언서 콘텐츠를 사용한
          광고세트의 <b>평균 ROAS가 기존 광고보다 약 9배정도 높았고</b>, 이런
          차이를 보니 콘텐츠의 유형에 따라서 성과가 갈리는데
          <b> 비주얼 인플루언서 콘텐츠가</b> 고객의 어떤 부분을 자극하는 것인지
          정확히는 알 수 없지만{" "}
          <b>
            높은 확률로 고객을 잘 설득하는 콘텐츠 유형이라는 것은 확실하게
            느껴지더라구요.
          </b>
        </div>
      </>
    ),
    linkData: {
      title: (
        <>
          1개월만에 1억 매출 만든 콘텐츠 마케팅
          <Br_mo />
          자세히 보기
        </>
      ),
      url: "/service",
    },
  };
  return <Main data={data} />;
}

const defaultData = {
  title: <></>,
  content: <></>,
  linkData: {
    title: <></>,
    url: "",
  },
};

function Main({ data = defaultData }) {
  const isMobile = useIsMobile();
  return (
    <>
      <Org_2explanation_R_ data={data} />
      <div className="mb-12"></div>

      {isMobile ? (
        <div className=" text-center underline font-bold text-blue-600 flex flex-col justify-center">
          <div className="flex justify-center mb-2">
            <img src="/assets/service_Icons/Icon_fire.png" alt="Icon_pushpin" />
          </div>
          <Link href={data.linkData.url}>
            <a>{data.linkData.title}</a>
          </Link>
        </div>
      ) : (
        <div className=" text-center underline font-bold text-blue-600 flex justify-center">
          <div className="flex justify-center mr-2">
            <img src="/assets/service_Icons/Icon_fire.png" alt="Icon_pushpin" />
          </div>
          <Link href={data.linkData.url}>
            <a>{data.linkData.title}</a>
          </Link>
        </div>
      )}
    </>
  );
}
