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
import { findMeforAdmin } from "../../4templates/admin_pgs/Dashboard/__generated__/findMeforAdmin";
import { adminLoggedInVar } from "../../common/apollo";
import { useTokenCheck } from "../../hooks/useTokenCheck";
import Modal_changPassword, {
  isModal_changePasswordAtom,
} from "./Modal_changPassword";

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

export const nickNameAtom = atom({
  key: "nickNameAtom",
  default: "",
});

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

  const tokenCheck = useTokenCheck();

  const [nickName, setNickName] = useRecoilState(nickNameAtom);

  const { loading, error, data, refetch } =
    useQuery<findMeforAdmin>(FIND_ME_FOR_ADMIN);
  useEffect(() => {
    tokenCheck("query", refetch);
    setNickName(data?.findMeforAdmin.admin?.email?.split("@")[0] + "");
  }, [loading, data]);

  const [sideBarOpenState, setSideBarOpenState] = useState(true);

  const [editMeForAdminMutation, { data: editMeForAdminData }] =
    useMutation<editMeForAdmin>(EDIT_ME_FOR_ADMIN);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    try {
      if (data.newPassword === data.newPasswordCheck) {
        tokenCheck("mutation", () => {
          editMeForAdminMutation({
            variables: {
              input: {
                password: data.newPassword,
              },
            },
          });
        });
        setisModalOpen(false);
      } else {
        throw "비밀번호가 일치하지 않습니다";
      }
    } catch (error) {
      alert(error);
    }
  };

  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_changePasswordAtom
  );

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
            <li>
              <a href={`${process.env.NEXT_PUBLIC_API_HOST}/auth/ms`}>
                ms 로그인
              </a>
            </li>
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
              {nickName !== "undefined" ? nickName : "로딩중"}
            </li>
            <Modal_changPassword
              data={{
                button: (
                  <>
                    <li
                      className="center p-1 cursor-pointer  rounded-md hover:bg-gray-100"
                      onClick={() => {
                        setTimeout(() => {
                          setFocus("newPassword");
                        }, 100);
                      }}
                    >
                      비밀번호 변경
                    </li>
                  </>
                ),
                modal: (
                  <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <ul className=" pb-4">
                        <li className="flex items-center">
                          <div className="w-36 flex pl-1">새 비밀번호</div>
                          <input
                            {...register("newPassword")}
                            required
                            className="border w-60 p-1 m-1"
                            type={`password`}
                          />
                        </li>
                        {errors.newPassword?.type === "required" &&
                          "새 비밀번호를 입력해주세요"}
                        <li className="flex items-center">
                          <div className="w-36 flex pl-1">새 비밀번호 확인</div>
                          <input
                            {...register("newPasswordCheck")}
                            required
                            className="border w-60 p-1 m-1"
                            type={`password`}
                          />
                        </li>
                      </ul>
                      <div className="flex justify-end mt-2">
                        <div
                          className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                          onClick={() => {
                            setisModalOpen(false);
                          }}
                        >
                          취소
                        </div>
                        <button className="p-1 px-3 bg-orange-400 hover:bg-orange-500 rounded-md text-white cursor-pointer">
                          확인
                        </button>
                      </div>
                    </form>
                  </>
                ),
              }}
            />

            <li>
              <div
                className="center p-1 cursor-pointer  rounded-md hover:bg-gray-100"
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
