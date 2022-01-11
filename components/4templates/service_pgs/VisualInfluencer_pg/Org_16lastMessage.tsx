import { isMobile } from "react-device-detect";
import Tem_modal1 from "./Tem_modal1_scrollTo";
import Org_pricePlan_v4 from "./Org_pricePlan_v4";

const data1 = [
  <>
    온라인에서 {isMobile ? <br /> : <> </>}
    인상깊게 본 콘텐츠 10개 중{isMobile ? <br /> : <> </>}
    적어도 3개는 포케팅 작품입니다.{isMobile ? <br /> : <></>}
    <br />
    매출 평균 11배 상승시킨 콘텐츠,{isMobile ? <br /> : <> </>}
    지금 성과를 높이세요.
  </>,
];

export default function App() {
  return (
    <section
      className={` bg-gray-800 text-white ${isMobile ? "py-20" : "py-24"}`}
    >
      <div className="w-11/12 mx-auto text-center flex flex-col items-center">
        <div
          className={`font-bold mb-12 leading-normal ${
            isMobile ? "text-xl " : "text-2xl "
          }`}
        >
          {data1}
        </div>

        <Tem_modal1
          data={{
            button: (
              <div className="flex font-bold text-shadow-md bg-gradient-to-r from-orange-500 to-yellow-500 px-7 py-3 rounded-full cursor-pointer">
                <img
                  src={
                    require("/home/po-main1-front/src/assets/서비스_비주얼2/아이콘/shuttle 2.png")
                      .default
                  }
                  alt="바로 진행하기"
                  className="mr-3"
                />
                바로 진행하기
              </div>
            ),
            modal: <Org_pricePlan_v4></Org_pricePlan_v4>,
          }}
        />
      </div>
    </section>
  );
}
