import { useRouter } from "next/router";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";

export default function App() {
  const router = useRouter();
  return (
    <>
      <RoundedOrangeBtn
        onClick={() => {
          router.push("/consulting/form");
        }}
      >
        <>
          <img
            src="/assets/서비스_비주얼/아이콘/shuttle 2.png"
            alt="전문가 컨설팅 신청"
            className="mr-3"
          />
          전문가 컨설팅 신청
        </>
      </RoundedOrangeBtn>
    </>
  );
}
