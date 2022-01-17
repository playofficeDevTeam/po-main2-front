import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import Vdo from "../../../1atoms/Vdo";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      포케팅스러움. <br />
      포케팅은 브랜드와 <Br_mo />
      고객을
      <Br_pc />
      밀접하게 <Br_mo />
      연결시킵니다.
    </>
  ),
  src: "/assets/소개/비전 메인영상",
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <>
      <div className="h-0 relative -z-10">
        <Vdo src={data.src} style={{ height: "50vh" }} />
      </div>
      <div className="mo-max flex items-center" style={{ height: "50vh" }}>
        <div className=" text-3xl font-bold leading-normal text-white text-shadow-md">
          <h1>{data.title}</h1>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="h-0 relative -z-10">
        <Vdo src={data.src} style={{ height: "32rem" }} />
      </div>
      <div className="pc-max flex items-center" style={{ height: "32rem" }}>
        <div className="text-5xl font-bold leading-normal text-white text-shadow-md">
          <h1>{data.title}</h1>
        </div>
      </div>
    </>
  );
}
