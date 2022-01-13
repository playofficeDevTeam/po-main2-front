import Link from "next/link";
import useIsMobile from "../../../hooks/useIsMobile";

const defaultData = {
  title: <>고객사례 더보기</>,
  contents: [
    {
      src: "assets/고객반응/고객반응_운동보조/1_3.png",
      title: (
        <>
          “상세페이지, 광고 다 뜯어고치니까
          <br />
          15차 완판했어요!”
        </>
      ),
      param: (
        <div className="center">
          <img
            src="/assets/고객반응/고객반응_운동보조/유아.png"
            alt="유아"
            className="inline h-5 relative right-2"
          />{" "}
          유아 브랜드 B사
        </div>
      ),
      url: "/costomer-story/child",
    },
    {
      src: "/assets/고객반응/고객반응_운동보조/1_1.png",
      title: (
        <>
          “상세페이지마다 이 영상 사용하고,
          <br />
          평균 구매전환율 27% 달성했어요”
        </>
      ),
      param: (
        <div className="center">
          <img
            src="/assets/고객반응/고객반응_운동보조/건강 기능 식품.png"
            alt="건강 기능 식품"
            className="inline h-5 relative right-2"
          />{" "}
          건강 기능 식품 브랜드 M사
        </div>
      ),
      url: "/costomer-story/health-food",
    },
  ],
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return (
    <section className="">
      {isMobile ? (
        <div className="mo-max">
          <h1 className="mo-h1 mb-10">{data.title}</h1>
          <ul>
            {data.contents.map((val, idx) => (
              <Link href={val.url}>
                <a href="" key={idx}>
                  <li className="bg-blue-50 rounded-md shadow-md p-2 text-center mb-10 max-w-xs mx-auto">
                    <img src={val.src} className="mb-6" />
                    <div className=" font-bold mb-3">{val.title}</div>
                    <div className="mb-1">{val.param}</div>
                    <div className="flex justify-end text-sm text-orange-500 ">
                      자세히보기 →
                    </div>
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <div className="pc-max">
          <h1 className="pc-h1 mb-20">{data.title}</h1>
          <ul className="flex justify-center">
            {data.contents.map((val, idx) => (
              <li className="mr-16 last:mr-0">
                <Link href={val.url}>
                  <a className="" key={idx}>
                    <div className="bg-blue-50 rounded-md shadow-md p-2 text-center mb-10 max-w-xs mx-auto">
                      <img src={val.src} className="mb-6" />
                      <div className=" font-bold mb-3">{val.title}</div>
                      <div className="mb-1">{val.param}</div>
                      <div className="flex justify-end text-sm text-orange-500 ">
                        자세히보기 →
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
