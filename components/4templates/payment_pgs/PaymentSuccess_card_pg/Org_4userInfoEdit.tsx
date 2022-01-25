import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  inputSetting,
  userFormData,
  userFormDataValidate,
  useUserFormDataOnChange,
} from "../OrderSheet_pg/Var_userFormData";
import Mol_formApplyBtn from "./Mol_formApplyBtn";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App({ trigger = false }) {
  const isMobile = useIsMobile();
  const [popupState, setPopupState] = useState(true);
  const [editState, setEditState] = useState(false);

  const [inputSettingState, setInputSettingState] =
    useRecoilState(inputSetting);
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);
  const inputOnChange = useUserFormDataOnChange();

  return isMobile ? (
    <section className="mt-10">
      <div className="xs-max ">
        <div className="font-bold text-xl mb-10">
          정확하게 입력 되었는지 <br />
          한번 더 확인해주세요
        </div>
        {!editState ? (
          // 스테틱모드
          <ul className="">
            {/* 인풋리스트 */}
            {inputSettingState.map((val, idx) => (
              <li key={idx} className="mb-4 last:mb-2">
                {popupState && idx === 2 ? (
                  <div
                    className={`transition duration-200 ${
                      trigger ? " opacity-100" : " opacity-0 translate-y-2"
                    }`}
                  >
                    <div className="h-0 flex justify-center">
                      <div className=" relative bottom-28 w-max">
                        {/* 닫기 */}
                        <div
                          className="h-0 flex justify-end relative z-40"
                          onClick={() => {
                            setPopupState(false);
                          }}
                        >
                          <div className="mr-3 mt-1">
                            <i className="fas fa-times text-lg text-white text-shadow-md"></i>
                          </div>
                        </div>
                        <div className=" text-white text-shadow-md bg-indigo-400  rounded-lg p-3 w-72 shadow-md relative z-30">
                          연락처/이메일 입력 오류의 경우, <br />
                          전담팀을 연결해 드릴 수가 없습니다 <br />
                          반드시 꼼꼼하게 확인해 주세요 :)
                        </div>
                        <div className="w-max relative bottom-4 left-6 z-20">
                          <i className="fas fa-caret-down text-indigo-400  text-4xl text-shadow-md"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex items-center">
                  <div
                    className={` font-medium text-lg mb-1 mr-3 transition  ${
                      idx > 1 ? "text-blue-600" : ""
                    }`}
                  >
                    {val.title}
                  </div>
                  <div
                    className="center text-gray-500 border rounded-md 
             text-sm h-6 px-1 pb-px cursor-pointer"
                    onClick={() => {
                      setEditState(true);
                    }}
                  >
                    수정
                  </div>
                </div>

                <div className="mb-1"></div>
                <div className="text-gray-500 font-medium">
                  {userFormDataState[idx]}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // 수정모드
          <>
            <ul>
              {inputSettingState.map((val, idx) => (
                <li key={idx} className="mb-4">
                  <div className=" font-medium text-lg mb-2">{val.title}</div>

                  <div className="h-0 relative z-30 flex justify-end">
                    <div className="h-10 w-max flex items-center mr-2">
                      {userFormDataValidate[idx](userFormDataState[idx]) ? (
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
                    className="input1"
                    value={userFormDataState[idx]}
                    onChange={(e) => {
                      inputOnChange(e, idx);
                    }}
                  />
                </li>
              ))}
            </ul>
            <div className="mb-8"></div>
            <div className="flex justify-center">
              <Mol_formApplyBtn
                onClick={() => {
                  setEditState((state) => false);
                }}
              />
            </div>
          </>
        )}
      </div>
      <div className="border-b-4 mt-12"></div>
    </section>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <section className="">
      <div className="pc-max border-2 px-10 pt-8 pb-2 ">
        <div className="font-bold text-xl mb-10">
          정확하게 입력 되었는지 한번 더 확인해주세요
        </div>
        {!editState ? (
          // 스테틱모드
          <ul className=" grid grid-cols-2">
            {/* 인풋리스트 */}
            {inputSettingState.map((val, idx) => (
              <li key={idx} className="mb-8">
                {popupState && idx === 3 ? (
                  <div
                    className={`transition duration-200 ${
                      trigger ? " opacity-100" : " opacity-0 translate-y-2"
                    }`}
                  >
                    <div className="h-0 flex justify-center">
                      <div className=" relative left-32 bottom-4 w-max">
                        {/* 닫기 */}
                        <div
                          className="h-0 flex justify-end relative z-40 "
                          onClick={() => {
                            setPopupState(false);
                          }}
                        >
                          <div className="mr-3 mt-1">
                            <i className="fas fa-times text-lg text-white text-shadow-md  cursor-pointer"></i>
                          </div>
                        </div>
                        <div className=" text-white text-shadow-md bg-indigo-400  rounded-lg p-3 w-72 shadow-md relative z-30">
                          연락처/이메일 입력 오류의 경우, <br />
                          전담팀을 연결해 드릴 수가 없습니다 <br />
                          반드시 꼼꼼하게 확인해 주세요 :)
                        </div>
                        <div className="w-max relative bottom-16 right-3 z-20">
                          <i className="fas fa-caret-left text-indigo-400  text-4xl text-shadow-md"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex items-center">
                  <div
                    className={` font-medium text-lg mb-1 mr-3 transition  ${
                      idx > 1 ? "text-blue-600" : ""
                    }`}
                  >
                    {val.title}
                  </div>
                  <div
                    className="center text-gray-500 border rounded-md 
             text-sm h-6 px-1 pb-px cursor-pointer"
                    onClick={() => {
                      setEditState(true);
                    }}
                  >
                    수정
                  </div>
                </div>

                <div className="mb-1"></div>
                <div className="text-gray-500 font-medium">
                  {userFormDataState[idx]}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // 수정모드
          <>
            <ul className="grid grid-cols-2 gap-x-6">
              {inputSettingState.map((val, idx) => (
                <li key={idx} className="mb-4">
                  <div className=" font-medium text-lg mb-2">{val.title}</div>

                  <div className="h-0 relative z-30 flex justify-end">
                    <div className="h-10 w-max flex items-center mr-2">
                      {userFormDataValidate[idx](userFormDataState[idx]) ? (
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
                    className="input1"
                    value={userFormDataState[idx]}
                    onChange={(e) => {
                      inputOnChange(e, idx);
                    }}
                  />
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-6 mb-8">
              <Mol_formApplyBtn
                onClick={() => {
                  setEditState((state) => false);
                }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
