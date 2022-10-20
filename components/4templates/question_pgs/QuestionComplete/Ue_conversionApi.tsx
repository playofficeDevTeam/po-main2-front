import { useEffect } from "react";
import useConversionApi from "../../../hooks/useConversionApi";

export default function App() {
  //픽셀 이벤트 발생
  const conversionApiMutation = useConversionApi();
  useEffect(() => {
    console.log("Contact");
    conversionApiMutation({
      event_name: "Contact",
      custom_data_content_name: "비주얼 인플루언서 콘텐츠 마케팅",
    });
  }, []);
  return <></>;
}
