import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import useConversionApi from "../../../hooks/useConversionApi";
import useGotoService_Hk from "./useGotoService_Hk";

export default function App() {
  const goToService = useGotoService_Hk();
  const conversionApiMutation = useConversionApi();
  return (
    <>
      <RoundedOrangeBtn
        onClick={() => {
          goToService();
          conversionApiMutation({
            event_name: "More",
            custom_data_content_name: "to service page",
          });
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
