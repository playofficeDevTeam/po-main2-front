import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isVisibleHeaderAtom } from "../../../3organisms/Org_header/Org_header";

export default function App() {
  const [isVisibleHeader, setIsBisibleHeader] =
    useRecoilState(isVisibleHeaderAtom);

  useEffect(() => {
    setIsBisibleHeader(false);
    return () => setIsBisibleHeader(true);
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex center bg-gray-100 px-20">
        <div className="flex flex-col" style={{ width: "28rem" }}>
          <div className="text-4xl font-black text-orange-600 center mb-1">
            POKETING
          </div>
          <div className="center mb-4 text-gray-500">관리자 페이지</div>
          <input type="text" className="login-input mb-2" />
          <input type="text" className="login-input mb-2" />
          <div className="w-full h-12 bg-orange-500 text-white text-shadow-md border px-3 py-2 center text-lg font-medium  cursor-pointer mb-3">
            로그인
          </div>
          <div className=" cursor-pointer flex items-center">
            <i className="far fa-check-circle mr-2 text-xl text-gray-500"></i>
            <span className=" text-gray-500">로그인 유지하기</span>
          </div>
        </div>
      </div>
    </>
  );
}
