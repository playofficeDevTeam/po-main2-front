import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import useIsMobile from "../../../hooks/useIsMobile";
import Vdo from "../../../1atoms/Vdo";
import Org_explanation_link from "../ExerciseAids/Org_explanation_link";

export default function App() {
  const isMobile = useIsMobile();
  const data = {
    title: (
      <>
        직접 찍은 운동 영상보다 <Br_mo />
        <Br_pc />
        포케팅에서 제작한 <Br_mo />
        후기형 영상이 7배 <Br_mo />더 반응이 좋더라구요.
      </>
    ),
    content: (
      <>
        {isMobile ? (
          <>
            <Vdo
              src="/assets/고객반응/고객반응_운동기구/2_1_mobile"
              className=" max-w-xs mx-auto rounded-3xl"
            />{" "}
            <img
              src="/assets/고객반응/고객반응_운동기구/2_2_mobile.png"
              alt="2_2_mobile"
              className="max-w-xs w-11/12 mx-auto"
            />
          </>
        ) : (
          <div className="w-11/12 mx-auto">
            <Vdo
              src="/assets/고객반응/고객반응_운동기구/2"
              className=" mx-auto"
            />
          </div>
        )}

        <div className="mt-14">
          같이 창업한 친구랑 홈트레이닝 기구 사용 영상을 직접 찍어 올려
          다방면으로 홍보를 해봤습니다. 근데 민망하게도 노력한거에 비해 반응이
          없었어요..ㅋㅋ 뭐가 문제인지 몰라 이것저것 찾아봤을 때 상세페이지만
          고쳐도 매출이 오른다는 자료를 봤었어요. 자료를 보고도 어떻게 고쳐야할
          지 감이 안 잡혔는데, 마침 인스타에서 5배 더 잘 팔리는 상세페이지라는
          광고가 보이더라구요ㅎㅎ 그렇게 비주얼 인플루언서 마케팅을 알게 되어서
          진행했습니다. <br /> <br />
          <b>
            비주얼 인플루언서 영상 콘텐츠를 상세페이지에 넣고나서 체류시간이 7배
            올랐고, 콘텐츠의 주체가 바뀌었을 뿐인데, 결과가 완전 달라서
            신기했어요.
          </b>{" "}
          생각해보면 물건 파는 사람이 좋다고 하는 것보다 물건 산 사람이 ‘써보니
          좋더라’ 하는게 훨씬 더 설득력 있잖아요. <br />
          거기다 기획, 제작을 전문으로 해서 그런지 퍼포먼스도 장난 아니고,
          자연스러운 콘텐츠가 나와서 보자마자 바로 잘 될 거라 확신했습니다.
        </div>
      </>
    ),
    linkData: {
      title: (
        <>
          고객에게 7배 더 반응이 좋은 <Br_mo />
          콘텐츠 마케팅 자세히 보기
        </>
      ),
      url: "/service",
    },
  };

  return <Org_explanation_link data={data} />;
}
