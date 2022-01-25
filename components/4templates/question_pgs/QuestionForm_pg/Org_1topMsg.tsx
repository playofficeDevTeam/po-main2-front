import AnimatedNumber from "../../../1atoms/AnimatedNumber";
import Br_mo from "../../../1atoms/Br_mo";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App({ trigger = true }) {
  const isMobile = useIsMobile();
  const initApplicantsNum = 350;
  const weekDay = new Date().getDay();
  const monthDay = new Date().getDate();
  const ApplicantsNum = initApplicantsNum + monthDay * 3 + weekDay * 5;

  const temData = {
    title: (
      <>
        온라인에서
        <Br_mo />
        인상깊게 본 콘텐츠 10개 중<Br_mo />
        적어도 3개는 포케팅 작품입니다.
        <br />
        <Br_mo />
        매출 평균 11배 상승시킨 콘텐츠,
        <Br_mo />
        지금 성과를 높이세요.
      </>
    ),
    subtitle: (
      <div>
        지난 일주일 상담 신청 수 :{" "}
        <span
          className="underline font-bold"
          onClick={() => {
            console.log(ApplicantsNum);
          }}
        >
          <AnimatedNumber
            trigger={trigger}
            value={ApplicantsNum}
            duration={2000}
          />
        </span>
      </div>
    ),
  };
  return (
    <section className=" bg-gradient-to-r from-indigo-400 to-blue-300">
      <div className=" flex flex-col justify-center items-center text-center text-white text-shadow-md py-16   ">
        <div
          className={`font-bold  ${
            isMobile ? "text-xl  mb-10" : "text-2xl leading-normal mb-6"
          }`}
        >
          {temData.title}
        </div>
        <div className=" text-xl text-yellow-100">{temData.subtitle}</div>
      </div>
    </section>
  );
}
