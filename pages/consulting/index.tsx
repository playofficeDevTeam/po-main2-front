import Head from "next/head";
import QuestionMain_pg from "../../components/4templates/question_pgs/QuestionMain_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-문의</title>
        <meta name="description" property="og:description" />
      </Head>
      <QuestionMain_pg />
    </>
  );
}
