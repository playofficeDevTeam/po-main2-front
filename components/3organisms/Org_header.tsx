import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useIsMobile from "../hooks/useIsMobile";
import { atom, useRecoilState } from "recoil";
import Ani_box from "../1atoms/Ani_box";

const sitemapData = [
  { title: "서비스", url: "/service", selected: false },
  { title: "고객사례", url: "/costomer-story", selected: false },
  { title: "포케팅이 일하는 법", url: "/introduce", selected: false },
];

export const sitemapDataAtom = atom({
  key: "sitemapDataAtom",
  default: sitemapData,
});

export const headerFloatingBtnAtom = atom({
  key: "headerFloatingBtnAtom",
  default: <></>,
});

export const isVisibleHeaderAtom = atom({
  key: "isVisibleHeaderAtom",
  default: true,
});

export default function App() {
  const isMobile = useIsMobile();
  const router = useRouter();

  const [headerFloatingBtnState, setHeaderFloatingBtnState] = useRecoilState(
    headerFloatingBtnAtom
  );

  const [isVisibleHeader, setIsBisibleHeader] =
    useRecoilState(isVisibleHeaderAtom);

  const [menuState, setMenuState] = useState(false);
  const menuToggle = () => {
    setMenuState(!menuState);
  };
  const isMenuOpened = menuState;

  const [sitemapDataState, setSitemapDataState] =
    useRecoilState(sitemapDataAtom);

  const selectTab = useCallback(
    (id: number) => {
      setSitemapDataState((SitemapData) =>
        SitemapData.map((val, idx) => ({
          ...val,
          selected: id === idx ? true : false,
        }))
      );
    },
    [setSitemapDataState]
  );

  useEffect(() => {
    const pathname = window.location.pathname;
    const pathnameFirst = pathname.split("/")[1];
    const nowPathIndex = sitemapData.findIndex(
      (val) => val.url.split("/")[1] === pathnameFirst
    );
    selectTab(nowPathIndex);
  }, [router, selectTab]);

  return isVisibleHeader ? (
    <>
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <header className=" sticky top-0" style={{ zIndex: 100 }}>
          {/* 메인메뉴 */}
          <div className="h-12 bg-white border-b relative z-50">
            <div className="mo-max center h-full">
              <div
                className="w-2/12 center cursor-pointer"
                onClick={() => {
                  menuToggle();
                }}
              >
                <i className="fas fa-bars text-xl text-gray-700"></i>
              </div>
              <Link href={"/"}>
                <a
                  className="w-8/12 center cursor-pointer"
                  onClick={() => {
                    setMenuState(false);
                  }}
                >
                  <div className="text-xl font-black text-orange-600">
                    POKETING
                  </div>
                </a>
              </Link>
              <div className="w-2/12 center"></div>
            </div>
          </div>
          {/* 서브메뉴 */}
          <Ani_box trigger={isMenuOpened}>
            <div className="h-0 z-40">
              <nav className=" bg-white">
                <ul className="py-4 border-b shadow-md">
                  {sitemapDataState.map((val, idx) => (
                    <Link href={val.url} key={idx}>
                      <a
                        className="center py-2 "
                        onClick={() => {
                          setMenuState(false);
                        }}
                      >
                        <div className="center text-base">{val.title}</div>

                        <i className="fas fa-chevron-right text-gray-500 pl-2   text-xs center relative top-px "></i>
                      </a>
                    </Link>
                  ))}
                </ul>
              </nav>
            </div>
          </Ani_box>
          {/* 서브메뉴 */}
          {/* {isMenuOpened ? (
            <div className="h-0">
              <nav className=" bg-white">
                <ul className="py-4 border-b shadow-md">
                  {sitemapDataState.map((val, idx) => (
                    <Link href={val.url} key={idx}>
                      <a
                        className="center py-2 "
                        onClick={() => {
                          setMenuState(false);
                        }}
                      >
                        <div className="center text-base">{val.title}</div>

                        <i className="fas fa-chevron-right text-gray-500 pl-2   text-xs center relative top-px "></i>
                      </a>
                    </Link>
                  ))}
                </ul>
              </nav>
            </div>
          ) : (
            <></>
          )} */}
        </header>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <header className="sticky top-0" style={{ zIndex: 100 }}>
          {/* 메인메뉴 */}
          <div className="h-16 bg-white border-b ">
            <div className="pc-max center h-full">
              <Link href={"/"}>
                <a className="w-2/12 flex items-center cursor-pointer">
                  <div className="text-2xl font-black text-orange-600">
                    POKETING
                  </div>
                </a>
              </Link>

              <nav className="w-8/12 h-full">
                <ul className="center h-full">
                  {sitemapDataState.map((val, idx) => (
                    <Link href={val.url} key={idx}>
                      <a
                        className={`center px-3 pt-1 h-full hover:bg-gray-100 transition duration-200 ${
                          val.selected
                            ? " border-b-4  border-orange-500"
                            : "border-b-4 border-transparent"
                        }`}
                      >
                        <div className="center text-base">{val.title}</div>
                      </a>
                    </Link>
                  ))}
                </ul>
              </nav>
              <div className="w-2/12 flex justify-end">
                {headerFloatingBtnState}
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  ) : (
    <></>
  );
}
