import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import {
  EDIT_ME_FOR_ADMIN,
  FIND_ME_FOR_ADMIN,
} from "../../4templates/admin_pgs/Admin/Gql_admin";
import { editMeForAdmin } from "../../4templates/admin_pgs/Admin/__generated__/editMeForAdmin";
import { adminLoggedInVar, refreshTokenVar } from "../../common/apollo";
import { useTokenCheck } from "../../hooks/useTokenCheck";
import Modal_changPassword, {
  isModal_changePasswordAtom,
} from "./Modal_changPassword";
import * as jwt from "jsonwebtoken";
import { findMeforAdmin } from "../../4templates/admin_pgs/Admin/__generated__/findMeforAdmin";
import fn_base64ToSrc from "../../4templates/admin_pgs/Admin/fn_base64ToSrc";

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
    icon: <i className="fas fa-user-tie"></i>,
    title: "파트너사",
    url: "/admin/partner",
  },
  {
    icon: <i className="fas fa-tasks"></i>,
    title: "캠페인",
    url: "/admin/campaign",
  },
  {
    icon: <i className="fas fa-tasks text-orange-600"></i>,
    title: "캠페인참여",
    url: "/admin/campaign-participation",
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
    icon: <i className="fas fa-question-circle text-orange-600"></i>,
    title: "문의관리",
    url: "/admin/question-management",
  },
  {
    icon: <i className="fas fa-shopping-basket"></i>,
    title: "서비스",
    url: "/admin/item",
  },
];

export const nicknameAtom = atom({
  key: "nicknameAtom",
  default: "",
});

function App() {
  const pathname = window.location.pathname;
  const router = useRouter();
  const logout = () => {
    adminLoggedInVar(false);
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("socialAccessToken");
    localStorage.removeItem("socialRefreshToken");
    router.push("/admin/log-in");
  };

  const tokenCheck = useTokenCheck();
  //쿼리
  const {
    loading: findMeforAdminLoading,
    error: findMeforAdminError,
    data: findMeforAdminData,
    refetch,
  } = useQuery<findMeforAdmin>(FIND_ME_FOR_ADMIN);

  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findMeforAdminData]);

  const [sideBarOpenState, setSideBarOpenState] = useState(true);

  const [editMeForAdminMutation, { data: editMeForAdminData }] =
    useMutation<editMeForAdmin>(EDIT_ME_FOR_ADMIN);

  return (
    <div className=" relative z-50">
      <div
        className={`fixed  border-r shadow-md overflow-y-auto middle-scroll h-full flex flex-col justify-between bg-white ${
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
                      pathname.split("/")[2] === val.url.split("/")[2]
                        ? "bg-gray-100"
                        : ""
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
            <li className="center p-1">
              {findMeforAdminData && (
                <div className="w-10 h-10 rounded-full">
                  <img
                    src={fn_base64ToSrc(
                      findMeforAdminData.findMeforAdmin.admin?.profilePicture
                    )}
                    alt="프로필사진"
                  />
                </div>
              )}
            </li>
            <li className="center p-1">
              {findMeforAdminData &&
                findMeforAdminData.findMeforAdmin.admin?.nickname}
            </li>

            <li>
              <a
                className="center p-1 cursor-pointer  rounded-md hover:bg-gray-100"
                href="https://login.microsoftonline.com/tenant-id/oauth2/v2.0/logout"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  logout();
                }}
              >
                로그아웃
              </a>
            </li>
          </ul>
        )}
      </div>

      <div className={`h-full ${sideBarOpenState ? "w-44" : "w-14"}`}></div>
    </div>
  );
}

export default memo(App);
