import Head from "next/head";
import VisualInfluencer_pg from "../components/4templates/service_pgs/VisualInfluencer_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅 - 좋은 성과는 결국, 크리에이터 콘텐츠</title>
        <meta
          name="description"
          property="og:description"
          content="광고 소재와 상세페이지에 사용하고 마케팅 성과를 개선해보세요. 포케팅 크리에이터 콘텐츠는 고객의 공감을 쉽게 얻을 수 있는 가장 좋은 콘텐츠입니다."
        />
      </Head>
      <VisualInfluencer_pg />
    </>
  );
}
