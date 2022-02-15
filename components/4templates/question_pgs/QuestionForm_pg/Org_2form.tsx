import { useState } from "react";
import { useRecoilState } from "recoil";
import Ani_box from "../../../1atoms/Ani_box";
import Br_mo from "../../../1atoms/Br_mo";
import {
  inputSetting,
  userFormData,
  userFormDataValidate,
  useUserFormDataOnChange,
} from "../../payment_pgs/OrderSheet_pg/Var_userFormData";
import {
  inputDetail1Setting,
  userDetail1FormData,
  userDetail1FormDataValidate,
  useUserDetail1FormDataOnChange,
} from "./Var_userDetail1FormData";

import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultTemData = {
  title: (
    <div className="mt-12 mb-3">
      무료로 전문가의 컨설팅을
      <Br_mo />
      받아보세요.
    </div>
  ),
  subtitle: <div className="mb-10">24시간 내로 연락드립니다</div>,
};
export default function App({ temData = defaultTemData }) {
  const isMobile = useIsMobile();

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);
  const inputOnChange = useUserFormDataOnChange();

  const [userDetail1FormDataState, setUserDetail1FormDataState] =
    useRecoilState(userDetail1FormData);
  const inputDetail1OnChange = useUserDetail1FormDataOnChange();

  const [depositClickedState, setDepositClickedState] = useState(false);
  return (
    <>
      {isMobile ? (
        <section className="">
          <div className="center-col text-center">
            <div className="mo-h1">{temData.title}</div>
            <div className=" text-lg font-bold">{temData.subtitle}</div>
          </div>

          {/* 기본정보 */}
          <ul className="xs-max">
            {inputSetting.map((val, idx) => (
              <li key={idx} className="mb-4">
                <div className=" font-medium mb-1 text-lg">{val.title}</div>

                <div className="h-0 relative z-30 flex justify-end">
                  <div
                    className="h-10 w-max flex items-center mr-2"
                    style={{ marginTop: "2px" }}
                  >
                    {userFormDataValidate[idx].validateFunction(
                      userFormDataState[idx]
                    ) ? (
                      <>
                        <i className="fas fa-check-circle text-lg"></i>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <input
                  placeholder={val.inputProps.placehoder}
                  name={val.inputProps.name}
                  type={val.inputProps.type}
                  className="input1 border-2"
                  value={userFormDataState[idx]}
                  onChange={(e) => {
                    console.log("test");
                    inputOnChange(e, idx);
                  }}
                />
              </li>
            ))}
          </ul>

          {/* 추가정보 */}
          <ul className="xs-max">
            {inputDetail1Setting.map((val, idx) =>
              // 예산
              idx === 0 ? (
                <li key={idx} className="mb-4 relative z-40">
                  <div className="text-lg mb-1 font-medium">{val.title}</div>
                  <div
                    className=" bg-gray-100 px-4 py-2 text-gray-400 rounded border-2 flex justify-between  cursor-pointer"
                    onClick={() => {
                      setDepositClickedState(!depositClickedState);
                    }}
                  >
                    <div
                      className={`${
                        userDetail1FormDataState[idx] === "선택"
                          ? ""
                          : "text-gray-900"
                      }`}
                    >
                      {userDetail1FormDataState[idx]}
                    </div>
                    <div className="">
                      {depositClickedState ? (
                        <i className="fas fa-chevron-up"></i>
                      ) : (
                        <i className="fas fa-chevron-down"></i>
                      )}
                    </div>
                  </div>
                  {/* 숨겨진박스 */}
                  <Ani_box trigger={depositClickedState}>
                    <div className="h-0">
                      <ul className="bg-white border border-gray-200 rounded-md p-4 pb-0 shadow-lg">
                        {val.selectList?.map((val, idx) => (
                          <li
                            key={idx}
                            className="pb-2 mb-2 border-b-2 last:border-0  text-gray-700  cursor-pointer"
                            onClick={() => {
                              setUserDetail1FormDataState((states) =>
                                states.map((state, idx) =>
                                  idx === 0 ? (state = val) : state
                                )
                              );
                              setDepositClickedState(false);
                            }}
                          >
                            {val}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Ani_box>
                </li>
              ) : // 2 ~ 3번째
              idx < 3 ? (
                <li key={idx} className="mb-4">
                  <div className=" font-medium mb-1  text-lg">{val.title}</div>

                  <div className="h-0 relative z-30 flex justify-end">
                    {idx === 1 ? (
                      <div
                        className="h-10 w-max flex items-center mr-2"
                        style={{ marginTop: "2px" }}
                      >
                        {userDetail1FormDataValidate[idx].validateFunction(
                          userDetail1FormDataState[idx]
                        ) ? (
                          <>
                            <i className="fas fa-check-circle text-lg"></i>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {val.inputProps?.type === "textarea" ? (
                    <textarea
                      placeholder={val.inputProps?.placehoder}
                      name={val.inputProps?.name}
                      className="input1 border-2 h-32"
                      value={userDetail1FormDataState[idx].toString()}
                      onChange={(e) => {
                        inputDetail1OnChange(e, idx);
                      }}
                    />
                  ) : (
                    <input
                      placeholder={val.inputProps?.placehoder}
                      name={val.inputProps?.name}
                      type={val.inputProps?.type}
                      className="input1 border-2"
                      value={userDetail1FormDataState[idx].toString()}
                      onChange={(e) => {
                        inputDetail1OnChange(e, idx);
                      }}
                    />
                  )}
                </li>
              ) : (
                <></>
              )
            )}
          </ul>
        </section>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <section className="pc-max ">
          <div className="center-col text-center ">
            <div className="pc-h1 mb-3">{temData.title}</div>
            <div className=" text-lg font-bold">{temData.subtitle}</div>
          </div>

          {/* 기본정보 */}
          <ul className="w-11/12 mx-auto grid grid-cols-2  gap-x-20">
            {inputSetting.map((val, idx) => (
              <li key={idx} className="mb-4">
                <div className=" font-medium mb-1 text-lg">{val.title}</div>

                <div className="h-0 relative z-30 flex justify-end">
                  <div
                    className="h-10 w-max flex items-center mr-2"
                    style={{ marginTop: "2px" }}
                  >
                    {userFormDataValidate[idx].validateFunction(
                      userFormDataState[idx]
                    ) ? (
                      <>
                        <i className="fas fa-check-circle text-lg"></i>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <input
                  placeholder={val.inputProps.placehoder}
                  name={val.inputProps.name}
                  type={val.inputProps.type}
                  className="input1 border-2"
                  value={userFormDataState[idx]}
                  onChange={(e) => {
                    inputOnChange(e, idx);
                  }}
                />
              </li>
            ))}
          </ul>

          {/* 추가정보 */}
          <ul className="w-11/12 mx-auto  grid grid-cols-2  gap-x-20">
            {inputDetail1Setting.map((val, idx) =>
              // 예산
              idx === 0 ? (
                <li className="mb-4 relative z-50">
                  <div className=" font-medium text-lg mb-1">{val.title}</div>
                  <div
                    className=" bg-gray-100 px-4 py-2 text-gray-400 rounded border-2 flex justify-between  cursor-pointer"
                    onClick={() => {
                      setDepositClickedState(!depositClickedState);
                    }}
                  >
                    <div
                      className={`${
                        userDetail1FormDataState[idx] === "선택"
                          ? ""
                          : "text-gray-900"
                      }`}
                    >
                      {userDetail1FormDataState[idx]}
                    </div>
                    <div className="">
                      {depositClickedState ? (
                        <i className="fas fa-chevron-up"></i>
                      ) : (
                        <i className="fas fa-chevron-down"></i>
                      )}
                    </div>
                  </div>
                  {/* 숨겨진박스 */}
                  <Ani_box trigger={depositClickedState}>
                    <div className="h-0">
                      <ul className="bg-white border border-gray-200 rounded-md p-4 pb-0 shadow-lg">
                        {val.selectList?.map((val, idx) => (
                          <li
                            key={idx}
                            className="pb-2 mb-2 border-b-2 last:border-0  text-gray-700  cursor-pointer"
                            onClick={() => {
                              setUserDetail1FormDataState((states) =>
                                states.map((state, idx) =>
                                  idx === 0 ? (state = val) : state
                                )
                              );
                              setDepositClickedState(false);
                            }}
                          >
                            {val}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Ani_box>
                </li>
              ) : // 2 번째
              idx < 2 ? (
                <li key={idx} className="mb-4">
                  <div className=" font-medium mb-1 text-lg">{val.title}</div>

                  <div className="h-0 relative z-30 flex justify-end">
                    <div
                      className="h-10 w-max flex items-center mr-2"
                      style={{ marginTop: "2px" }}
                    >
                      {userDetail1FormDataValidate[idx].validateFunction(
                        userDetail1FormDataState[idx]
                      ) ? (
                        <>
                          <i className="fas fa-check-circle text-lg"></i>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {val.inputProps?.type === "textarea" ? (
                    <textarea
                      placeholder={val.inputProps?.placehoder}
                      name={val.inputProps?.name}
                      className="input1 border-2 h-32"
                      value={userDetail1FormDataState[idx].toString()}
                      onChange={(e) => {
                        inputDetail1OnChange(e, idx);
                      }}
                    />
                  ) : (
                    <input
                      placeholder={val.inputProps?.placehoder}
                      name={val.inputProps?.name}
                      type={val.inputProps?.type}
                      className="input1 border-2"
                      value={userDetail1FormDataState[idx].toString()}
                      onChange={(e) => {
                        inputDetail1OnChange(e, idx);
                      }}
                    />
                  )}
                </li>
              ) : (
                <></>
              )
            )}
          </ul>

          <ul className="w-11/12 mx-auto  mt-10">
            {inputDetail1Setting.map((val, idx) =>
              // 3 번째
              idx === 2 ? (
                <li key={idx} className="mb-4">
                  <div className=" font-medium mb-1  text-lg">{val.title}</div>

                  <div className="h-0 relative z-30 flex justify-end"></div>
                  {val.inputProps?.type === "textarea" ? (
                    <textarea
                      placeholder={val.inputProps?.placehoder}
                      name={val.inputProps?.name}
                      className="input1 border-2 h-32"
                      value={userDetail1FormDataState[idx].toString()}
                      onChange={(e) => {
                        inputDetail1OnChange(e, idx);
                      }}
                    />
                  ) : (
                    <input
                      placeholder={val.inputProps?.placehoder}
                      name={val.inputProps?.name}
                      type={val.inputProps?.type}
                      className="input1 border-2"
                      value={userDetail1FormDataState[idx].toString()}
                      onChange={(e) => {
                        inputDetail1OnChange(e, idx);
                      }}
                    />
                  )}
                </li>
              ) : (
                <></>
              )
            )}
          </ul>
        </section>
      )}
    </>
  );
}
