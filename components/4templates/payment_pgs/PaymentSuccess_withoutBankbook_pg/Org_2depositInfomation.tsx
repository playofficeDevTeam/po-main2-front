import Br_pc from "../../../1atoms/Br_pc";
import useIsMobile from "/home/app/components/hooks/useIsMobile";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { clickedServiceDataClass } from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";

export default function App() {
  const paymentResponse = JSON.parse(
    window.localStorage.getItem("paymentResponse") ?? JSON.stringify({})
  );
  const notify = () => toast("복사되었습니다.");
  const dueDate = new Date(paymentResponse.virtualAccount.dueDate);
  const clickedServiceData = useRecoilValue(clickedServiceDataClass);

  const temData = {
    title: (
      <>
        성과 좋은 콘텐츠 <Br_pc /> 만들어드릴게요! <br />
        아래 계좌로 입금해주세요 :)
      </>
    ),
    detail: [
      {
        title: "가상 계좌",
        data: (
          <div className="flex" onClick={notify}>
            <CopyToClipboard
              text={paymentResponse.virtualAccount.accountNumber}
            >
              <button className="flex items-center">
                <span className=" underline">
                  {paymentResponse.virtualAccount.accountNumber}
                </span>
                <div className="ml-2 border border-gray-400 rounded text-sm text-gray-500 px-1 ">
                  <button>복사</button>

                  <Toaster
                    containerStyle={{
                      top: 200,
                      left: 20,
                      bottom: 20,
                      right: 20,
                    }}
                  />
                </div>
              </button>
            </CopyToClipboard>
          </div>
        ),
      },
      { title: "은행", data: <>{paymentResponse.virtualAccount.bank}</> },
      {
        title: "예금주",
        data: <>5일의휴일</>,
      },
      {
        title: "입금 기한",
        data: (
          <>{`${dueDate.getFullYear().toString().substring(2, 4)}.${
            dueDate.getMonth() + 1
          }.${dueDate.getDate()} ${dueDate.getHours()}:${dueDate.getMinutes()}까지`}</>
        ),
      },
      {
        title: "입금 금액",
        data: (
          <span className=" text-blue-600 font-bold text-xl">
            {clickedServiceData?.priceDiscounted_won}
          </span>
        ),
      },
    ],
    notification: (
      <span>
        <b>
          ※ 작성해주신 이메일로 무통장 입금 <br /> 정보 안내 메일을
          발송해드렸습니다. :)
        </b>
        <br />
        메일함에서 보이지 않는 경우 <br /> 스팸 메일함을 확인해 주세요!
      </span>
    ),
  };

  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <section className="xs-max my-10">
          <div className="font-bold text-xl mb-10">{temData.title}</div>
          <div className="mb-8">
            {temData.detail.map((val, idx) => (
              <div key={idx} className="flex mb-4 items-end">
                <div className="w-4/12 mr-1 text-gray-500 ">{val.title}</div>
                <div className="w-8/12">{val.data}</div>
              </div>
            ))}
          </div>
          <div className="xs-max">
            <div className=" bg-orange-500 rounded-md text-white text-shadow-sm px-4 py-3">
              {temData.notification}
            </div>
          </div>
        </section>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <section
          className="border-2 border-orange-500 h-full"
          style={{ padding: "2px" }}
        >
          <div className="border-2 border-orange-500 h-full  pt-7 pb-3 px-3">
            <div className="font-bold text-xl mb-8">{temData.title}</div>
            <div className="mb-5">
              {temData.detail.map((val, idx) => (
                <div key={idx} className="flex mb-4 items-end">
                  <div className="w-4/12 mr-1 text-gray-500 ">{val.title}</div>
                  <div className="w-8/12">{val.data}</div>
                </div>
              ))}
            </div>
            <div className="">
              <div className=" bg-orange-500 rounded-md text-white text-shadow-sm px-4 py-3">
                {temData.notification}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
