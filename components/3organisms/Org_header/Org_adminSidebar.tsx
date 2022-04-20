import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { FIND_ME_FOR_ADMIN } from "../../4templates/admin_pgs/Dashboard/Gql_admin";
import { findMeforAdmin } from "../../4templates/admin_pgs/Dashboard/__generated__/findMeforAdmin";
import { adminLoggedInVar } from "../../common/apollo";
import { useTokenCheck } from "../../hooks/useTokenCheck";

const listsData = [
  {
    icon: <i className="fas fa-home"></i>,
    title: "대시보드",
    url: "/admin/dashboard",
  },
  {
    icon: <i className="fas fa-user-cog"></i>,
    title: "관리자",
    url: "/admin/admin",
  },
  {
    icon: <i className="fas fa-user"></i>,
    title: "유저",
    url: "/admin/user",
  },
  {
    icon: <i className="fas fa-tasks"></i>,
    title: "캠페인",
    url: "/admin/campaign",
  },
  {
    icon: <i className="fas fa-credit-card"></i>,
    title: "결제",
    url: "/admin/payment",
  },
  {
    icon: <i className="fas fa-question-circle"></i>,
    title: "문의",
    url: "/admin/question",
  },
  {
    icon: <i className="fas fa-shopping-basket"></i>,
    title: "서비스",
    url: "/admin/item",
  },
];

function App() {
  const pathname = window.location.pathname;

  const router = useRouter();

  const logout = () => {
    adminLoggedInVar(false);
    router.push("/admin/log-in");

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const { loading, error, data, refetch } =
    useQuery<findMeforAdmin>(FIND_ME_FOR_ADMIN);
  const tokenCheck = useTokenCheck();
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [loading]);

  const [sideBarOpenState, setSideBarOpenState] = useState(true);

  return (
    <div className=" relative z-50">
      <div
        className={`fixed  border-r shadow-md overflow-y-auto h-full flex flex-col justify-between bg-white ${
          sideBarOpenState ? "w-44" : "w-14"
        }`}
      >
        <div className="">
          <div
            className="px-1 py-1 "
            onClick={() => {
              setSideBarOpenState((state) => !state);
            }}
          >
            <div
              className={`flex items-center p-2  cursor-pointer  rounded-md hover:bg-gray-100 ${
                sideBarOpenState ? "pl-4" : " justify-center"
              }`}
            >
              <div className="">
                <i className="fas fa-bars w-5 text-center"></i>
              </div>
              {sideBarOpenState && (
                <div className=" font-black text-orange-600 ml-3">POKETING</div>
              )}
            </div>
          </div>
          <ul>
            {listsData.map((val, idx) => (
              <li className="px-1 pb-1" key={idx}>
                <Link href={val.url}>
                  <a
                    className={`flex items-center p-2 cursor-pointer  rounded-md hover:bg-gray-100 ${
                      pathname === val.url ? "bg-gray-100" : ""
                    } ${sideBarOpenState ? "pl-4 " : " justify-center"}`}
                  >
                    <div className="w-5 text-center text-gray-700">
                      {val.icon}
                    </div>
                    {sideBarOpenState && (
                      <div className="ml-3">{val.title}</div>
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {sideBarOpenState && (
          <ul>
            <li className="center">{data?.findMeforAdmin.admin?.email}</li>
            <li>
              <div
                className="center p-2 cursor-pointer  rounded-md hover:bg-gray-100"
                onClick={() => {
                  logout();
                }}
              >
                로그아웃
              </div>
            </li>
          </ul>
        )}
      </div>

      <div className={`h-full ${sideBarOpenState ? "w-44" : "w-14"}`}></div>
    </div>
  );
}

export default memo(App);
