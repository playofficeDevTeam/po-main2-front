import Br_mo from "../../../1atoms/Br_mo";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  title: (
    <>
      포케팅은 클라이언트의 <Br_mo /> 매출과 사업 방향에
      <Br_mo />
      유의미하게 기여하는 <Br_mo />
      <span className="text-orange-500">
        콘텐츠 마케팅 에이전시 <Br_mo />
      </span>
      입니다.
    </>
  ),
  contents: [
    {
      h1: <>브랜드 마케팅</>,
      p: (
        <>
          노출만 고려하는 마케팅은 브랜드를 만들 수 없습니다. 브랜드가 가진
          핵심가치를 적합한 수단을 통해 효율적으로 확산시킵니다.
        </>
      ),
    },
    {
      h1: <>성장 파트너</>,
      p: (
        <>
          파트너의 성장과 제품/서비스 개선을 위해, 소비자 피드백을 데이터화하고
          전략에 심도 있게 반영합니다.
        </>
      ),
    },
    {
      h1: <>카멜레온 전략</>,
      p: (
        <>
          눈 뜨면 트랜드가 바뀌어 있는 급격한 시장변화에 한발 앞서 대응하여,
          클라이언트의 사업 방향에 길잡이가 됩니다.
        </>
      ),
    },
  ],
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  return <></>;
}
