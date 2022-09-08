import Br_mo from "../../../1atoms/Br_mo";
import Vdo from "../../../1atoms/Vdo";
import useIsMobile from "../../../hooks/useIsMobile";
import Atm_autoCarousel1 from "./Atm_autoCarousel1";

const defaultData = [
  <Vdo
    key={1}
    src="/assets/고객반응/고객반응_운동기구/4_1"
    className=" mx-auto"
  />,
  <Vdo
    key={2}
    src="/assets/고객반응/고객반응_운동기구/4_2"
    className=" mx-auto"
  />,
  <Vdo
    key={3}
    src="/assets/고객반응/고객반응_운동기구/4_3"
    className=" mx-auto"
  />,
  <Vdo
    key={4}
    src="/assets/고객반응/고객반응_운동기구/4_4"
    className=" mx-auto"
  />,
];

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return (
    <section className="">
      {isMobile ? (
        <div className="">
          <div className="mo-max mb-10">
            <div className="mo-h1">
              비주얼 인플루언서
              <br />
              콘텐츠 레퍼런스
            </div>
          </div>
          <div
            className=""
            style={{ height: "120vw", maxHeight: "36rem", minHeight: "24rem" }}
          >
            <Atm_autoCarousel1>{data}</Atm_autoCarousel1>
          </div>
        </div>
      ) : (
        <div className="">
          <div className=" pc-max mb-10">
            <div className="pc-h1">
              비주얼 인플루언서
              <Br_mo />
              콘텐츠 레퍼런스
            </div>
          </div>
          <div className="pc-max">
            <Atm_autoCarousel1>{data}</Atm_autoCarousel1>
          </div>
        </div>
      )}
    </section>
  );
}
