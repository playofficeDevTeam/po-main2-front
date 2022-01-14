import Br_mo from "../../../1atoms/Br_mo";
import Org_10lastMessage_R_ from "../ExerciseAids/Org_10lastMessage";

const defaultData = {
  title: (
    <>
      M사가 진행한
      <br />
      비주얼 인플루언서
      <Br_mo />
      마케팅에 대해
      <br />더 알아보세요!
    </>
  ),
  btn: <>서비스 자세히 보기!</>,
  url: "/service",
};

export default function App({ data = defaultData, trigger = false }) {
  return <Org_10lastMessage_R_ data={data} trigger={trigger} />;
}
