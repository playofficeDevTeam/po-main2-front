import { useEffect } from "react";
import { useGtm } from "../../../hooks/useGtm";

export default function App() {
  const contactGtm = useGtm({
    event: "StartContact",
    eventModel: {
      search_string: "전문가 컨설팅 신청",
    },
  });
  useEffect(() => {
    setTimeout(() => {
      contactGtm();
    }, 60000);
  }, []);
  return <></>;
}
