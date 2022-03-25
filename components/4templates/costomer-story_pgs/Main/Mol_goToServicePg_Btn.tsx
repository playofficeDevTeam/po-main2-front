import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { useGtm } from "../../../hooks/useGtm";
import useGotoService_Hk from "./useGotoService_Hk";

export default function App() {
  const goToService = useGotoService_Hk();
  const moreGtm = useGtm({
    event: "More",
    eventModel: {
      content_name: "to service page",
    },
  });
  return (
    <>
      <RoundedOrangeBtn
        onClick={() => {
          goToService();
          moreGtm();
        }}
      >
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
