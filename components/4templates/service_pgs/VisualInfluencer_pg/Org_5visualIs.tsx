import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "../../../common/Layout";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Vdo from "../../../1atoms/Vdo";

const defaultData = {
  title: (
    <>
      [비주얼 인플루언서 콘텐츠]는 <br />
      ‘매출에 직접 기여’합니다.
    </>
  ),
  content: (
    <>
      단순 인증 ‘사진’이 아닌 <Br_mo /> 제품의 핵심가치를
      <Br_pc />
      매력적으로
      <Br_mo />
      전달하는 “콘텐츠”입니다. <br />
      <b>
        2021년 1분기 고객사의 매출을
        <Br_mo />
        평균 11배 상승시켰습니다.
      </b>
    </>
  ),
};

export default function App({ data = defaultData }) {
  const isMobile = useReactiveVar(isMobileVar);
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <section className="">
      <div className=" center-col text-center">
        <h1 className="mo-h1 mb-7">{data.title}</h1>
        <div className="text-lg mb-7 w-9/12 mx-auto">{data.content}</div>
      </div>
      <div className="mo-max">
        <Vdo src="/assets/서비스_비주얼/2" className=" rounded-t-lg" />
      </div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className="">
      <div className="center-col text-center">
        <h1 className="pc-h1 mb-7">{data.title}</h1>
        <div className="text-lg mb-7 w-9/12 mx-auto">{data.content}</div>
      </div>
      <div className="mo-max flex items-end" style={{ height: "43rem" }}>
        <Vdo src="/assets/서비스_비주얼/2" className=" rounded-t-lg" />
      </div>
    </section>
  );
}
