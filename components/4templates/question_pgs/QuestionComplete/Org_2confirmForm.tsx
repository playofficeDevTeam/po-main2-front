import { useState } from "react";
import { useRecoilState } from "recoil";
import Br_mo from "../../../1atoms/Br_mo";
import IsMobile from "../../../1atoms/IsMobile";
import {
  inputSetting,
  userFormData,
  useUserFormDataOnChange,
} from "../../payment_pgs/OrderSheet_pg/Var_userFormData";
import Org_2form from "../QuestionForm_pg/Org_2form";
import {
  inputDetail1Setting,
  userDetail1FormData,
  useUserDetail1FormDataOnChange,
} from "../QuestionForm_pg/Var_userDetail1FormData";
import Mol_formApplyBtn from "./Mol_formApplyBtn";
import Mol_goToHome from "./Mol_goToHome";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  const temData = {
    title: (
      <div className={`center ${isMobile ? "" : "mb-6"}`}>
        <div>
          입력하신 정보가 정확한지
          <Br_mo />
          확인 부탁드립니다
        </div>
        {isMobile ? (
          <></>
        ) : (
          <div
            className="text-orange-500 border-2 border-orange-500 rounded-md bg-white
               text-sm  font-bold cursor-pointer ml-6 mt-px relative px-4 py-1"
            onClick={() => {
              setEditState(true);
            }}
          >
            수정하기
          </div>
        )}
      </div>
    ),
    subtitle: <></>,
  };

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);
  const inputOnChange = useUserFormDataOnChange();

  const [userDetail1FormDataState, setUserDetail1FormDataState] =
    useRecoilState(userDetail1FormData);
  const inputDetail1OnChange = useUserDetail1FormDataOnChange();

  const [depositClickedState, setDepositClickedState] = useState(false);
  const [editState, setEditState] = useState(false);

  return isMobile ? (
    <>
      <div className="center-col mt-16 mb-8">
        <div className="mo-h1 text-center text-2xl mb-4">{temData.title}</div>
      </div>
      {!editState ? (
        <div className="">
          <ul className={`xs-max`}>
            {inputSetting.map((val, idx) => (
              <li key={idx} className=" mb-6">
                <div className=" font-medium text-lg mb-2 text-gray-700 flex">
                  {val.title}
                  <div
                    className="text-gray-500 border rounded-md 
                 text-sm font-normal h-6 flex justify-center items-center px-1 cursor-pointer ml-2 relative top-px"
                    onClick={() => {
                      setEditState(true);
                    }}
                  >
                    수정
                  </div>
                </div>
                <div className="text-gray-600 ">{userFormDataState[idx]}</div>
              </li>
            ))}
          </ul>
          <ul className={`xs-max`}>
            {inputDetail1Setting.map(
              (val, idx) =>
                idx < 3 && (
                  <li className=" mb-6">
                    <div className=" font-medium text-lg mb-2 text-gray-700 flex">
                      {val.title}
                      <div
                        className="text-gray-500 border rounded-md 
               text-sm font-normal h-6 flex justify-center items-center px-1 cursor-pointer ml-2 relative top-px"
                        onClick={() => {
                          setEditState(true);
                        }}
                      >
                        수정
                      </div>
                    </div>
                    <div className="text-gray-700">
                      {userDetail1FormDataState[idx]}
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      ) : (
        <>
          <Org_2form
            temData={{
              title: <></>,
              subtitle: <></>,
            }}
          />
          <div className="mt-10 center">
            <Mol_formApplyBtn
              onClick={() => {
                setEditState(false);
              }}
            />
          </div>
        </>
      )}

      <div className="my-20 center">
        <Mol_goToHome />
      </div>
    </>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <>
      <div className="center-col mt-16 mb-8">
        <div className="mo-h1 text-center text-2xl mb-4">{temData.title}</div>
      </div>
      {!editState ? (
        <div className="">
          <ul className={`pc-max grid grid-cols-2`}>
            {inputSetting.map((val, idx) => (
              <li key={idx} className=" mb-6 px-10">
                <div className=" font-medium text-lg mb-2 text-gray-700 flex">
                  {val.title}
                </div>
                <div className="text-gray-600 ">{userFormDataState[idx]}</div>
              </li>
            ))}
          </ul>
          <ul className={`pc-max grid grid-cols-2`}>
            {inputDetail1Setting.map(
              (val, idx) =>
                idx < 2 && (
                  <li className=" mb-6 px-10">
                    <div className=" font-medium text-lg mb-2 text-gray-700 flex">
                      {val.title}
                    </div>
                    <div className="text-gray-700">
                      {userDetail1FormDataState[idx]}
                    </div>
                  </li>
                )
            )}
          </ul>
          <ul className={`pc-max mt-6`}>
            {inputDetail1Setting.map(
              (val, idx) =>
                idx === 2 && (
                  <li className=" mb-6 px-10">
                    <div className=" font-medium text-lg mb-2 text-gray-700 flex">
                      {val.title}
                    </div>
                    <div className="text-gray-700">
                      {userDetail1FormDataState[idx]}
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      ) : (
        <>
          <Org_2form
            temData={{
              title: <></>,
              subtitle: <></>,
            }}
          />
          <div className="mt-10 center">
            <Mol_formApplyBtn
              onClick={() => {
                setEditState(false);
              }}
            />
          </div>
        </>
      )}

      <div className="pc-max my-20 py-10 center border-t-2">
        <Mol_goToHome />
      </div>
    </>
  );
}
