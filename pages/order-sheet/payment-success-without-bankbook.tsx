import Head from "next/head";
import PaymentSuccess_withoutBankbook_pg from "../../components/4templates/payment_pgs/PaymentSuccess_withoutBankbook_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-결제완료(무통장)</title>
        <meta name="description" property="og:description" />
      </Head>
      <PaymentSuccess_withoutBankbook_pg />;
    </>
  );
}
