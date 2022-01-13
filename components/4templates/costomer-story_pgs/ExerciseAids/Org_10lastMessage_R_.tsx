import { isMobile } from "react-device-detect";
import { Link, useHistory } from "react-router-dom";
import Br_mo from "../../../1atoms/Br_mo";

const defaultData = {
  title: (
    <>
      B사가 진행한
      <br />
      비주얼 인플루언서
      <Br_mo />
      마케팅에 대해
      <br />더 알아보세요!
    </>
  ),
  btn: <>서비스 자세히 보기!</>,
  linkTo: "/service",
};

export default function App({ data = defaultData, trigger = false }) {
  const history = useHistory();
  return (
    <section className=" bg-gray-900">
      {isMobile ? (
        <div className=" w-10/12 mx-auto py-20">
          <div className=" text-2xl  leading-snug font-bold text-white mb-10">
            {data.title}
          </div>
          <div
            className={` border-4 border-orange-500 rounded font-bold text-lg text-center p-2 transition duration-200 cursor-pointer ${
              trigger
                ? " text-white text-shadow-md bg-orange-500"
                : "text-orange-500 "
            }`}
            onClick={() => {
              history.push(data.linkTo);
            }}
          >
            {data.btn}
          </div>
        </div>
      ) : (
        <div className=" max-w-5xl mx-auto py-20 text-center flex  flex-col  justify-center">
          <div className=" text-3xl leading-snug font-bold text-white mb-10">
            {data.title}
          </div>
          <div
            className={`w-60 mx-auto border-4 border-orange-500 rounded font-bold text-lg text-center p-2 transition duration-200 cursor-pointer ${
              trigger
                ? " text-white text-shadow-md bg-orange-500"
                : "text-orange-500 "
            }`}
            onClick={() => {
              history.push(data.linkTo);
            }}
          >
            {data.btn}
          </div>
        </div>
      )}
    </section>
  );
}
