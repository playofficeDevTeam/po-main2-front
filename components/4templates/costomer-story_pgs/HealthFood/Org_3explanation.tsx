import Br_mo from "../../../1atoms/Br_mo";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";

export default function App() {
  const data = {
    title: (
      <>
        기존 상세페이지의 <br />
        문제점부터 찾아 주셨어요.
      </>
    ),
    content: (
      <div className="">
        건기식 시장에서는 거의 모든 브랜드가 콜라겐의 흡수율, 형태, 맛에 초점을
        맞추고 있어요. 건강기능식품은 당연히 효능, 맛이 가장 중요하다고 생각
        했거든요. 그래서 타 브랜드처럼 상세페이지 구성을 똑같이 했어요. 분명
        수요가 있는 상품인데 매출이 나지 않아 마케팅을 의뢰 했을 때 매니저님이
        해주신 말이 아직 기억에 남아요. <br />
        <br />
        <b>
          “콜라겐을 구매하는 고객이 가장 원하는 단 한가지 내용은 무엇인가요?”{" "}
        </b>
        <br />
        <br />이 말을 들었을 때 아무 대답을 못했어요. 결국, 고객이 원하는 내용이
        뭔지 고민하지도 않고 뻔한 내용만 저희끼리 좋다고 강조 하고 있던
        셈이었죠..(웃음){" "}
        <b>
          콘텐츠의 방향을 고객에서 부터 출발해 진행해 주셨고, 그제서야 고객의
          진짜 니즈를 알게 되었어요.
        </b>
      </div>
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
