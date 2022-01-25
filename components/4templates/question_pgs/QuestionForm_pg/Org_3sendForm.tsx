import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  modalTemplete,
  PrivacyTerms,
} from "../../payment_pgs/OrderSheet_pg/const_terms";
import Modal_tems from "../../payment_pgs/OrderSheet_pg/Modal_tems";
import Mol_formApplyBtn from "./Mol_formApplyBtn";
import { userDetail1FormData } from "./Var_userDetail1FormData";

import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();

  const [userDetail1FormDataState, setUserDetail1FormDataState] =
    useRecoilState(userDetail1FormData);

  const [agreeCheckState, setAgreeCheckState] = useState(false);
  return (
    <>
      {isMobile ? (
        <section className="">
          <div className="mo-max pb-6 mb-8 border-b-2 "></div>
          <div className="xs-max">
            {/* 체크박스1 */}
            <div
              className=" cursor-pointer mb-2"
              onClick={() => {
                setAgreeCheckState((state) => !state);
              }}
            >
              <div className=" flex items-center ">
                <span className="mr-2 text-xl text-orange-500 ">
                  {agreeCheckState ? (
                    <i className="far fa-check-square"></i>
                  ) : (
                    <i className="far fa-square"></i>
                  )}
                </span>

                <span className="text-gray-500">
                  <Modal_tems data={modalTemplete(PrivacyTerms)}></Modal_tems>
                </span>

                <span className="text-gray-500">에 동의 (필수)</span>
              </div>
            </div>
            {/* 체크박스2 */}
            <div
              className=" flex items-center mb-4 cursor-pointer"
              onClick={() => {
                setUserDetail1FormDataState((state) =>
                  state.map((val, idx) => (idx === 3 ? !val : val))
                );
              }}
            >
              <span className="mr-2 text-xl text-orange-500 ">
                {userDetail1FormDataState[3] ? (
                  <i className="far fa-check-square"></i>
                ) : (
                  <i className="far fa-square"></i>
                )}
              </span>
              <span className="text-gray-500">
                대행사라면 체크해주세요. (선택)
              </span>
            </div>
            <div className="mb-10"></div>
            <div className="flex justify-center">
              <Mol_formApplyBtn trigger={agreeCheckState} />
            </div>
            <div className="mb-16"></div>
          </div>
        </section>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <section className="pc-max ">
          <div className="pc-max my-20">
            <div className="mb-10 center">
              {/* 체크박스1 */}
              <div
                className=" cursor-pointer mr-16"
                onClick={() => {
                  setAgreeCheckState((state) => !state);
                }}
              >
                <div className=" flex items-center ">
                  <span className="mr-2 text-xl text-orange-500 ">
                    {agreeCheckState ? (
                      <i className="far fa-check-square"></i>
                    ) : (
                      <i className="far fa-square"></i>
                    )}
                  </span>

                  <span className="text-gray-500">
                    <Modal_tems data={modalTemplete(PrivacyTerms)}></Modal_tems>
                  </span>

                  <span className="text-gray-500">에 동의 (필수)</span>
                </div>
              </div>
              {/* 체크박스2 */}
              <div
                className=" flex items-center cursor-pointer"
                onClick={() => {
                  setUserDetail1FormDataState((state) =>
                    state.map((val, idx) => (idx === 3 ? !val : val))
                  );
                }}
              >
                <span className="mr-2 text-xl text-orange-500 ">
                  {userDetail1FormDataState[3] ? (
                    <i className="far fa-check-square"></i>
                  ) : (
                    <i className="far fa-square"></i>
                  )}
                </span>
                <span className="text-gray-500">
                  대행사라면 체크해주세요. (선택)
                </span>
              </div>
            </div>

            <div className="border-b-2 mb-12"></div>

            <div className="flex justify-center">
              <Mol_formApplyBtn trigger={agreeCheckState} />
            </div>
            <div className="mb-16"></div>
          </div>
        </section>
      )}
    </>
  );
}
