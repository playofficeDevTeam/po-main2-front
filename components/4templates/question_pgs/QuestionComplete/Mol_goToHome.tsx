import { useRouter } from "next/router";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";

export default function App() {
  const router = useRouter();
  return (
    <>
      <RoundedOrangeBtn
        onClick={() => {
          router.push("/");
        }}
      >
        <div className="px-4 text-lg">홈페이지로 돌아가기</div>
      </RoundedOrangeBtn>
    </>
  );
}
