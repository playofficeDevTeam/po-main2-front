import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import useIsMobile from "../../../hooks/useIsMobile";
import Org_explanation_link from "../ExerciseAids/Org_explanation_link";
import Vdo from "../../../1atoms/Vdo";

export default function App() {
  const isMobile = useIsMobile();

  const data = {
    title: (
      <>
        고객의 걱정을 <Br_mo />
        해소시켜주는 <Br_pc /> 콘텐츠로
        <Br_mo />
        상세페이지를 보강했더니
        <Br_mo />
        <Br_pc />
        구매전환율이 <Br_mo />
        18배나 올랐어요.
      </>
    ),
    content: (
      <>
        {isMobile ? (
          <>
            <Vdo
              src="/assets/고객반응/고객반응_건강식품/3_1mobile"
              className=" max-w-xs mx-auto rounded-3xl"
            />{" "}
            <img
              src="/assets/고객반응/고객반응_건강식품/3_2mobile.png"
              alt="3_2mobile.png"
              className="max-w-xs w-11/12 mx-auto"
            />
          </>
        ) : (
          <div className="">
            <Vdo
              src="/assets/고객반응/고객반응_건강식품/3"
              className=" mx-auto"
            />
          </div>
        )}

        <div className="mt-14">
          컨설팅 분석에 따르면 "40대 여성이 가장 많이 찾고 '과연 꾸준히 챙겨
          먹을 수 있을까' 라는 걱정이 강하다" 라고 하셨어요. '어떤 콜라겐이
          흡수율이 좋을까?"를 고민할 줄 알았는데,{" "}
          <b>
            오히려 '꾸준히 챙겨 먹을 수 있을까?'라는 니즈를 새롭게 알게
            되었어요.
          </b>{" "}
          <br />
          <br />
          젊어보이고 싶은 고객의 욕구를 충족시키기 위해 연령대가 젊은
          인플루언서분들을 매치해 주셨어요. 그리고, '내가 잘 챙겨 먹을 수
          있을지'를 걱정하는 고객에게 무의식적으로 '잘 챙겨 먹을 수 있겠다!'라는
          것을 느끼게 하는 콘텐츠로 기획되었어요.{" "}
          <b>
            '집, 야외 등 어디서든 쉽게 챙겨 먹을 수 있다'는 컨셉의 콘텐츠로
            진행해 주셨고, 상세페이지에 콘텐츠를 활용해서 구매전환율 27%까지
            달성했습니다!
          </b>
        </div>
      </>
    ),

    linkData: {
      title: (
        <>
          구매전환율 18배 올린 마케팅
          <Br_mo />
          자세히 보기
        </>
      ),
      url: "/service",
    },
  };

  return <Org_explanation_link data={data} />;
}
