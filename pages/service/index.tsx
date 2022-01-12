import Head from "next/head";
import VisualInfluencer_pg from "../../components/4templates/service_pgs/VisualInfluencer_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-서비스</title>
        <meta
          name="description"
          property="og:description"
          content="사람의 오감 중 시각은 구매결정에 87%를 지배합니다. 자극하는 비주얼과 퍼포먼스를 브랜드에 최적화된 콘텐츠로 만들어 구매욕구를 자극해 드립니다."
        />
      </Head>
      <VisualInfluencer_pg />
    </>
  );
}
