import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isVisibleHeaderAtom } from "../../../3organisms/Org_header/Org_header";
import hks_getMsPhoto from "./hks_getMsPhoto";

export default function App() {
  //해더
  const [isVisibleHeader, setIsBisibleHeader] =
    useRecoilState(isVisibleHeaderAtom);
  useEffect(() => {
    setIsBisibleHeader(false);
    return () => setIsBisibleHeader(true);
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex center bg-gray-100 px-20">
        <div className="flex flex-col mb-10" style={{ width: "28rem" }}>
          <div className="text-4xl font-black text-orange-600 center mb-1">
            POKETING
          </div>
          <div className="center mb-4 text-gray-500">관리자 페이지</div>

          <a
            className="w-full h-12 bg-orange-500 text-white text-shadow-md border px-3 py-2 center text-lg font-medium  cursor-pointer mb-3"
            href={`${process.env.NEXT_PUBLIC_API_HOST}/auth/ms`}
          >
            ms 로그인
          </a>
        </div>
      </div>
    </>
  );
}
