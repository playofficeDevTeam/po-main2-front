import Link from "next/link";
import { atom, useRecoilState } from "recoil";
import useIsMobile from "../../hooks/useIsMobile";
import { sitemapDataAtom } from "/home/app/components/3organisms/Org_header/Org_header";

export const isVisibleFooterAtom = atom({
  key: "isVisibleFooterAtom",
  default: true,
});

export default function App() {
  const isMobile = useIsMobile();

  const [sitemapDataState, setSitemapDataState] =
    useRecoilState(sitemapDataAtom);

  const [isVisibleFooter, setIsBisibleFooter] =
    useRecoilState(isVisibleFooterAtom);

  return isVisibleFooter ? (
    <>
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <footer>
          {/* 사이트맵 */}
          <div className="mb-4 border-t-2 pt-1">
            <div className="mo-max">
              {sitemapDataState.map((val, idx) => (
                <Link href={val.url} key={idx}>
                  <a className="flex py-2 border-b ">
                    <div className="center text-base">{val.title}</div>
                    <div className="center -z-10">
                      <i className="fas fa-chevron-right text-gray-500 pl-2 text-xs relative top-px "></i>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
          {/* 회사정보 */}
          <div className="my-10">
            <div className="mo-max">
              <div className=" text-xl font-black mb-3">POKETING</div>
              <div className=" text-sm text-gray-600 leading-6 mb-3">
                상호명 : 5일의 휴일 <br />
                대표이사 : 이제성 <br />
                개인정보 보호 최고책임자 : 이종원 <br />
                사업자등록번호 : 265-12-00221 <br />
                통신판매업신고번호 : 2016-부산해운대-0499호 <br />
                주소: 부산광역시 해운대구 해운대해변로257
                <br />
                메일 : help@poketing.com <br />
                전화 : 051-904-0118 <br />
                월-금 10:00 - 19:00 / 주말, 공휴일 휴무
              </div>
              <div className="">ⓒ PLAY OFFICE Inc. All Right Reserved.</div>
            </div>
          </div>
        </footer>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <footer>
          <div className="border-b"></div>
          <div className="pc-max my-10 mb-12 flex justify-between">
            <div className="">
              <div className=" text-2xl font-black mb-4">POKETING</div>
              <div className=" text-sm text-gray-600 leading-6 mb-4">
                <div className="">
                  대표이사 : 이제성
                  <span className="mx-2 relative bottom-px text-gray-200">
                    |
                  </span>
                  개인정보 보호 최고책임자 : 이종원
                </div>
                <div className="">
                  사업자등록번호 : 265-12-00221
                  <span className="mx-2 relative bottom-px text-gray-200">
                    |
                  </span>
                  통신판매업신고번호 : 2016-부산해운대-0499호
                </div>
                <div className="">
                  메일 : help@poketing.com
                  <span className="mx-2 relative bottom-px text-gray-200">
                    |
                  </span>
                  전화 : 0502-1937-0118
                </div>
                <div className="">
                  주소: 부산광역시 해운대구 해운대해변로257
                </div>
              </div>
              <div className="">ⓒ PLAY OFFICE Inc. All Right Reserved.</div>
            </div>
            <div className="flex flex-col justify-end items-end">
              <div className=" text-3xl font-bold mb-4">0502-1937-0118</div>
              <div className="text-sm text-gray-600">
                월-금 11:00 - 17:00 / 주말, 공휴일 휴무
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  ) : (
    <></>
  );
}
7;
