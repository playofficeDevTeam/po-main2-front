import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import useIsMobile from "../../../hooks/useIsMobile";
import Vdo from "../../../1atoms/Vdo";
import Image from "next/image";

export default function App() {
  const isMobile = useIsMobile();
  const data = {
    title: (
      <>
        비주얼 인플루언서
        <Br_mo />
        영상 콘텐츠를
        <Br_pc />
        상세페이지에 <Br_mo />
        업로드하고나서
        <Br_pc />
        <Br_mo />
        단순 문의가 40% 감소해서
        <Br_mo /> 일이 줄었어요.
      </>
    ),
    content: (
      <>
        {isMobile ? (
          <>
            <Vdo
              src="/assets/고객반응/고객반응_유아/3_1_mobile"
              className=" max-w-xs mx-auto rounded-xl"
            />{" "}
            <img
              src="/assets/고객반응/고객반응_유아/3_2_mobile.png"
              alt="3_2_mobile"
              className=" max-w-xs w-11/12 mx-auto"
            />
          </>
        ) : (
          <div className="w-11/12 mx-auto">
            <Vdo
              src="/assets/고객반응/고객반응_유아/3_pc"
              className=" mx-auto"
            />
          </div>
        )}
        {isMobile ? (
          <div className="mt-14">
            고객은 안전에 대해 여전히 염려하고 있고, 그 부분은 '우리 아이가
            사용했을 때 괜찮나' 라는 의심입니다, 그렇기에 더 임팩트 있게
            안전하다는 걸 직접적으로 보여줘야 한다는 전략을 제안해 주셨어요.
            <br />
            <br />
            아이들이 직접 소독제를 사용하는 비주얼 인플루언서 영상 콘텐츠로
            상세페이지를 수정하고나서 제 하루 일과는 달라졌어요. <br />
            원래 종일 문의, 답변하고 택배 조금 싸다가 퇴근하고 그랬는데 이제는{" "}
            <b>문의는 40% 줄고, 택배 싸는 시간이 더 많아졌어요!</b>
          </div>
        ) : (
          <div className="mt-14">
            "고객은 안전에 대해 여전히 염려하고 있고, 그 부분은 '우리 아이가
            사용했을 때 괜찮나' 라는 의심입니다, 그렇기에 더 임팩트 있게
            안전하다는 걸 직접적으로 보여줘야 합니다." 라고 전략을 제안해
            주셨어요. <br /> <br />
            아이들이 직접 소독제를 사용하는 비주얼 인플루언서 영상 콘텐츠로
            상세페이지를 수정하고나서 제 하루 일과는 달라졌어요. <br />
            원래 종일 문의사항에 답변하고 택배 조금 싸다가 퇴근하고 그랬는데
            이제 <b>문의는 40% 줄고, 택배 싸는 시간이 더 많아졌어요!</b>
          </div>
        )}
      </>
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
