import { useReactiveVar } from "@apollo/client";
import Org_1swipeVideo from "./Org_1swipeVideo";
import Org_2price_plan1 from "./Org_2price_plan1";
import { isMobileVar } from "/home/app/components/common/Layout";

export default function App() {
  const isMobile = useReactiveVar(isMobileVar);

  return (
    <>
      {isMobile ? (
        <>
          <Org_1swipeVideo />
          <Org_2price_plan1 />
        </>
      ) : (
        <Org_1swipeVideo rightComponent={<Org_2price_plan1 />} />
      )}
    </>
  );
}
