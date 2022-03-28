import Head from "next/head";
import PaymentSuccess_card_pg from "../../components/4templates/payment_pgs/PaymentSuccess_card_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-결제완료(카드)</title>
        <meta name="description" property="og:description" />
      </Head>
      <PaymentSuccess_card_pg />;
    </>
  );
}
