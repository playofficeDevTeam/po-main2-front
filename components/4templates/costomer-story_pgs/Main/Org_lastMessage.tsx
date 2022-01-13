import useIsMobile from "../../../hooks/useIsMobile";
import useGotoService_Hk from "./useGotoService_Hk";

const defaultData = {
  title: <></>,
  btn: <></>,
};

export default function App({ data = defaultData, trigger = false }) {
  const isMobile = useIsMobile();
  const goToService = useGotoService_Hk();
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
            onClick={goToService}
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
            onClick={goToService}
          >
            {data.btn}
          </div>
        </div>
      )}
    </section>
  );
}
