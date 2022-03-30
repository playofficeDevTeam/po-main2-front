import { useRouter } from "next/router";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { useGtm } from "../../../hooks/useGtm";

export default function App() {
  const router = useRouter();
  const startContactGtm = useGtm({
    event: "StartContact",
    eventModel: {
      search_string: "전문가 컨설팅 신청",
    },
  });
  return (
    <>
      <RoundedOrangeBtn
        onClick={() => {
          router.push("/consulting/form");
          startContactGtm();
        }}
      >
        <>
          <img
            src="assets/서비스_비주얼/아이콘/shuttle 2.png"
            alt="바로 진행하기"
            className="mr-3"
          />
          전문가 컨설팅 신청
        </>
      </RoundedOrangeBtn>
    </>
  );
}
