import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import useGotoService_Hk from "./useGotoService_Hk";

export default function App() {
  const goToService = useGotoService_Hk();
  return (
    <>
      <RoundedOrangeBtn onClick={goToService}>
        <>
          <img
            src="/assets/서비스_비주얼/아이콘/shuttle 2.png"
            alt="
            서비스 알아보기"
            className="mr-3"
          />
          서비스 알아보기
        </>
      </RoundedOrangeBtn>
    </>
  );
}
