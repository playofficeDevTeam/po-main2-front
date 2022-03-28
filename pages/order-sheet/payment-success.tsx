import Head from "next/head";
import PaymentSuccess_pg from "../../components/4templates/payment_pgs/PaymentSuccess_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-결제완료로직</title>
        <meta name="description" property="og:description" />
      </Head>
      <PaymentSuccess_pg />
    </>
  );
}
