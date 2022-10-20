import crypto from "crypto";
import { useState } from "react";
import useConversionApi, { CONVERSION_API } from "../hooks/useConversionApi";

//crypto 이용해서 sha256 해싱 하는 함수
const hash = async (stringToHash: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(stringToHash);
  return hash.digest("hex");
};

export default function App() {
  const conversionApiMutation = useConversionApi();
  //input state 생성
  const [input, setInput] = useState("");
  return (
    <>
      <div className="flex">
        {/* 인풋 엘리먼트 */}
        <input
          name="input w-3"
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
        />
        <div
          className="m-4 p-4 border cursor-pointer "
          onClick={async () => {
            conversionApiMutation({
              event_name: "ViewContent",
            });
          }}
        >
          버튼
        </div>
        <div
          className="m-4 p-4 border cursor-pointer "
          onClick={async () => {
            conversionApiMutation({
              event_name: "test10",
            });
          }}
        >
          버튼
        </div>
      </div>
    </>
  );
}
