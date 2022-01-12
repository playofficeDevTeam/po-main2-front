import { useReactiveVar } from "@apollo/client";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";

export default function App() {
  return (
    <>
      <RoundedOrangeBtn
        onClick={() => {
          console.log("go to payment");
        }}
      >
        <>
          <img
            src="assets/서비스_비주얼/아이콘/shuttle 2.png"
            alt="바로 진행하기"
            className="mr-3"
          />
          바로 진행하기
        </>
      </RoundedOrangeBtn>
    </>
  );
}
