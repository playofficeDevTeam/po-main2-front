import Head from "next/head";
import QuestionComplete from "../../components/4templates/question_pgs/QuestionComplete";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-문의완료</title>
        <meta name="description" property="og:description" />
      </Head>
      <QuestionComplete />
    </>
  );
}
