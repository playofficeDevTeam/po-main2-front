import { isMobile } from "react-device-detect";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Vdo from "../../../1atoms/Vdo";
import Atm_bgBlue from "./Atm_bgBlue";
import Atm_quotesContainer from "./Atm_quotesContainer";

const defaultData = {
  title: (
    <>
      입사 후 처음으로
      <Br_mo />
      성과금 받았어요. <Br_pc />
      <Atm_bgBlue>예산 600</Atm_bgBlue>,
      <Br_mo />이 유형의 콘텐츠에 투자해서 <br />
      <Atm_bgBlue>광고 시작 한 달</Atm_bgBlue>
      만에
      <Br_mo />
      매출액 1억 달성했습니다.
    </>
  ),
  content: (
    <Vdo
      src="/assets/고객반응/고객반응_운동보조/1"
      className="rounded-md shadow-md max-w-xs mx-auto"
    />
  ),
};

export default function App({ data = defaultData }) {
  return (
    <section className="">
      {isMobile ? (
        <div className="">
          <div className="mo-max mb-10">
            <div className="w-11/12 mx-auto">
              <h2 className="mo-h1">
                <Atm_quotesContainer>{data.title}</Atm_quotesContainer>
              </h2>
            </div>
          </div>
          <div className="mo-max">{data.content}</div>
        </div>
      ) : (
        <div className="">
          <div className=" pc-max mb-16">
            <h2 className="pc-h1">
              <Atm_quotesContainer>{data.title}</Atm_quotesContainer>
            </h2>
          </div>
          <div className="pc-max">{data.content}</div>
        </div>
      )}
    </section>
  );
}
