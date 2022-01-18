import Link from "next/link";
import Carowsel1 from "../../../1atoms/Carowsel1";
import useIsMobile from "../../../hooks/useIsMobile";

const defaultData = [
  {
    title: (
      <>
        “상세페이지마다 영상 콘텐츠 사용하고, <br />
        평균 구매전환율 27% 달성했어요”
      </>
    ),
    subTitle: (
      <div className="flex items-center justify-center">
        <img
          src={"/assets/service_Icons/건강 기능 식품.png"}
          alt="건강 기능 식품"
          className="inline h-5 relative right-2"
        />{" "}
        건강 기능 식품 브랜드 M사
      </div>
    ),
    src: "/assets/서비스_비주얼/1_1.png",
    url: "/costomer-story/health-food",
  },
  {
    title: (
      <>
        “상세페이지에 콘텐츠 잘 활용한게 <br />
        결정적이였어요. 매출 27배 상승.”
      </>
    ),
    subTitle: (
      <div className="flex items-center justify-center">
        <img
          src={"/assets/service_Icons/운동기구.png"}
          alt="운동기구"
          className="inline h-5 relative right-2"
        />{" "}
        운동기구 브랜드 Y사
      </div>
    ),
    src: "/assets/서비스_비주얼/1_2.png",
    url: "/costomer-story/fitness",
  },
  {
    title: (
      <>
        “상세페이지, 광고 다 뜯어고치니까 <br />
        15차 완판했어요!”
      </>
    ),
    subTitle: (
      <div className="flex items-center justify-center">
        <img
          src={"/assets/service_Icons/유아.png"}
          alt="유아"
          className="inline h-5 relative right-2"
        />
        유아 브랜드 B사
      </div>
    ),
    src: "/assets/서비스_비주얼/1_3.png",
    url: "/costomer-story/child",
  },
];

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <section className="pt-20 pb-16">
      <div className="flex flex-col text-center">
        <div className="mo-max">
          <h2 className="text-lg font-bold text-gray-600 mb-2">고객사례</h2>
          <h1 className="mo-h1 mb-7">
            실제 이용한 고객사의
            <br />
            생생한 반응
          </h1>
        </div>
        <div className="w-full">
          <div className="max-w-md mx-auto">
            <Carowsel1>
              {data.map((val, idx) => (
                <div className="px-2 " key={idx}>
                  <Link href={val.url}>
                    <a>
                      <div className="bg-indigo-50 p-3 mb-2 rounded-lg shadow-md max-w-xs mx-auto cursor-pointer">
                        <div className="mb-4 flex justify-center">
                          <img src={val.src} alt={val.src}></img>
                        </div>
                        <div className="mb-4 font-bold">{val.title}</div>
                        <div className="mb-4">{val.subTitle}</div>

                        <div className="flex justify-end mr-2 text-orange-500 font-bold">
                          자세히 보기→
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </Carowsel1>
          </div>
        </div>
      </div>
      <div className="mb-6"></div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className="py-20 mb-20 ">
      <div className="flex flex-col text-center">
        <div className={` max-w-screen-lg mx-auto mb-5`}>
          <h2 className="text-xl font-bold text-gray-600 mb-5">고객사례</h2>
          <h1 className="pc-h1 mb-7">
            실제 이용한 고객사의
            <br />
            생생한 반응
          </h1>
        </div>
        <div className=" max-w-screen-lg mx-auto pb-10 ">
          <ul className="grid grid-cols-3 min-w-max gap-5">
            {data.map((val, idx) => (
              <Link key={idx} href={val.url}>
                <a>
                  <li className="bg-indigo-50 p-3 mb-2 rounded-lg shadow-md cursor-pointer">
                    <div className="mb-4">
                      <img src={val.src} alt={val.src}></img>
                    </div>
                    <div className="mb-4 font-bold">{val.title}</div>
                    <div className="mb-3">{val.subTitle}</div>
                    <div className="flex justify-end mr-2 text-orange-500 font-bold">
                      자세히 보기→
                    </div>
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
