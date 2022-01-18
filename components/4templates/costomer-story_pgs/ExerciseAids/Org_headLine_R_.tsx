import useIsMobile from "../../../hooks/useIsMobile";

const defaultData = {
  src: "",
  height: "",
  title: <></>,
  contents: [
    {
      title: <></>,
      content: <></>,
    },
    { title: <></>, content: <></> },
    { title: <></>, content: <></> },
  ],
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();

  return (
    <section className="">
      {isMobile ? (
        // 모바일
        // 모바일
        // 모바일
        <div
          className=""
          style={{
            height: data.height,
            backgroundImage: `url(${data.src})`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
          }}
        >
          <div
            className="mo-max flex flex-col justify-center"
            style={{
              height: data.height,
            }}
          >
            <h1 className=" font-bold text-3xl leading-normal w-full text-white text-shadow-sm  mt-12 mb-10">
              {data.title}
            </h1>

            <ul>
              {data.contents.map((val, idx) => (
                <li key={idx} className=" bg-white p-5 mb-3 rounded-xl">
                  <h2 className=" font-bold text-2xl mb-1">{val.title}</h2>
                  <h3 className="font-bold text-2xl text-orange-500">
                    {val.content}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        // 피씨
        // 피씨
        // 피씨
        <div
          className=""
          style={{
            height: data.height,
            backgroundImage: `url(${data.src})`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
          }}
        >
          <div
            className="pc-max flex flex-col justify-center"
            style={{
              height: data.height,
            }}
          >
            <h1 className="pc-h1 w-full text-white mt-12 mb-12 text-shadow-sm ">
              {data.title}
            </h1>

            <ul className="flex">
              {data.contents.map((val, idx) => (
                <li
                  key={idx}
                  className=" bg-white p-5 mb-3 rounded-xl w-4/12 mr-5 last:mr-0"
                >
                  <h2 className=" font-bold text-2xl ">{val.title}</h2>
                  <h3 className="font-bold text-2xl text-orange-500">
                    {val.content}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
