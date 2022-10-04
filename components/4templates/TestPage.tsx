import axios from "axios";
import { LOCAL_SAVED_MEMVER_ID } from "../common/Layout";

//유저 정보
const channelTalkUserProfile = {
  name: "이종원 테스트",
  mobileNumber: "01027479085",
  email: "leejongwonTest@gmail.com",
};

export default function App() {
  return (
    <>
      <div className="">
        <button
          className=" m-2 border border-gray-200 p-2"
          onClick={() => {
            console.log("채널톡 유저 정보 업데이트");
          }}
        >
          유저 정보 제출 버튼
        </button>
      </div>
    </>
  );
}
