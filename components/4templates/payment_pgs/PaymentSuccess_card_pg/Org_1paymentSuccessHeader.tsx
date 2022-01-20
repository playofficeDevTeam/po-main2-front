import { useRouter } from "next/router";
import Detect from "../../../1atoms/IsMobile";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  butten: <></>,
  title: "결제 / 진행정보 확인",
  page: "2/2",
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const headerData = data;

  return isMobile ? (
    <>
      <header className="bg-white border-b sticky top-12 h-12 center z-50">
        <div className="mo-max flex">
          <div className="w-2/12 center text-gray-500">
            {headerData.butten ? (
              <div
                onClick={() => {
                  router.back();
                }}
              >
                {headerData.butten}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-8/12 center font-bold">{headerData.title}</div>
          <div className="w-2/12 center text-gray-400 font-bold pt-px">
            {headerData.page}
          </div>
        </div>
      </header>
    </>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    // 피씨
    // 피씨
    // 피씨
    <>
      <div className="pc-max flex justify-between mt-20 mb-10">
        <div className=" font-bold text-3xl">{headerData.title}</div>
        <div className=" font-bold text-lg text-gray-400">
          {headerData.page}
        </div>
      </div>
    </>
  );
}
