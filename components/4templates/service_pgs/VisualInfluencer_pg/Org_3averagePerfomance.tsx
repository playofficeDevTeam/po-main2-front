import AnimatedNumber from "../../../1atoms/AnimatedNumber";
import useIsMobile from "../../../hooks/useIsMobile";

const defaultData = {
  title: [<>고객사 평균 성과</>],
  subtitle: [
    <>
      2021년 1분기, 581개 고객사
      <br />
      이용 전후 평균 성과
    </>,
  ],
  lists: [
    {
      title: <>매출액</>,
      mainText: ["평균 ", 11, "배 증가"],
    },
    {
      title: <>구매전환율</>,
      mainText: ["평균 ", 5, ".5", "배 증가"],
    },
    {
      title: <>광고 ROAS</>,
      mainText: ["평균 ", 4, "배 증가"],
    },
  ],
};

export default function App({ data = defaultData, trigger = false }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <section className=" bg-gradient-to-br from-green-50  to-indigo-50">
      <div className="mo-max pt-20 pb-16">
        <div className="flex flex-col text-center">
          {data.title ? <h1 className="mo-h1 mb-4">{data.title}</h1> : <></>}
          {data.subtitle ? <div className="mb-6">{data.subtitle}</div> : <></>}
          <ul className="grid grid-flow-raw-dense gap-4">
            {data.lists.map((val, idx) => (
              <li key={idx} className="mb-4">
                <div className="text-lg font-bold ">{val.title}</div>
                <div className="text-lg font-bold text-orange-500">
                  {val.mainText.map((val, idx) => (
                    <span key={idx}>
                      {typeof val === "number" ? (
                        <AnimatedNumber value={val} trigger={trigger} />
                      ) : (
                        <span>{val}</span>
                      )}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className=" bg-gradient-to-br from-green-50  to-indigo-50">
      <div className=" pc-max py-20">
        <div className="flex flex-col text-center ">
          {data.title ? <h1 className="pc-h1 mb-4 ">{data.title}</h1> : <></>}
          {data.subtitle ? <div className="mb-6">{data.subtitle}</div> : <></>}
          <ul className="flex justify-center">
            {data.lists.map((val, idx) => (
              <li key={idx} className=" mr-14 last:mr-0">
                <div className="text-xl mb-2 font-bold">{val.title}</div>
                <div className="text-xl font-bold text-orange-500">
                  {val.mainText.map((val, idx) => (
                    <span className="" key={idx}>
                      {typeof val === "number" ? (
                        <AnimatedNumber value={val} trigger={trigger} />
                      ) : (
                        <span>{val}</span>
                      )}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
