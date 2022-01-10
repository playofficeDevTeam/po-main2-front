import { makeVar, useReactiveVar } from "@apollo/client";
import { isMobileVar } from "../common/Layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const sitemapData = [
  { title: "서비스", url: "/service", selected: false },
  { title: "고객사례", url: "/costomer-story", selected: false },
  { title: "포케팅이 일하는 법", url: "/introduce", selected: false },
];

export const sitemapDataVar = makeVar(sitemapData);

export default function App({ floatingBtn = <></> }) {
  const isMobile = useReactiveVar(isMobileVar);

  const [menuState, setMenuState] = useState(false);
  const menuToggle = () => {
    setMenuState(!menuState);
  };
  const isMenuOpened = menuState;

  const sitemapDataReactiveVar = useReactiveVar(sitemapDataVar);
  const selectTab = (id: number) => {
    const newSitemapData = [...sitemapDataReactiveVar];
    const selectOne = newSitemapData.map((val, idx) => ({
      ...val,
      selected: id === idx ? true : false,
    }));
    sitemapDataVar(selectOne);
  };

  const history = useRouter();

  useEffect(() => {
    const pathname = window.location.pathname;
    const pathnameFirst = pathname.split("/")[1];
    const nowPathIndex = sitemapData.findIndex(
      (val) => val.url.split("/")[1] === pathnameFirst
    );
    selectTab(nowPathIndex);
  }, [history]);

  return (
    <>
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <header className=" sticky top-0" style={{ zIndex: 100 }}>
          {/* 메인메뉴 */}
          <div className="h-12 bg-white border-b">
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
          {isMenuOpened ? (
            <div className="h-0">
              <nav className=" bg-white">
                <ul className="py-4 border-b shadow-md">
                  {sitemapDataReactiveVar.map((val, idx) => (
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
          )}
        </header>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <header className="sticky top-0" style={{ zIndex: 100 }}>
          {/* 메인메뉴 */}
          <div className="h-16 bg-white border-b">
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
                  {sitemapDataReactiveVar.map((val, idx) => (
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
              <div className="w-2/12 flex justify-end">{floatingBtn}</div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
