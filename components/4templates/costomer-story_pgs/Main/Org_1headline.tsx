import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import useIsMobile from "../../../hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      다른 고객사들은 <Br_mo /> <Br_pc />
      비주얼 인플루언서 마케팅을
      <Br_mo />
      통해
      <Br_pc /> 어떤 성과를 냈는지
      <Br_mo />
      알아보세요.
    </>
  ),
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return (
    <section className="">
      {isMobile ? (
        <div className=" bg-gradient-to-r from-orange-500 to-yellow-500">
          <h1 className="mo-max mo-h1 text-white text-shadow-sm py-12 ">
            {data.title}
          </h1>
        </div>
      ) : (
        <div className=" bg-gradient-to-r from-orange-500 to-yellow-500">
          <h1 className=" pc-max pc-h1 text-white text-shadow-sm py-16 ">
            {data.title}
          </h1>
        </div>
      )}
    </section>
  );
}
