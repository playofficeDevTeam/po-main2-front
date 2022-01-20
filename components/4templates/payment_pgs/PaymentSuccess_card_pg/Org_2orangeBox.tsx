import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      결제가 정상적으로 <br />
      완료 되었습니다. <br />
      아래 진행 프로세스까지 <br />꼭 확인해주세요!
    </>
  ),
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <section className="bg-gray-100 p-3">
      <div className=" bg-gradient-to-br from-orange-500 to-orange-400 text-white font-bold text-xl text-shadow-md text-center py-6 rounded-xl ">
        {data.title}
      </div>
    </section>
  ) : (
    <section className="h-full">
      <div className="h-full bg-gradient-to-br from-orange-500 to-orange-400 text-white font-bold text-xl text-shadow-md  p-7  leading-relaxed">
        {data.title}
      </div>
    </section>
  );
}
