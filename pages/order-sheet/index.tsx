import Head from "next/head";
import OrderSheet_pg from "../../components/4templates/payment_pgs/OrderSheet_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-주문</title>
        <meta name="description" property="og:description" />
      </Head>
      <OrderSheet_pg />
    </>
  );
}
