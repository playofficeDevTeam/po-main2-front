import Head from "next/head";
import PaymentFail_pg from "../../components/4templates/payment_pgs/PaymentFail_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-결제실패</title>
        <meta name="description" property="og:description" />
      </Head>
      <PaymentFail_pg />
    </>
  );
}
