import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isVisibleHeaderAtom } from "../../../3organisms/Org_header/Org_header";
import {
  accessTokenVar,
  adminLoggedInVar,
  refreshTokenVar,
} from "../../../common/apollo";
import { LOGIN_ADMIN } from "./Gql_login";
import {
  loginFormDataAtom,
  loginFormDataValidate,
  loginFormInputSetting,
  useLoginFormDataOnChange,
} from "./Var_loginData";
import { LoginAdmin, LoginAdminVariables } from "./__generated__/LoginAdmin";

export default function App() {
  //해더
  const [isVisibleHeader, setIsBisibleHeader] =
    useRecoilState(isVisibleHeaderAtom);
  useEffect(() => {
    setIsBisibleHeader(false);
    return () => setIsBisibleHeader(true);
  }, []);

  //인풋
  const [loginFormDataState, setLoginFormDataState] =
    useRecoilState(loginFormDataAtom);
  const inputOnChange = useLoginFormDataOnChange();
  const [staySignedIn, setStaySignedIn] = useState(false);

  //로그인 뮤테이션
  const [loginAdmin] = useMutation<LoginAdmin, LoginAdminVariables>(
    LOGIN_ADMIN,
    {
      onCompleted: (data: LoginAdmin) => {
        const {
          loginAdmin: { ok, error, accessToken, refreshToken },
        } = data;
        if (ok && accessToken && refreshToken) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          if (staySignedIn) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
          } else {
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
          }
          accessTokenVar(accessToken);
          refreshTokenVar(refreshToken);
          adminLoggedInVar(true);
        } else if (error) {
          alert(error);
        }
      },
    }
  );

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
          {/* <div className=" cursor-pointer flex items-center">
            <i
              className={`far mr-2 text-xl text-gray-500 ${
                staySignedIn ? "fa-check-circle " : "fa-circle "
              }`}
            ></i>
            <span
              className=" text-gray-500"
              onClick={() => {
                setStaySignedIn((val) => !val);
              }}
            >
              로그인 유지하기
            </span>
          </div> */}
        </div>
      </div>
    </>
  );
}
