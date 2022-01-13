import Br_pc from "../../../1atoms/Br_pc";
import Br_mo from "../../../1atoms/Br_mo";
import Atm_bgBlue from "./Atm_bgBlue";
import useIsMobile from "../../../hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      <Atm_bgBlue>
        “광고 성과가 안나온다면 <Br_mo />
        콘텐츠부터 의심해보시고,
        <Br_pc />
      </Atm_bgBlue>
      <Br_mo />
      콘텐츠 천재 포케팅의
      <Br_mo />
      비주얼 인플루언서
      <br />
      마케팅을 이용해보세요.
      <Br_mo />
      강력 추천합니다.”
    </>
  ),
  add: <>- 압박스타킹 브랜드 B사 마케팅팀 양팀장님 -</>,
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return (
    <section className="">
      {isMobile ? (
        <div className=" text-center">
          <div className="mo-max border-b-2 mb-16"></div>
          <h1 className="mo-h1 mb-6">{data.title}</h1>
          <div className="">{data.add}</div>
          <div className="mo-max border-b-2 my-16"></div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto text-center">
          <div className="  border-b-2 my-16"></div>
          <h1 className="pc-h1 mb-6">{data.title}</h1>
          <div className="">{data.add}</div>
          <div className=" border-b-2 my-16"></div>
        </div>
      )}
    </section>
  );
}
