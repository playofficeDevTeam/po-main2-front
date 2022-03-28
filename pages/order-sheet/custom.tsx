import Head from "next/head";
import CustomOrderSheet_pg from "../../components/4templates/payment_pgs/CustomOrderSheet_pg";

export default function App() {
  return (
    <>
      <Head>
        <title>포케팅-맞춤결제</title>
        <meta name="description" property="og:description" />
      </Head>
      <CustomOrderSheet_pg />
    </>
  );
}
