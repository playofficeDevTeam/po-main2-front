import Head from "next/head";
import Introduce_pg from "../../components/4templates/etc_pgs/Introduce_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-소개</title>
        <meta name="description" property="og:description" />
      </Head>
      <Introduce_pg />
    </>
  );
}
