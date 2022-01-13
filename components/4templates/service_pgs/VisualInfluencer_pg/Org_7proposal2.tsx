import Vdo from "../../../1atoms/Vdo";
import useIsMobile from "../../../hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <section className="py-20">
      <div className="mo-max">
        <div className="center text-lg font-bold text-gray-600 mb-4 ">
          <img
            src="assets/서비스_비주얼/아이콘/광고활용.png"
            className="h-7 mr-2"
          />
          광고 개선
        </div>
        <h2 className="mo-h1 center-col text-center mb-6">
          저성과 광고의 가장 큰 원인은
          <br />
          “소재”
          <br />
          지금 당장 바꾸세요.
        </h2>
        <h3 className="center-col text-center mb-10 ">
          비주얼 인플루언서 콘텐츠를 <br />
          소재로 사용한 광고는 ROAS가 <br />
          평균 4배 높았습니다.
        </h3>

        <div className="grid gap-2">
          <div
            className="mb-52"
            style={{ height: "50vw", maxHeight: "13rem", minHeight: "12rem" }}
          >
            <div className="h-0 relative z-10 top-4 w-64 mx-auto">
              <div className="">광고 개선</div>
            </div>
            <div className="center">
              <Vdo
                src="/assets/서비스_비주얼/4_1_mobile"
                className=" rounded-3xl"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="h-0 relative z-10 top-4 w-64 mx-auto">
              <div className="">
                소재 유형별 ROAS 비교
                <div className="text-sm font-bold text-gray-400">
                  페이스북 광고 60일 운영 데이터
                </div>
              </div>
            </div>
            <img
              src="assets/서비스_비주얼/4_2.png"
              className="rounded-3xl relative mx-auto"
            />
          </div>
        </div>

        <div className="mo-max p-4 mt-8 bg-white border-2 rounded-2xl">
          <div className="flex items-center mb-4">
            <img
              src="assets/서비스_비주얼/아이콘/리뷰 아이콘.png"
              alt="리뷰아이콘"
              className="h-14 mr-4"
            />
            <div className="font-bold text-gray-600">
              안경 브랜드 W사
              <br />
              김** 팀장
            </div>
          </div>
          <div className="px-1">
            <div className="mb-1 text-orange-500 font-bold">
              페이스북 광고 ROAS : 11.7
            </div>
            <div>
              “100가지 정도 소재를 유형별로 테스트했는데, 비주얼 인플루언서
              콘텐츠를 사용한 광고가 오랜 기간동안 ROAS가 가장 높았습니다.
              만족스럽고, 앞으로도 잘 부탁 드릴게요~”
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className="py-20">
      <div className="pc-max">
        <div className="center text-lg font-bold text-gray-600 mb-4 ">
          <img
            src="assets/서비스_비주얼/아이콘/광고활용.png"
            className="h-7 mr-2"
          />
          광고 개선
        </div>
        <h2 className=" text-3xl font-bold mb-6  flex flex-col items-center text-center">
          저성과 광고의 가장 큰 원인은 “소재” <br />
          지금 당장 바꾸세요.
        </h2>
        <h3 className="mb-16 text-lg flex flex-col items-center text-center">
          비주얼 인플루언서 콘텐츠를 소재로 사용한 <br />
          광고는 ROAS가 평균 4배 높았습니다.
        </h3>

        <div className="flex justify-center mb-14">
          <div className="mr-8" style={{ height: "30rem" }}>
            <div className="h-0 relative z-10 top-8 w-80 mx-auto">
              <div className="">광고 개선</div>
            </div>
            <div className="center">
              <Vdo
                src="/assets/서비스_비주얼/4_1"
                className="rounded-3xl"
                style={{ width: "24rem" }}
              />
            </div>
          </div>

          <div>
            <div className="h-0 relative z-10 top-8 w-80 mx-auto">
              <div className="">
                소재 유형별 ROAS 비교
                <div className="text-sm font-bold text-gray-400">
                  페이스북 광고 60일 운영 데이터
                </div>
              </div>
            </div>
            <img
              src="/assets/서비스_비주얼/4_2.png"
              className="rounded-3xl relative mx-auto"
              style={{ width: "24rem" }}
            />
          </div>
        </div>
        <div className="pc-max">
          <div className="w-6/12 mx-auto p-4 mt-8  bg-white border-2 rounded-2xl">
            <div className="flex items-center mb-4">
              <img
                src="/assets/서비스_비주얼/아이콘/리뷰 아이콘.png"
                alt="리뷰아이콘"
                className="h-14 mr-4"
              />
              <div className="font-bold text-gray-600">
                안경 브랜드 W사 <br />
                김** 팀장
              </div>
            </div>
            <div className="px-1">
              <div className="mb-1 text-orange-500 font-bold">
                페이스북 광고 ROAS : 11.7
              </div>
              <div>
                “100가지 정도 소재를 유형별로 테스트했는데, 비주얼 인플루언서
                콘텐츠를 사용한 광고가 오랜 기간동안 ROAS가 가장 높았습니다.
                만족스럽고, 앞으로도 잘 부탁 드릴게요~”
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
