import { useRouter } from "next/router";
import Detect from "../../../1atoms/IsMobile";
import Org_1paymentSuccessHeader from "../PaymentSuccess_card_pg/Org_1paymentSuccessHeader";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

const defaultData = {
  butten: <></>,
  title: "계좌 안내",
  page: "2/2",
};

export default function App({ data = defaultData }) {
  return <Org_1paymentSuccessHeader data={data} />;
}
