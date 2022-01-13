import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Org_2explanation_R_ from "./Org_2explanation_R_";

export default function App() {
  return (
    <Org_2explanation_R_
      data={{
        title: (
          <>
            광고 성과가 계속 안 좋아서
            <Br_mo />
            제품 문제가 아닐까..? 라는 <br /> 생각이 들 때, 이 광고를
            <Br_mo />
            마주치고 깜짝 놀랬죠.
          </>
        ),
        content: (
          <>
            <img
              src="/assets/고객반응/고객반응_운동보조/2.png"
              alt="2.png"
              className="w-full max-w-xs mx-auto "
            />
            <div className=" text-sm text-gray-400 text-center mt-3 mb-10 ">
              양팀장님이 보고 공감해서 캡쳐한 캡쳐본
            </div>
            <div className="">
              <b>신제품 광고를 맡아서 진행하게 되었는데, </b>
              출시 후 3주 동안 열심히 바이럴, 퍼포먼스 마케팅 등을 진행했지만
              판매는 40건.. 너무 처참했어요. <br />
              페북/인스타 광고를 집행하고 있었지만, 하필 큰 규모의 경쟁사가
              공격적으로 광고를 하고 있던 시기였고 대충봐도 게재 중인 광고의
              숫자만 300여개가 넘었으니 비교적 예산이 적은 우리 회사가 당해내기
              역부족이겠다 싶었습니다. <br />
              <br />
              ‘혹시 제품이 문제 아닌가’라는 마케터의 전형적인 합리화가 머리 속에
              떠오를 때쯤 저희 회사 이사님과 현실적으로 사용 가능한 예산을
              논의하고 <b>600만원의 총알을 들고</b> 최후의 일격(?)을 위해
              에이전시를 찾아 나섰습니다.
              <br />
              <br />
              때마침 인스타그램에서 이런 광고 문구를 보게 되었어요.
              <br />
              <b>
                “마케터님, 혹시 제품이 문제라고 생각된다면 콘텐츠부터
                의심해보세요.”
              </b>
              <br />
              <br />
              제 생각이 읽힌 것 같아 순간 소름이 돋아서 아직도 제 휴대폰에 그
              광고 캡쳐사진이 남아 있습니다.ㅎㅎ
              <br />
              당장 클릭했죠. 마케터들은 콘텐츠가 얼마나 중요한지 잘 알거든요.
              세팅보다 콘텐츠!
            </div>
          </>
        ),
      }}
    />
  );
}
