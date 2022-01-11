import Br_mo from "../../../1atoms/Br_mo";
import Org_3averagePerfomance from "./Org_3averagePerfomance";

const data_poketingIs = {
  title: [
    <>
      원칙을 지키고 <Br_mo /> “파트너 성장”에 <br />
      집중한 포케팅은
    </>,
  ],
  subtitle: [],
  lists: [
    {
      title: (
        <>
          <span>성과 개선 한</span>{" "}
          <span className="font-bold">상세페이지 수</span>
        </>
      ),
      mainText: [35, ",000"],
    },
    {
      title: (
        <>
          <span>성과 개선 한</span> <span className="font-bold">광고 수</span>
        </>
      ),
      mainText: [110, ",000"],
    },
    {
      title: (
        <>
          <span>인스타그램</span>{" "}
          <span className="font-bold">인기게시글 수</span>
        </>
      ),
      mainText: [63, ",000"],
    },
  ],
};
export default function App({ data = data_poketingIs, trigger = false }) {
  return (
    <>
      <Org_3averagePerfomance data={data} trigger={trigger} />
    </>
  );
}
