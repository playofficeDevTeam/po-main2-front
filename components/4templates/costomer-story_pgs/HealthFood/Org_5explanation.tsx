import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "../ExerciseAids/Atm_bgBlue";
import Org_2explanation_R_ from "../ExerciseAids/Org_2explanation_R_";
import { requ } from "../../../../public/assets/고객반응/고객반응_건강식품/func_nameToSrc";
import Org_video from "../../../../public/assets/고객반응/고객반응_건강식품/Org_video";

export default function App({ trigger = true }) {
  const data = {
    title: (
      <>
        구매전환율
        <Br_mo />
        1.5%에서 45%까지
      </>
    ),
    content: isMobile ? (
      // 모바일
      // 모바일
      // 모바일
      // 모바일
      // 모바일
      // 모바일
      <>
        <div className="flex justify-center">
          <div
            className={`relative left-3 transition duration-200 transform ${
              trigger ? "" : " opacity-0 translate-y-4"
            }`}
          >
            <img src={requ("그래프1.png")} alt="그래프1" className="" />
          </div>
          <div
            className={`relative right-3 transition duration-200 transform delay-200 ${
              trigger ? "" : "opacity-0 -translate-x-4"
            }`}
          >
            <img src={requ("그래프2.png")} alt="그래프2" />
          </div>
        </div>
        <div className="mt-14">
          비주얼 인플루언서 마케팅 진행 전 구매전환율 1.5%에 하루 한 건도 구매가
          없었어요.{" "}
          <b>
            상세페이지에 콘텐츠를 활용한 것만으로 구매전환율이 27%대까지
            상승했고, 그 후 구매의향이 강한 고객을 데려올 수 있게 광고소재까지
            제작해 주셔서 구매전환율이 최대 45%까지 올랐습니다.
          </b>{" "}
          <br />
          <br />
          매일매일 구매성과를 보고 있으니 행복하네요. 지금은 새 캠페인을
          의뢰해서 다양한 비주얼 인플루언서 콘텐츠를 추가로 확보하고
          상세페이지와 광고 소재에도 계속 활용하고 있어요.{" "}
          <b>
            평균 구매전환율 27%에, 캠페인 진행 전 대비 약 19배 매출이 나오고
            있습니다.
          </b>{" "}
          이 자리를 빌어서 포케팅 덕분이라는 감사의 말씀을 드리고 싶네요.
          감사합니다. (웃음)
        </div>
      </>
    ) : (
      // 피씨
      // 피씨
      // 피씨
      // 피씨
      // 피씨
      // 피씨
      <>
        <div className="flex justify-center">
          <div
            className={`relative left-3 transition duration-200 transform ${
              trigger ? "" : " opacity-0 translate-y-4"
            }`}
          >
            <img src={requ("그래프1.png")} alt="그래프1" className="" />
          </div>
          <div
            className={`relative right-3 transition duration-200 transform delay-200 ${
              trigger ? "" : "opacity-0 -translate-x-4"
            }`}
          >
            <img src={requ("그래프2.png")} alt="그래프2" />
          </div>
        </div>
        <div className="mt-14">
          비주얼 인플루언서 마케팅 진행 전 구매전환율 1.5%에 하루 한 건도 구매가
          없었어요.{" "}
          <b>
            상세페이지에 콘텐츠를 활용한 것만으로 구매전환율이 27%대까지
            상승했고, 그 후 구매의향이 강한 고객을 데려올 수 있게 광고소재까지
            제작해 주셔서 구매전환율이 최대 45%까지 올랐습니다.
          </b>{" "}
          <br />
          <br />
          매일매일 구매성과를 보고 있으니 행복하네요. 지금은 새 캠페인을
          의뢰해서 다양한 비주얼 인플루언서 콘텐츠를 추가로 확보하고
          상세페이지와 광고 소재에도 계속 활용하고 있어요.{" "}
          <b>
            평균 구매전환율 27%에, 캠페인 진행 전 대비 약 19배 매출이 나오고
            있습니다.
          </b>{" "}
          이 자리를 빌어서 포케팅 덕분이라는 감사의 말씀을 드리고 싶네요.
          감사합니다. (웃음)
        </div>
      </>
    ),
  };

  return <Org_2explanation_R_ data={data} />;
}
