import Br_pc from "../../../1atoms/Br_pc";
import useIsMobile from "/home/app/components/hooks/useIsMobile";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { clickedServiceDataClass } from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";

const depositWithoutBankRes = {
  mId: "poketinfg1",
  paymentKey: "p5EnNZRJGvaBX7zk2yd8yvqDQYzx03x9POLqKQjmAw4b0e1Y",
  orderId: "a3155170-7cde-11ec-846c-5934994c86e2",
  method: "가상계좌",
  status: "WAITING_FOR_DEPOSIT",
  requestedAt: "2022-01-24T15:26:59+09:00",
  approvedAt: null,
  useEscrow: false,
  card: null,
  virtualAccount: {
    accountNumber: "56349073891630",
    accountType: "일반",
    bank: "국민",
    customerName: "이종원",
    dueDate: "2022-01-27T15:26:59+09:00",
    expired: false,
    settlementStatus: "INCOMPLETED",
    refundStatus: "NONE",
  },
  mobilePhone: null,
  giftCertificate: null,
  cashReceipt: null,
  discount: null,
  cancels: null,
  secret: null,
  useDiscount: false,
  discountAmount: null,
  useCashReceipt: false,
  currency: "KRW",
  totalAmount: 2090000,
  balanceAmount: 2090000,
  statusCode: 200,
};

export default function App() {
  const notify = () => toast("복사되었습니다.");
  const dueDate = new Date(depositWithoutBankRes.virtualAccount.dueDate);
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
              text={depositWithoutBankRes.virtualAccount.accountNumber}
            >
              <button className="flex items-center">
                <span className=" underline">
                  {depositWithoutBankRes.virtualAccount.accountNumber}
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
      { title: "은행", data: <>{depositWithoutBankRes.virtualAccount.bank}</> },
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
