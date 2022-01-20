import { useRouter } from "next/router";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";

export default function App() {
  const router = useRouter();
  return (
    <>
      <RoundedOrangeBtn
        onClick={() => {
          router.push("/order-sheet");
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 300);
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
