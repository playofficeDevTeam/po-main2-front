import Vdo from "../../../1atoms/Vdo";
import useIsMobile from "../../../hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <section className="bg-blue-50 py-20">
      <div className="mo-max">
        <h1 className="mo-h1 center-col text-center font-bold mb-20 ">
          제품 마케팅에 꼭 필요한 <br />
          비주얼 인플루언서 콘텐츠 <br />
          제작해 드릴게요.
          <br />
          이렇게 성과 높이세요!
        </h1>
        <div className="flex items-center text-lg font-bold text-gray-600 mb-4 justify-center">
          <img
            src="/assets/서비스_비주얼/아이콘/상세페이지 활용.png"
            className="h-7 mr-2"
          />
          상세페이지 강화
        </div>
        <h2 className=" mo-h1 mb-6 center-col text-center">
          고객을 설득할 수 있는 <br />
          마지막 단계, 상세페이지의 <br />
          상단에 배치하세요.
        </h2>
        <h3 className="mb-10  center-col text-center">
          비주얼 인플루언서 콘텐츠를 <br />
          상단에 배치하고 구매전환율이 <br />
          평균 5.5배 상승 했습니다.
        </h3>

        <div className="mo-max grid gap-2">
          <div
            className="mb-52"
            style={{ height: "50vw", maxHeight: "14rem", minHeight: "12rem" }}
          >
            <div className="h-0 relative z-10 top-4 w-64 mx-auto">
              <div className="">강화된 상세페이지</div>
            </div>
            <div className="center">
              <Vdo src="/assets/서비스_비주얼/3_1" className=" rounded-3xl" />
            </div>
          </div>

          <div className="mb-4">
            <div className="h-0 relative z-10 top-4 w-64 mx-auto">
              <h4 className="">
                상세페이지
                <br />
                구매전환율 변화
              </h4>
            </div>
            <img
              src="/assets/서비스_비주얼/3_2.png"
              className="rounded-3xl relative mx-auto"
            />
          </div>
        </div>

        <div className="mo-max p-4 mt-8 bg-white border-2 rounded-2xl">
          <div className="flex items-center mb-4">
            <img
              src="/assets/서비스_비주얼/아이콘/리뷰 아이콘.png"
              alt="리뷰아이콘"
              className="h-14 mr-4"
            />
            <div className="font-bold text-gray-600">
              운동복 브랜드 Z사
              <br />
              윤** 이사
            </div>
          </div>
          <div className="px-1">
            <div className="mb-1 text-orange-500 font-bold">
              상세페이지 구매전환율 증가 : 1.6% → 7.9%
            </div>
            <div>
              “상세페이지 새로 만드는 것보다 동영상 추가만 하는게 훨씬 간단한데,
              매출변화는 크네요. 제품별로 모두 진행 하겠습니다.”
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className="bg-blue-50 py-20">
      <div className="pc-max">
        <h1 className=" center-col text-center text-4xl font-bold leading-normal   mt-10 mb-28 ">
          제품 마케팅에 꼭 필요한 <br />
          비주얼 인플루언서 콘텐츠 제작해 드릴게요.
          <br />
          이렇게 성과 높이세요!
        </h1>
        <div className="flex items-center text-lg font-bold text-gray-600 mb-4 justify-center">
          <img
            src="assets/서비스_비주얼/아이콘/상세페이지 활용.png"
            className="h-7 mr-2"
          />
          상세페이지 강화
        </div>
        <h2 className="pc-h1 mb-6  flex flex-col items-center text-center ">
          고객을 설득할 수 있는 마지막 단계, <br />
          상세페이지의 상단에 배치하세요.
        </h2>
        <h2 className="mb-16 text-lg flex flex-col items-center text-center">
          비주얼 인플루언서 콘텐츠를 상단에 배치하고 <br />
          구매전환율이 평균 5.5배 상승 했습니다.
        </h2>

        <div className="flex justify-center mb-14">
          <div className="mr-8" style={{ height: "30rem" }}>
            <div className="h-0 relative z-10 top-8 w-80 mx-auto">
              <div className="">강화된 상세페이지</div>
            </div>
            <Vdo
              src="/assets/서비스_비주얼/3_1"
              className="rounded-3xl"
              style={{ height: "30rem" }}
            />
          </div>

          <div className="" style={{ height: "30rem" }}>
            <div className="h-0 relative z-10 top-8 w-80 mx-auto">
              <div className="">
                상세페이지
                <br />
                구매전환율 변화
              </div>
            </div>
            <img
              src="/assets/서비스_비주얼/3_2.png"
              className="rounded-3xl relative mx-auto h-full"
              style={{ width: "24rem" }}
            ></img>
          </div>
        </div>
        <div className="pc-max">
          <div className="w-6/12 mx-auto p-4 mt-8 bg-white border-2 rounded-2xl">
            <div className="flex items-center mb-4">
              <img
                src="/assets/서비스_비주얼/아이콘/리뷰 아이콘.png"
                alt="리뷰아이콘"
                className="h-14 mr-4"
              />
              <div className="font-bold text-gray-600">
                운동복 브랜드 Z사
                <br />
                윤** 이사
              </div>
            </div>
            <div className="px-1">
              <div className="mb-1 text-orange-500 font-bold">
                상세페이지 구매전환율 증가 : 1.6% → 7.9%
              </div>
              <div>
                “상세페이지 새로 만드는 것보다 동영상 추가만 하는게 훨씬
                간단한데, 매출변화는 크네요. 제품별로 모두 진행 하겠습니다.”
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
