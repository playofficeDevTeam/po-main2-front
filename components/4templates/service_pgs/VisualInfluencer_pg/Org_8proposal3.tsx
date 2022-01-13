import useIsMobile from "../../../hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <section className="py-20 bg-gray-50">
      <div className="mo-max">
        <div className="center text-lg font-bold text-gray-600 mb-4 ">
          <img
            src="assets/서비스_비주얼/아이콘/인기게시물.png"
            className="h-7 mr-2"
          />
          인기게시물
        </div>
        <h2 className="mo-max mo-h1 center text-center mb-6">
          비주얼 인플루언서의
          <br />
          게시물은 매일 24시간
          <br />
          쉬지 않고 노출되어
          <br />
          잠재고객을 관심고객으로
          <br />
          바꿉니다.
        </h2>
        <h3 className="mb-10 center-col text-center">
          비주얼 인플루언서 게시물 10개 중 <br />
          평균 5개는 인기게시물에 노출됩니다.
        </h3>

        <div className="grid gap-8">
          <div className="mb-4">
            <div className="h-0 relative z-10 top-4 w-64 mx-auto">
              <div className="">인기 게시물</div>
            </div>
            <img
              src="/assets/서비스_비주얼/5_1_mobile.png"
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
              블루투스 이어폰 S사 <br />
              서** 담당자
            </div>
          </div>
          <div className="px-1">
            <div className="mb-1 text-orange-500 font-bold">
              공식쇼핑몰 일 방문자 수 : 360명 → 3,000명
            </div>
            <div>
              “제품 컨셉에 맞는 해시태그를 구축하고 비주얼 인플루언서의 파급력이
              대량 동원되니 방문자수가 다이내믹하게 증가했고, 함께 진행한 다른
              마케팅의 성과도 같이 부스트 되었습니다. 해시태그는 무조건 많은 게
              좋다고 생각했는데 보내주신 가이드대로 진행한 것이 가장 잘 노출
              되더군요. 감사합니다.”
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className="py-20  bg-gray-50">
      <div className="pc-max">
        <div className="center text-lg font-bold text-gray-600 mb-4 ">
          <img
            src="/assets/서비스_비주얼/아이콘/인기게시물.png"
            className="h-7 mr-2"
          />
          인기게시물
        </div>
        <h2 className="pc-max pc-h1 center-col text-center mb-6">
          비주얼 인플루언서의 게시물은 <br />
          매일 24시간 쉬지 않고 노출되어 <br />
          잠재고객을 관심고객으로 바꿉니다.
        </h2>
        <h3 className="mb-16 text-lg center-col text-center">
          비주얼 인플루언서 게시물 10개 중 <br />
          평균 5개는 인기게시물에 노출됩니다.
        </h3>

        <div className="flex justify-center gap-8 mb-16">
          <div>
            <div className="h-0 relative z-10 top-8 w-80 mx-auto">
              <div className="">인기 게시물</div>
            </div>
            <img
              src="/assets/서비스_비주얼/5_1.png"
              className="rounded-3xl relative mx-auto"
              style={{ width: "24rem" }}
            />
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
                블루투스 이어폰 S사 <br />
                서** 담당자
              </div>
            </div>
            <div className="px-1">
              <div className="mb-1 text-orange-500 font-bold">
                공식쇼핑몰 일 방문자 수 : 360명 → 3,000명
              </div>
              <div>
                “제품 컨셉에 맞는 해시태그를 구축하고 비주얼 인플루언서의
                파급력이 대량 동원되니 방문자수가 다이내믹하게 증가했고, 함께
                진행한 다른 마케팅의 성과도 같이 부스트 되었습니다. 해시태그는
                무조건 많은 게 좋다고 생각했는데 보내주신 가이드대로 진행한 것이
                가장 잘 노출 되더군요. 감사합니다.”
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
