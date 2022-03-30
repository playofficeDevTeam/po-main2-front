import Head from "next/head";
import QuestionForm_pg from "../../components/4templates/question_pgs/QuestionForm_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-문의제출</title>
        <meta name="description" property="og:description" />
      </Head>
      <QuestionForm_pg />
    </>
  );
}
