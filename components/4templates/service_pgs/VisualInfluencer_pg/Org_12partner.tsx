import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "../../../common/Layout";

export default function App() {
  const isMobile = useReactiveVar(isMobileVar);
  return isMobile ? (
    <section className=" py-20">
      <div className="mo-max">
        <h1 className="mo-h1 text-center mb-12">
          잘나가는 8,500개의 <br />
          기업이 선택했습니다.
        </h1>
        <div className="">
          <img
            className=""
            src="/assets/서비스_비주얼/파트너사_mo.png"
            alt="메인"
          />
        </div>
      </div>
    </section>
  ) : (
    <section className=" py-40">
      <div className="pc-max">
        <h1 className="pc-h1 text-center  mb-16">
          잘나가는 8,500개의 기업이 선택했습니다.
        </h1>
        <div className="">
          <img
            className=""
            src="/assets/서비스_비주얼/파트너사.png"
            alt="메인"
          />
        </div>
      </div>
    </section>
  );
}
