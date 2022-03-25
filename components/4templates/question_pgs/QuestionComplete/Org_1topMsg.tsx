import { useRecoilState } from "recoil";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import { userFormData } from "../../payment_pgs/OrderSheet_pg/Var_userFormData";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const temData = {
    src: "/assets/결제/주황톱니.png",
    title: (
      <>
        비주얼 인플루언서 콘텐츠 마케팅 <br />
        컨설팅 신청이 완료되었습니다!
      </>
    ),
    content: (
      <>
        전략 기획 매니저가 24시간 내<Br_mo />
        <span className="font-bold text-orange-500">10시-18시 사이</span>{" "}
        연락드릴 예정입니다!
        <br />
        조금만 기다려주시면 [ {userFormDataState[0]} ]에 <Br_mo />
        알맞는 전략을 통해
        <Br_pc />
        빠르게
        <Br_mo /> 성장할 수 있도록 도와 드리겠습니다.
      </>
    ),
  };
  return isMobile ? (
    <section className="bg-blue-50">
      <div className="py-12 center-col text-center">
        <div className="mb-6">
          <img src={temData.src} alt="톱니" />
        </div>
        <div className=" font-bold text-xl mb-6">{temData.title}</div>
        <div className="">{temData.content}</div>
      </div>
    </section>
  ) : (
    <section className=" bg-gradient-to-r from-green-50 to-blue-100">
      <div className="py-12 center-col text-center">
        <div className="mb-6">
          <img src={temData.src} alt="톱니" />
        </div>
        <div className=" font-bold text-2xl mb-6">{temData.title}</div>
        <div className="">{temData.content}</div>
      </div>
    </section>
  );
}
