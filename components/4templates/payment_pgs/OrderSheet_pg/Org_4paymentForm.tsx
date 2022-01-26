import { useRecoilState } from "recoil";
import Br_mo from "../../../1atoms/Br_mo";
import {
  inputSetting,
  userFormData,
  userFormDataValidate,
  useUserFormDataOnChange,
} from "./Var_userFormData";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      캠페인 진행에 필요한 <Br_mo />
      필수정보를 입력해주세요.
    </>
  ),
  subtitle: (
    <>
      * 꼭 입력해 주셔야 결제 이후 <Br_mo />
      연락 드릴 수 있습니다.
    </>
  ),
  emailText: (
    <>
      이메일로 캠페인 진행을 안내 해드립니다. <br />
      수신 가능한 이메일 주소를 입력해 주세요.
    </>
  ),
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);
  const inputOnChange = useUserFormDataOnChange();

  return isMobile ? (
    <>
      <div className="xs-max my-10">
        <div className=" text-xl font-bold mb-2 under">{data.title}</div>
        <div className=" underline mb-10">{data.subtitle}</div>
        <ul>
          {inputSetting.map((val, idx) => (
            <li key={idx} className="mb-4">
              <div className=" font-medium mb-1 text-lg">{val.title}</div>

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
        <div className=" text-sm text-gray-400 font-medium">
          {data.emailText}
        </div>
      </div>
      <div className=" border-b-4"></div>
    </>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <>
      <div className="pc-max px-10 py-8 border-2">
        <div className=" text-xl font-bold mb-2 under">{data.title}</div>
        <div className=" underline mb-10">{data.subtitle}</div>
        <ul>
          {inputSetting.map((val, idx) => (
            <li key={idx} className="mb-5">
              <div className=" font-medium mb-2 text-lg">{val.title}</div>

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
        <div className=" text-sm text-gray-400 font-medium">
          {data.emailText}
        </div>
        <div className="mb-2"></div>
      </div>
    </>
  );
}
