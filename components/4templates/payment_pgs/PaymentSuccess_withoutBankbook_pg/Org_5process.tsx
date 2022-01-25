import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = [
  "브랜드 정보 입력",
  "캠페인 의뢰 및 결제",
  "안내 및 전담팀 배정",
  "캠페인 실행",
  "중간 리포트전달",
  "최종 리포트 전달",
  "향후 전략 상담",
];
export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <section className="">
      <div className="xs-max my-10">
        <div className=" text-xl font-bold mb-6">진행 프로세스</div>
        <ul>
          {data.map((val, idx) => (
            <>
              <li
                key={idx}
                className={`flex justify-between p-3 px-6 text-lg border-2 rounded-lg mb-2 ${
                  idx < 1 ? "opacity-40" : ""
                } ${
                  idx === 1
                    ? "font-bold bg-gradient-to-br from-indigo-400 to-indigo-300 text-white text-shadow-sm"
                    : ""
                }`}
              >
                <div className="flex">
                  <div className="mr-4">0{idx + 1}</div>
                  <div>{val}</div>
                </div>

                {idx === 1 ? (
                  <div className="">
                    <i className="fas fa-chevron-down"></i>
                  </div>
                ) : (
                  <></>
                )}
              </li>
              {idx === 1 ? (
                <>
                  <div className="bg-gray-100 p-4 pt-5 relative -top-3 rounded-b-lg flex flex-col ">
                    <div className="mb-4">
                      입력해주신 이메일로 [무통장 입금 <br /> 정보 안내] 메일을
                      전송해 드렸습니다.
                    </div>
                    <div className="mb-3 text-blue-500">
                      📌 결제가 완료되면 캠페인 진행과 <br /> 관련된 안내 메일이
                      제공됩니다.
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ))}
        </ul>
      </div>
      <div className="border-b-4 mt-12"></div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className="border-2 px-10 py-8 pb-12 mb-6">
      <div className=" text-xl font-bold mb-12">진행 프로세스</div>
      <div className="flex justify-center">
        <ul className="w-4/12 mr-6">
          {data.map((val, idx) =>
            idx < 3 ? (
              <>
                <li
                  key={idx}
                  className={`flex justify-between p-3 px-6 text-lg border-2 rounded-lg mb-3 ${
                    idx < 1 ? "opacity-40" : ""
                  } ${
                    idx === 1
                      ? "font-bold bg-gradient-to-br from-indigo-400 to-indigo-300 text-white text-shadow-sm"
                      : ""
                  }`}
                >
                  <div className="flex">
                    <div className="mr-4">0{idx + 1}</div>
                    <div>{val}</div>
                  </div>
                  {idx === 1 ? (
                    <div className="">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
                {idx === 1 ? (
                  <>
                    <div className="bg-gray-100 p-4 pt-5 relative -top-3 rounded-b-lg flex flex-col ">
                      <div className="mb-4">
                        입력해주신 이메일로 [무통장 입금 <br /> 정보 안내]
                        메일을 전송해 드렸습니다.
                      </div>
                      <div className="mb-3 text-blue-500">
                        📌 결제가 완료되면 캠페인 진행과 <br /> 관련된 안내
                        메일이 제공됩니다.
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )
          )}
        </ul>
        <ul className="w-4/12">
          {data.map((val, idx) =>
            idx > 2 ? (
              <>
                <li
                  key={idx}
                  className={`flex justify-between p-3 px-6 text-lg border-2 rounded-lg mb-3 ${""} `}
                >
                  <div className="flex">
                    <div className="mr-4">0{idx + 1}</div>
                    <div>{val}</div>
                  </div>
                  {idx === 1 ? (
                    <div className="">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
              </>
            ) : (
              <></>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
