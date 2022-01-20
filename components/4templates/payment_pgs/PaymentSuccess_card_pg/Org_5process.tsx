import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = [
  "캠페인 의뢰 및 결제",
  "브랜드 정보 입력",
  "안내 및 전담팀 배정",
  "캠페인 실행",
  "중간 리포트전달",
  "최종 리포트 전달",
  "향후 전략 상담",
];
export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <div className=" border-b-4">
      <div className="xs-max py-10">
        <div className=" text-xl font-bold mb-6">진행 프로세스</div>
        <ul>
          {data.map((val, idx) => (
            <>
              <li
                key={idx}
                className={`flex justify-between p-3 px-6 text-lg border-2 rounded-lg mb-2 ${
                  idx < 2 ? "opacity-40" : ""
                } ${
                  idx === 2
                    ? "font-bold bg-gradient-to-br from-indigo-400 to-indigo-300 text-white text-shadow-sm"
                    : ""
                }`}
              >
                <div className="flex">
                  <div className="mr-4">0{idx + 1}</div>
                  <div>{val}</div>
                </div>

                {idx === 2 ? (
                  <div className="">
                    <i className="fas fa-chevron-down"></i>
                  </div>
                ) : (
                  <></>
                )}
              </li>
              {idx === 2 ? (
                <>
                  <div className="bg-gray-100 p-4 pt-5 relative -top-3 rounded-b-lg">
                    <div className="">
                      캠페인 진행과 관련 된 안내 메일을 <br /> 발송
                      해드렸습니다.
                    </div>
                    <div className="mb-6 text-blue-500">
                      📌 메일 내 1. 가이드 확인 2. 요청 사항 <br /> 입력을 꼭
                      완료해주세요!
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm font-bold">
                        전담팀 솔솔 매니저 <br /> a_solsol@poketing.com
                      </div>
                      <div>
                        <img src="/assets/결제/솔솔.png" alt="솔솔" />
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="h-1 relative -top-3">
                      <div className=" text-indigo-400 flex justify-end mr-6 text-xl">
                        ▲
                      </div>
                    </div>
                    <div className=" bg-indigo-400 text-white px-4 py-3 rounded-md text-shadow-sm mb-2">
                      메일함에서 [
                      <b>
                        캠페인 진행과 관련된 <br /> 안내 메일
                      </b>
                      ]이 보이지 않는 경우! <br />
                      <span className="text-yellow-100 font-bold">
                        스팸 메일함을 확인해주세요. <br />
                      </span>{" "}
                      스팸 메일함에서도 보이지 않을 경우 <br /> 포케팅 홈페이지
                      하단의 전화번호로 <br />
                      연락 주시면 안내 도와드리겠습니다.
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
    </div>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <div className="pc-max border-2 px-10 py-8 pb-16">
      <div className=" text-xl font-bold mb-10">진행 프로세스</div>
      <div className="flex justify-center">
        <ul className="w-4/12 mr-6">
          {data.map((val, idx) =>
            idx < 3 ? (
              <>
                <li
                  key={idx}
                  className={`flex justify-between p-3 px-6 text-lg border-2 rounded-lg mb-3 ${
                    idx < 2 ? "opacity-40" : ""
                  } ${
                    idx === 2
                      ? "font-bold bg-gradient-to-br from-indigo-400 to-indigo-300 text-white text-shadow-sm"
                      : ""
                  }`}
                >
                  <div className="flex">
                    <div className="mr-4">0{idx + 1}</div>
                    <div>{val}</div>
                  </div>
                  {idx === 2 ? (
                    <div className="">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
                {idx === 2 ? (
                  <>
                    <div className="bg-gray-100 p-4 pt-5 relative -top-3 rounded-b-lg">
                      <div className="">
                        캠페인 진행과 관련 된 안내 메일을 <br /> 발송
                        해드렸습니다.
                      </div>
                      <div className="mb-6 text-blue-500">
                        📌 메일 내 1. 가이드 확인 2. 요청 사항 <br /> 입력을 꼭
                        완료해주세요!
                      </div>
                      <div className="flex">
                        <div className="text-sm font-bold">
                          전담팀 솔솔 매니저 a_solsol@poketing.com
                        </div>
                        <div>
                          <img src="/assets/결제/솔솔.png" alt="솔솔" />
                        </div>
                      </div>
                    </div>

                    <div
                      className="h-0 relative"
                      style={{
                        left: "21.13rem",
                        bottom: "8.5rem",
                      }}
                    >
                      <div
                        className="h-0 relative"
                        style={{ right: "0.8rem", top: "3.5rem" }}
                      >
                        <div className=" text-indigo-400 text-xl">◀</div>
                      </div>
                      <div className=" bg-indigo-400 text-white px-4 py-3 rounded-md text-shadow-sm mb-2">
                        메일함에서 [
                        <b>
                          캠페인 진행과 관련된 <br /> 안내 메일
                        </b>
                        ]이 보이지 않는 경우! <br />
                        <span className="text-yellow-100 font-bold">
                          스팸 메일함을 확인해주세요. <br />
                        </span>{" "}
                        스팸 메일함에서도 보이지 않을 경우 <br /> 포케팅
                        홈페이지 하단의 전화번호로 <br />
                        연락 주시면 안내 도와드리겠습니다.
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
                  {idx === 2 ? (
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
    </div>
  );
}
