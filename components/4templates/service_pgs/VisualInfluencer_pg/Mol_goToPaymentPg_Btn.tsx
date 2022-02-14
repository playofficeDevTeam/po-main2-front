import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { serviceDatasAtom } from "./Var_serviceDatas";

export default function App() {
  const router = useRouter();
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);

  return (
    <>
      <RoundedOrangeBtn
        onClick={() => {
          window.localStorage.setItem(
            "serviceDataState",
            JSON.stringify(
              serviceDataState.map((val) => ({ ...val, isAmountFix: false }))
            )
          );
          router.push("/order-sheet");
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 200);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 500);
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
